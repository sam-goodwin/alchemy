import type { AwsClient } from "aws4fetch";
import { XMLParser } from "fast-xml-parser";
import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";
import { ignore } from "../../util/ignore.ts";
import {
  mergeTimeoutConfig,
  type TimeoutConfig,
  waitForResourceState,
} from "../../util/timeout.js";
import type { RouteTable } from "./route-table.ts";
import type { Subnet } from "./subnet.ts";
import { callEC2Api, createEC2Client } from "./utils.js";

/**
 * Route Table Association timeout constants
 */
export const ROUTE_TABLE_ASSOCIATION_TIMEOUT: TimeoutConfig = {
  maxAttempts: 30,
  delayMs: 1000, // 1 second - Route Table Associations are fast resources
};

/**
 * Route Table Association API Parameter Types
 */
interface AssociateRouteTableParams {
  RouteTableId: string;
  SubnetId?: string;
  GatewayId?: string;
  DryRun?: boolean;
}

interface DisassociateRouteTableParams {
  AssociationId: string;
  DryRun?: boolean;
}

interface DescribeRouteTablesParams {
  RouteTableIds?: string[];
  Filters?: Filter[];
  DryRun?: boolean;
  NextToken?: string;
  MaxResults?: number;
}

interface Filter {
  Name: string;
  Values: string[];
}

/**
 * Route Table Association XML Response Types
 */
interface AssociateRouteTableXmlResponse {
  associationId: string;
  associationState?: {
    state:
      | "associating"
      | "associated"
      | "disassociating"
      | "disassociated"
      | "failed";
    statusMessage?: string;
  };
  requestId: string;
}

interface DisassociateRouteTableXmlResponse {
  return: boolean;
  requestId: string;
}

interface ReplaceRouteTableAssociationXmlResponse {
  newAssociationId: string;
  associationState?: {
    state: string;
    statusMessage?: string;
  };
  requestId: string;
}

interface RouteTableXmlAssociation {
  routeTableAssociationId: string;
  routeTableId: string;
  subnetId?: string;
  gatewayId?: string;
  main: boolean;
  associationState?: {
    state:
      | "associating"
      | "associated"
      | "disassociating"
      | "disassociated"
      | "failed";
    statusMessage?: string;
  };
}

interface RouteTableXmlResult {
  routeTableId: string;
  vpcId: string;
  associationSet?: {
    item: RouteTableXmlAssociation | RouteTableXmlAssociation[];
  };
}

interface DescribeRouteTablesXmlResponse {
  routeTableSet: {
    item: RouteTableXmlResult | RouteTableXmlResult[];
  };
  requestId: string;
  nextToken?: string;
}

/**
 * Helper functions to convert typed parameters to AWS API format
 */
function convertAssociateRouteTableParamsToAwsFormat(
  params: AssociateRouteTableParams,
): Record<string, string> {
  const awsParams: Record<string, string> = {
    RouteTableId: params.RouteTableId,
  };

  if (params.SubnetId) {
    awsParams.SubnetId = params.SubnetId;
  }

  if (params.GatewayId) {
    awsParams.GatewayId = params.GatewayId;
  }

  if (params.DryRun !== undefined) {
    awsParams.DryRun = params.DryRun.toString();
  }

  return awsParams;
}

function convertDisassociateRouteTableParamsToAwsFormat(
  params: DisassociateRouteTableParams,
): Record<string, string> {
  const awsParams: Record<string, string> = {
    AssociationId: params.AssociationId,
  };

  if (params.DryRun !== undefined) {
    awsParams.DryRun = params.DryRun.toString();
  }

  return awsParams;
}

function convertDescribeRouteTablesParamsToAwsFormat(
  params: DescribeRouteTablesParams,
): Record<string, string> {
  const awsParams: Record<string, string> = {};

  if (params.RouteTableIds) {
    params.RouteTableIds.forEach((routeTableId, index) => {
      awsParams[`RouteTableId.${index + 1}`] = routeTableId;
    });
  }

  if (params.Filters) {
    params.Filters.forEach((filter, filterIndex) => {
      const filterNum = filterIndex + 1;
      awsParams[`Filter.${filterNum}.Name`] = filter.Name;

      filter.Values.forEach((value, valueIndex) => {
        awsParams[`Filter.${filterNum}.Value.${valueIndex + 1}`] = value;
      });
    });
  }

  if (params.DryRun !== undefined) {
    awsParams.DryRun = params.DryRun.toString();
  }

  if (params.NextToken) {
    awsParams.NextToken = params.NextToken;
  }

  if (params.MaxResults !== undefined) {
    awsParams.MaxResults = params.MaxResults.toString();
  }

  return awsParams;
}

/**
 * A single route table association as returned by the AWS API.
 */
interface AwsRouteTableAssociation {
  RouteTableAssociationId: string;
  RouteTableId: string;
  SubnetId?: string;
  GatewayId?: string;
  Main: boolean;
  AssociationState: {
    State: string;
    StatusMessage?: string;
  };
}

/**
 * AWS Route Table Association API response types
 */
interface AssociateRouteTableResponse {
  AssociationId: string;
  AssociationState?: {
    State: string;
    StatusMessage?: string;
  };
}

interface DisassociateRouteTableResponse {
  Return: boolean;
}

interface ReplaceRouteTableAssociationResponse {
  NewAssociationId: string;
  AssociationState?: {
    State: string;
    StatusMessage?: string;
  };
}

interface DescribeRouteTablesResponse {
  RouteTables: Array<{
    RouteTableId: string;
    VpcId: string;
    Associations?: AwsRouteTableAssociation[];
  }>;
}

/**
 * Parse XML responses specifically for Route Table Association operations
 */
function parseRouteTableAssociationXmlResponse<T>(xmlText: string): T {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true,
    trimValues: true,
  });

  const parsed = parser.parse(xmlText);
  // Add logging to inspect the parsed object
  console.log("--- Raw Parsed XML Response ---");
  console.log(JSON.stringify(parsed, null, 2));
  console.log("-------------------------------");

  const result: Record<string, unknown> = {};

  // Parse AssociateRouteTableResponse
  if (parsed.AssociateRouteTableResponse) {
    const response =
      parsed.AssociateRouteTableResponse as AssociateRouteTableXmlResponse;
    result.AssociationId = response.associationId;
    if (response.associationState) {
      result.AssociationState = {
        State: response.associationState.state,
        StatusMessage: response.associationState.statusMessage,
      };
    }
  }

  // Parse DisassociateRouteTableResponse
  if (parsed.DisassociateRouteTableResponse) {
    const response =
      parsed.DisassociateRouteTableResponse as DisassociateRouteTableXmlResponse;
    result.Return = response.return;
  }

  // Parse ReplaceRouteTableAssociationResponse
  if (parsed.ReplaceRouteTableAssociationResponse) {
    const response =
      parsed.ReplaceRouteTableAssociationResponse as ReplaceRouteTableAssociationXmlResponse;
    result.NewAssociationId = response.newAssociationId;
    if (response.associationState) {
      result.AssociationState = {
        State: response.associationState.state,
        StatusMessage: response.associationState.statusMessage,
      };
    }
  }

  // Parse DescribeRouteTablesResponse
  if (parsed.DescribeRouteTablesResponse) {
    const response =
      parsed.DescribeRouteTablesResponse as DescribeRouteTablesXmlResponse;
    const routeTableSet = response.routeTableSet;
    if (routeTableSet?.item) {
      const routeTables: RouteTableXmlResult[] = Array.isArray(
        routeTableSet.item,
      )
        ? routeTableSet.item
        : [routeTableSet.item];
      result.RouteTables = routeTables.map((routeTable) => {
        const associations = routeTable.associationSet?.item
          ? Array.isArray(routeTable.associationSet.item)
            ? routeTable.associationSet.item
            : [routeTable.associationSet.item]
          : [];
        return {
          RouteTableId: routeTable.routeTableId,
          VpcId: routeTable.vpcId,
          Associations: associations.map(
            (association): AwsRouteTableAssociation => {
              // Add logging to inspect each association object
              console.log("--- Processing Association Object ---");
              console.log(JSON.stringify(association, null, 2));
              console.log("-----------------------------------");
              return {
                RouteTableAssociationId: association.routeTableAssociationId,
                RouteTableId: association.routeTableId,
                SubnetId: association.subnetId,
                GatewayId: association.gatewayId,
                Main: association.main,
                AssociationState: {
                  State: association.associationState?.state ?? "associated",
                  StatusMessage: association.associationState?.statusMessage,
                },
              };
            },
          ),
        };
      });
    } else {
      result.RouteTables = [];
    }
  }
  return result as T;
}

/**
 * Properties for creating or updating a Route Table Association
 */
export interface RouteTableAssociationProps {
  /**
   * The route table to associate
   */
  routeTable: RouteTable | string;

  /**
   * The subnet to associate with the route table
   * Either subnet or gateway must be specified, but not both
   */
  subnet?: Subnet | string;

  /**
   * The internet gateway or virtual private gateway to associate with the route table
   * Either subnet or gateway must be specified, but not both
   */
  gateway?: string;

  /**
   * Timeout configuration for Route Table Association operations
   * @default Route Table Association-specific sensible defaults (30 attempts, 1000ms delay)
   */
  timeout?: Partial<TimeoutConfig>;
}

/**
 * Output returned after Route Table Association creation/update
 */
export interface RouteTableAssociation
  extends Resource<"aws::RouteTableAssociation">,
    RouteTableAssociationProps {
  /**
   * The ID of the route table association
   */
  associationId: string;

  /**
   * The ID of the route table
   */
  routeTableId: string;

  /**
   * The ID of the subnet (if associated with a subnet)
   */
  subnetId?: string;

  /**
   * The ID of the gateway (if associated with a gateway)
   */
  gatewayId?: string;

  /**
   * Whether this is the main route table association
   */
  isMain: boolean;

  /**
   * The state of the association
   */
  state: string;
}

/**
 * Wait for Route Table Association to reach a specific state
 */
async function waitForRouteTableAssociationState(
  client: AwsClient,
  routeTableId: string,
  associationId: string,
  targetState: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async (): Promise<
    AwsRouteTableAssociation | undefined
  > => {
    const response = await callEC2Api<DescribeRouteTablesResponse>(
      client,
      "DescribeRouteTables",
      parseRouteTableAssociationXmlResponse,
      convertDescribeRouteTablesParamsToAwsFormat({
        RouteTableIds: [routeTableId],
      }),
    );

    const routeTable = response.RouteTables?.[0];
    if (!routeTable) {
      throw new Error(`Route table ${routeTableId} not found`);
    }

    const association = routeTable.Associations?.find(
      (a) => a.RouteTableAssociationId === associationId,
    );

    return association;
  };

  const isReady = (
    association: AwsRouteTableAssociation | undefined,
  ): boolean => {
    return association?.AssociationState?.State === targetState;
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    associationId,
    "Route Table Association",
    `reach state ${targetState}`,
  );
}

/**
 * Wait for Route Table Association to be deleted
 */
async function waitForRouteTableAssociationDeleted(
  client: AwsClient,
  routeTableId: string,
  associationId: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async (): Promise<
    AwsRouteTableAssociation | undefined
  > => {
    try {
      const response = await callEC2Api<DescribeRouteTablesResponse>(
        client,
        "DescribeRouteTables",
        parseRouteTableAssociationXmlResponse,
        convertDescribeRouteTablesParamsToAwsFormat({
          RouteTableIds: [routeTableId],
        }),
      );

      const routeTable = response.RouteTables?.[0];
      if (!routeTable) {
        // Route table doesn't exist, so association is definitely gone
        return undefined;
      }

      const association = routeTable.Associations?.find(
        (a) => a.RouteTableAssociationId === associationId,
      );

      return association;
    } catch (error: any) {
      // If Route Table is not found, association is definitely gone
      if (
        error.code === "InvalidRouteTableID.NotFound" ||
        error.code === "InvalidRouteTable.NotFound"
      ) {
        return undefined;
      }
      throw error;
    }
  };

  const isReady = (
    association: AwsRouteTableAssociation | undefined,
  ): boolean => {
    // Association is deleted if it doesn't exist
    return !association;
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    associationId,
    "Route Table Association",
    "be deleted",
  );
}

/**
 * AWS Route Table Association Resource
 *
 * Creates and manages associations between route tables and subnets or gateways.
 * Each subnet can only be associated with one route table at a time. Route table
 * associations determine which route table controls the traffic for a subnet.
 *
 * @example
 * // Associate a subnet with a route table
 * const association = await RouteTableAssociation("subnet-association", {
 * routeTable: myRouteTable,
 * subnet: mySubnet
 * });
 *
 * @example
 * // Associate a subnet with a route table using IDs
 * const association = await RouteTableAssociation("subnet-association", {
 * routeTable: "rtb-12345678",
 * subnet: "subnet-12345678"
 * });
 *
 * @example
 * // Associate a gateway with a route table
 * const gatewayAssociation = await RouteTableAssociation("gateway-association", {
 * routeTable: myRouteTable,
 * gateway: "igw-12345678"
 * });
 *
 * @example
 * // Create association with custom timeout configuration
 * const customAssociation = await RouteTableAssociation("custom-association", {
 * routeTable: myRouteTable,
 * subnet: mySubnet,
 * timeout: {
 * maxAttempts: 60,
 * delayMs: 2000
 * }
 * });
 *
 * @example
 * // Associate multiple subnets with the same route table
 * const publicSubnets = [subnet1, subnet2, subnet3];
 * const associations = await Promise.all(
 * publicSubnets.map((subnet, index) =>
 * RouteTableAssociation(`public-association-${index}`, {
 * routeTable: publicRouteTable,
 * subnet: subnet
 * })
 * )
 * );
 *
 * @example
 * // Associate private subnets with a private route table
 * const privateAssociation1 = await RouteTableAssociation("private-association-1", {
 * routeTable: privateRouteTable,
 * subnet: privateSubnet1
 * });
 *
 * const privateAssociation2 = await RouteTableAssociation("private-association-2", {
 * routeTable: privateRouteTable,
 * subnet: privateSubnet2
 * });
 *
 * @example
 * // Handle association replacement scenarios
 * const newAssociation = await RouteTableAssociation("replaced-association", {
 * routeTable: newRouteTable,
 * subnet: existingSubnet // This will replace any existing association
 * });
 */
export const RouteTableAssociation = Resource(
  "aws::RouteTableAssociation",
  async function (
    this: Context<RouteTableAssociation>,
    _id: string,
    props: RouteTableAssociationProps,
  ): Promise<RouteTableAssociation> {
    const client = await createEC2Client();
    const timeoutConfig = mergeTimeoutConfig(
      ROUTE_TABLE_ASSOCIATION_TIMEOUT,
      props.timeout,
    );

    const routeTableId =
      typeof props.routeTable === "string"
        ? props.routeTable
        : props.routeTable.routeTableId;

    const subnetId = props.subnet
      ? typeof props.subnet === "string"
        ? props.subnet
        : props.subnet.subnetId
      : undefined;

    const gatewayId = props.gateway;

    // Validate that exactly one of subnet or gateway is specified
    if ((!subnetId && !gatewayId) || (subnetId && gatewayId)) {
      throw new Error(
        "Exactly one of subnet or gateway must be specified for route table association",
      );
    }

    if (this.phase === "delete") {
      if (this.output?.associationId) {
        console.log(
          `🗑️ Deleting Route Table Association: ${this.output.associationId}`,
        );

        await ignore("InvalidAssociationID.NotFound", async () => {
          const params = convertDisassociateRouteTableParamsToAwsFormat({
            AssociationId: this.output!.associationId,
          });

          await callEC2Api<DisassociateRouteTableResponse>(
            client,
            "DisassociateRouteTable",
            parseRouteTableAssociationXmlResponse,
            params,
          );
        });

        // Wait for association to be fully deleted
        await waitForRouteTableAssociationDeleted(
          client,
          routeTableId,
          this.output.associationId,
          timeoutConfig,
        );

        console.log(
          `  ✅ Route Table Association ${this.output.associationId} deletion completed`,
        );
      }
      return this.destroy();
    }

    let associationId: string;
    let isMain = false;
    let state = "associated";

    if (this.phase === "update" && this.output?.associationId) {
      // For updates, we need to check if the route table or target has changed
      const currentRouteTableId = this.output.routeTableId;
      const currentSubnetId = this.output.subnetId;
      const currentGatewayId = this.output.gatewayId;

      if (
        currentRouteTableId !== routeTableId ||
        currentSubnetId !== subnetId ||
        currentGatewayId !== gatewayId
      ) {
        // Route table or target has changed, we need to replace the association
        const response = await callEC2Api<ReplaceRouteTableAssociationResponse>(
          client,
          "ReplaceRouteTableAssociation",
          parseRouteTableAssociationXmlResponse,
          {
            AssociationId: this.output.associationId,
            RouteTableId: routeTableId,
          },
        );

        associationId = response.NewAssociationId;
        state = response.AssociationState?.State || "associated";

        // Wait for the new association to be active
        await waitForRouteTableAssociationState(
          client,
          routeTableId,
          associationId,
          "associated",
          timeoutConfig,
        );
      } else {
        // No changes needed, keep existing association
        associationId = this.output.associationId;
        state = this.output.state;
      }
    } else {
      // Create new association
      const params = convertAssociateRouteTableParamsToAwsFormat({
        RouteTableId: routeTableId,
        SubnetId: subnetId,
        GatewayId: gatewayId,
      });

      const response = await callEC2Api<AssociateRouteTableResponse>(
        client,
        "AssociateRouteTable",
        parseRouteTableAssociationXmlResponse,
        params,
      );

      associationId = response.AssociationId;
      state = response.AssociationState?.State || "associated";

      // Wait for association to be active
      await waitForRouteTableAssociationState(
        client,
        routeTableId,
        associationId,
        "associated",
        timeoutConfig,
      );
    }

    // Get the current association details to check if it's main
    const describeResponse = await callEC2Api<DescribeRouteTablesResponse>(
      client,
      "DescribeRouteTables",
      parseRouteTableAssociationXmlResponse,
      convertDescribeRouteTablesParamsToAwsFormat({
        RouteTableIds: [routeTableId],
      }),
    );

    const routeTable = describeResponse.RouteTables?.[0];
    if (routeTable) {
      const association = routeTable.Associations?.find(
        (a) => a.RouteTableAssociationId === associationId,
      );
      if (association) {
        isMain = association.Main;
        state = association.AssociationState.State;
      }
    }

    return this({
      associationId,
      routeTableId,
      subnetId,
      gatewayId,
      isMain,
      state,
      ...props,
      routeTable: routeTableId,
      subnet: subnetId,
      gateway: gatewayId,
    });
  },
);

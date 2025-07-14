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
import { callEC2Api, createEC2Client } from "./utils.js";
import type { Vpc } from "./vpc.ts";

/**
 * Route Table timeout constants
 */
export const ROUTE_TABLE_TIMEOUT: TimeoutConfig = {
  maxAttempts: 30,
  delayMs: 1000, // 1 second - Route Tables are fast resources
};

/**
 * Comprehensive AWS Route Table API Parameter Types
 */

// Common structures
interface TagSpecification {
  ResourceType: string;
  Tags: Array<{
    Key: string;
    Value: string;
  }>;
}

// Route Table API Request Parameters
interface CreateRouteTableParams {
  VpcId: string;
  TagSpecifications?: TagSpecification[];
  DryRun?: boolean;
}

/**
 * Helper functions to convert typed parameters to AWS API format
 */
function convertCreateRouteTableParamsToAwsFormat(
  params: CreateRouteTableParams,
): Record<string, string> {
  const awsParams: Record<string, string> = {
    VpcId: params.VpcId,
  };

  if (params.DryRun !== undefined) {
    awsParams.DryRun = params.DryRun.toString();
  }

  // Handle TagSpecifications
  if (params.TagSpecifications) {
    params.TagSpecifications.forEach((tagSpec, specIndex) => {
      const specNum = specIndex + 1;
      awsParams[`TagSpecification.${specNum}.ResourceType`] =
        tagSpec.ResourceType;

      tagSpec.Tags.forEach((tag, tagIndex) => {
        const tagNum = tagIndex + 1;
        awsParams[`TagSpecification.${specNum}.Tag.${tagNum}.Key`] = tag.Key;
        awsParams[`TagSpecification.${specNum}.Tag.${tagNum}.Value`] =
          tag.Value;
      });
    });
  }

  return awsParams;
}

/**
 * AWS Route Table API response types
 */
interface AwsRouteTable {
  RouteTableId: string;
  VpcId: string;
  Routes?: Array<{
    DestinationCidrBlock?: string;
    GatewayId?: string;
    InstanceId?: string;
    NatGatewayId?: string;
    State: string;
    Origin: string;
  }>;
}

/**
 * Raw XML parsing interfaces for type safety
 */
interface RawRouteTableXmlItem {
  routeTableId: string;
  vpcId: string;
  routeSet?: {
    item?: Array<RawRouteXmlItem> | RawRouteXmlItem;
  };
}

interface RawRouteXmlItem {
  destinationCidrBlock?: string;
  gatewayId?: string;
  instanceId?: string;
  natGatewayId?: string;
  state: string;
  origin: string;
}

interface CreateRouteTableResponse {
  RouteTable: AwsRouteTable;
}

interface DescribeRouteTablesResponse {
  RouteTables: AwsRouteTable[];
}

/**
 * Parse XML responses specifically for Route Table operations
 */
function parseRouteTableXmlResponse<
  T extends
    | CreateRouteTableResponse
    | DescribeRouteTablesResponse
    | { success: boolean },
>(xmlText: string): T {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true,
    trimValues: true,
  });

  const parsed = parser.parse(xmlText);
  const result: Record<string, unknown> = {};

  // Parse CreateRouteTableResponse
  if (parsed.CreateRouteTableResponse) {
    const routeTable = parsed.CreateRouteTableResponse
      .routeTable as RawRouteTableXmlItem;
    if (routeTable) {
      result.RouteTable = {
        RouteTableId: routeTable.routeTableId,
        VpcId: routeTable.vpcId,
        Routes: routeTable.routeSet?.item
          ? (Array.isArray(routeTable.routeSet.item)
              ? routeTable.routeSet.item
              : [routeTable.routeSet.item]
            ).map((route: RawRouteXmlItem) => ({
              DestinationCidrBlock: route.destinationCidrBlock,
              GatewayId: route.gatewayId,
              InstanceId: route.instanceId,
              NatGatewayId: route.natGatewayId,
              State: route.state,
              Origin: route.origin,
            }))
          : [],
      };
    }
  }

  // Parse DescribeRouteTablesResponse
  if (parsed.DescribeRouteTablesResponse) {
    const routeTableSet = parsed.DescribeRouteTablesResponse.routeTableSet;
    if (routeTableSet?.item) {
      const routeTables = Array.isArray(routeTableSet.item)
        ? routeTableSet.item
        : [routeTableSet.item];
      result.RouteTables = routeTables.map(
        (routeTable: RawRouteTableXmlItem) => ({
          RouteTableId: routeTable.routeTableId,
          VpcId: routeTable.vpcId,
          Routes: routeTable.routeSet?.item
            ? (Array.isArray(routeTable.routeSet.item)
                ? routeTable.routeSet.item
                : [routeTable.routeSet.item]
              ).map((route: RawRouteXmlItem) => ({
                DestinationCidrBlock: route.destinationCidrBlock,
                GatewayId: route.gatewayId,
                InstanceId: route.instanceId,
                NatGatewayId: route.natGatewayId,
                State: route.state,
                Origin: route.origin,
              }))
            : [],
        }),
      );
    } else {
      result.RouteTables = [];
    }
  }

  // Handle success responses
  if (parsed.DeleteRouteTableResponse) {
    result.success = true;
  }

  return result as T;
}

/**
 * Properties for creating or updating a Route Table
 */
export interface RouteTableProps {
  /**
   * The VPC to create the route table in
   */
  vpc: Vpc | string;

  /**
   * Tags to apply to the route table
   */
  tags?: Record<string, string>;

  /**
   * Timeout configuration for Route Table operations
   * @default Route Table-specific sensible defaults (30 attempts, 1000ms delay)
   */
  timeout?: Partial<TimeoutConfig>;
}

/**
 * Output returned after Route Table creation/update
 */
export interface RouteTable
  extends Resource<"aws::RouteTable">,
    RouteTableProps {
  /**
   * The ID of the route table
   */
  routeTableId: string;

  /**
   * The ID of the VPC the route table belongs to
   */
  vpcId: string;
}

/**
 * Wait for Route Table to be deleted
 */
async function waitForRouteTableDeleted(
  client: AwsClient,
  routeTableId: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async () => {
    try {
      const response = await callEC2Api<DescribeRouteTablesResponse>(
        client,
        "DescribeRouteTables",
        parseRouteTableXmlResponse,
        {
          "RouteTableId.1": routeTableId,
        },
      );
      return response.RouteTables?.[0];
    } catch (error: any) {
      // If Route Table is not found, it's been deleted - return undefined
      if (
        error.code === "InvalidRouteTableID.NotFound" ||
        error.code === "InvalidRouteTable.NotFound"
      ) {
        return undefined;
      }
      throw error;
    }
  };

  const isReady = (rt: AwsRouteTable | undefined) => {
    // Route Table is deleted if it doesn't exist
    return !rt;
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    routeTableId,
    "Route Table",
    "be deleted",
  );
}

/**
 * AWS Route Table Resource
 *
 * Creates and manages route tables that control the routing of network traffic
 * within a VPC. Route tables contain rules (routes) that determine where network
 * traffic is directed. Subnet associations are managed separately using the
 * RouteTableAssociation resource.
 *
 * @example
 * // Create a basic route table
 * const routeTable = await RouteTable("main-route-table", {
 *   vpc: myVpc,
 *   tags: {
 *     Name: "main-route-table",
 *     Environment: "production"
 *   }
 * });
 *
 * @example
 * // Create a public route table for internet access
 * const publicRouteTable = await RouteTable("public-routes", {
 *   vpc: myVpc,
 *   tags: {
 *     Name: "public-route-table",
 *     Type: "public",
 *     Purpose: "internet-access"
 *   }
 * });
 *
 * @example
 * // Create a private route table for internal traffic
 * const privateRouteTable = await RouteTable("private-routes", {
 *   vpc: myVpc,
 *   tags: {
 *     Name: "private-route-table",
 *     Type: "private",
 *     Purpose: "internal-only"
 *   }
 * });
 *
 * @example
 * // Create a route table with custom timeout configuration
 * const customRouteTable = await RouteTable("custom-routes", {
 *   vpc: myVpc,
 *   timeout: {
 *     maxAttempts: 45,
 *     delayMs: 1500
 *   },
 *   tags: {
 *     Name: "custom-timeout-route-table"
 *   }
 * });
 */
export const RouteTable = Resource(
  "aws::RouteTable",
  async function (
    this: Context<RouteTable>,
    _id: string,
    props: RouteTableProps,
  ): Promise<RouteTable> {
    const client = await createEC2Client();
    const timeoutConfig = mergeTimeoutConfig(
      ROUTE_TABLE_TIMEOUT,
      props.timeout,
    );
    const vpcId = typeof props.vpc === "string" ? props.vpc : props.vpc.vpcId;

    if (this.phase === "delete") {
      if (this.output?.routeTableId) {
        console.log(`🗑️ Deleting Route Table: ${this.output.routeTableId}`);

        // Delete the Route Table
        await ignore("InvalidRouteTableID.NotFound", async () => {
          await callEC2Api(
            client,
            "DeleteRouteTable",
            parseRouteTableXmlResponse,
            {
              RouteTableId: this.output.routeTableId,
            },
          );
        });

        // Wait for Route Table to be fully deleted
        await waitForRouteTableDeleted(
          client,
          this.output.routeTableId,
          timeoutConfig,
        );

        console.log(
          `  ✅ Route Table ${this.output.routeTableId} deletion completed`,
        );
      }
      return this.destroy();
    }

    let routeTable: AwsRouteTable;

    if (this.phase === "update" && this.output?.routeTableId) {
      console.log(`🔄 Updating Route Table: ${this.output.routeTableId}`);

      // Get existing route table
      const response = await callEC2Api<DescribeRouteTablesResponse>(
        client,
        "DescribeRouteTables",
        parseRouteTableXmlResponse,
        {
          "RouteTableId.1": this.output.routeTableId,
        },
      );

      if (!response.RouteTables?.[0]) {
        throw new Error(`Route Table ${this.output.routeTableId} not found`);
      }

      routeTable = response.RouteTables[0];
      console.log(`  ✅ Route Table ${this.output.routeTableId} updated`);
    } else {
      console.log(`🚀 Creating Route Table in VPC ${vpcId}`);

      // Create new route table
      const createRouteTableParams: CreateRouteTableParams = {
        VpcId: vpcId,
      };

      // Add tags if specified
      if (props.tags) {
        createRouteTableParams.TagSpecifications = [
          {
            ResourceType: "route-table",
            Tags: Object.entries(props.tags).map(([key, value]) => ({
              Key: key,
              Value: value,
            })),
          },
        ];
      }

      const createParams = convertCreateRouteTableParamsToAwsFormat(
        createRouteTableParams,
      );

      const response = await callEC2Api<CreateRouteTableResponse>(
        client,
        "CreateRouteTable",
        parseRouteTableXmlResponse,
        createParams,
      );

      if (!response.RouteTable) {
        throw new Error("Failed to create route table");
      }

      routeTable = response.RouteTable;
      console.log(`  ✅ Route Table ${routeTable.RouteTableId} created`);
    }

    return this({
      routeTableId: routeTable.RouteTableId!,
      vpcId: routeTable.VpcId!,
      ...props,
      vpc: vpcId,
    });
  },
);

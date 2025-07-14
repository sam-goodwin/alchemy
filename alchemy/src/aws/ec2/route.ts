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
import { retry } from "../retry.ts";
import type { InternetGateway } from "./internet-gateway.ts";
import type { NatGateway } from "./nat-gateway.ts";
import type { RouteTable } from "./route-table.ts";
import { callEC2Api, createEC2Client } from "./utils.js";

/**
 * Route timeout constants
 */
export const ROUTE_TIMEOUT: TimeoutConfig = {
  maxAttempts: 30,
  delayMs: 1000, // 1 second - Routes are fast resources
};

/**
 * AWS Route API response types
 */
interface DescribeRouteTablesResponse {
  RouteTables: Array<{
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
  networkInterfaceId?: string;
  vpcPeeringConnectionId?: string;
  natGatewayId?: string;
  transitGatewayId?: string;
  state: string;
  origin: string;
}

/**
 * Parse XML responses specifically for Route operations
 */
function parseRouteXmlResponse<T>(xmlText: string): T {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true,
    trimValues: true,
  });

  const parsed = parser.parse(xmlText);
  const result: Record<string, unknown> = {};

  // Parse DescribeRouteTablesResponse
  if (parsed.DescribeRouteTablesResponse) {
    const routeTableSet = parsed.DescribeRouteTablesResponse.routeTableSet;
    if (routeTableSet?.item) {
      const routeTables = Array.isArray(routeTableSet.item)
        ? routeTableSet.item
        : [routeTableSet.item];
      result.RouteTables = routeTables.map((rt: RawRouteTableXmlItem) => ({
        RouteTableId: rt.routeTableId,
        VpcId: rt.vpcId,
        Routes: rt.routeSet?.item
          ? (Array.isArray(rt.routeSet.item)
              ? rt.routeSet.item
              : [rt.routeSet.item]
            ).map((route: RawRouteXmlItem) => ({
              DestinationCidrBlock: route.destinationCidrBlock,
              GatewayId: route.gatewayId,
              InstanceId: route.instanceId,
              NetworkInterfaceId: route.networkInterfaceId,
              VpcPeeringConnectionId: route.vpcPeeringConnectionId,
              NatGatewayId: route.natGatewayId,
              TransitGatewayId: route.transitGatewayId,
              State: route.state,
              Origin: route.origin,
            }))
          : [],
      }));
    } else {
      result.RouteTables = [];
    }
  }

  // Handle success responses
  if (
    parsed.CreateRouteResponse ||
    parsed.ReplaceRouteResponse ||
    parsed.DeleteRouteResponse
  ) {
    result.success = true;
  }

  return result as T;
}

/**
 * Properties for creating or updating a Route
 */
export interface RouteProps {
  /**
   * The route table to add the route to
   */
  routeTable: RouteTable | string;

  /**
   * The destination CIDR block for the route
   * @example "0.0.0.0/0" for default route
   */
  destinationCidrBlock: string;

  /**
   * The target for the route (one of the following)
   */
  target:
    | { internetGateway: InternetGateway | string }
    | { natGateway: NatGateway | string }
    | { instanceId: string }
    | { networkInterfaceId: string }
    | { vpcPeeringConnectionId: string }
    | { transitGatewayId: string };

  /**
   * Timeout configuration for Route operations
   * @default Route-specific sensible defaults (30 attempts, 1000ms delay)
   */
  timeout?: Partial<TimeoutConfig>;
}

/**
 * Output returned after Route creation/update
 */
export interface Route extends Resource<"aws::Route">, RouteProps {
  /**
   * The ID of the route table
   */
  routeTableId: string;

  /**
   * The current state of the route
   */
  state: "active" | "blackhole";

  /**
   * The origin of the route
   */
  origin: "CreateRouteTable" | "CreateRoute" | "EnableVgwRoutePropagation";
}

/**
 * AWS Route Resource
 *
 * Creates and manages individual routes within route tables, directing traffic
 * to various targets like Internet Gateways, NAT Gateways, or instances.
 *
 * @example
 * // Create a default route to Internet Gateway
 * const publicRoute = await Route("public-default-route", {
 *   routeTable: publicRouteTable,
 *   destinationCidrBlock: "0.0.0.0/0",
 *   target: { internetGateway: mainIgw }
 * });
 *
 * @example
 * // Create a default route to NAT Gateway for private subnets
 * const privateRoute = await Route("private-default-route", {
 *   routeTable: privateRouteTable,
 *   destinationCidrBlock: "0.0.0.0/0",
 *   target: { natGateway: mainNat }
 * });
 *
 * @example
 * // Create a route to a specific instance
 * const instanceRoute = await Route("instance-route", {
 *   routeTable: "rtb-12345678",
 *   destinationCidrBlock: "10.1.0.0/16",
 *   target: { instanceId: "i-12345678" }
 * });
 *
 * @example
 * // Create a route to a network interface
 * const eniRoute = await Route("eni-route", {
 *   routeTable: mainRouteTable,
 *   destinationCidrBlock: "192.168.1.0/24",
 *   target: { networkInterfaceId: "eni-12345678" }
 * });
 *
 * @example
 * // Create a route to a VPC peering connection
 * const peeringRoute = await Route("peering-route", {
 *   routeTable: mainRouteTable,
 *   destinationCidrBlock: "10.2.0.0/16",
 *   target: { vpcPeeringConnectionId: "pcx-12345678" }
 * });
 *
 * @example
 * // Create a route to a Transit Gateway
 * const transitRoute = await Route("transit-route", {
 *   routeTable: mainRouteTable,
 *   destinationCidrBlock: "10.3.0.0/16",
 *   target: { transitGatewayId: "tgw-12345678" }
 * });
 *
 * @example
 * // Create a route with custom timeout configuration
 * const customRoute = await Route("custom-route", {
 *   routeTable: mainRouteTable,
 *   destinationCidrBlock: "172.16.0.0/16",
 *   target: { internetGateway: "igw-12345678" },
 *   timeout: {
 *     maxAttempts: 60,
 *     delayMs: 2000
 *   }
 * });
 */
export const Route = Resource(
  "aws::Route",
  async function (
    this: Context<Route>,
    _id: string,
    props: RouteProps,
  ): Promise<Route> {
    const client = await createEC2Client();
    const _timeoutConfig = mergeTimeoutConfig(ROUTE_TIMEOUT, props.timeout);
    const routeTableId =
      typeof props.routeTable === "string"
        ? props.routeTable
        : props.routeTable.routeTableId;

    if (this.phase === "delete") {
      if (this.output?.routeTableId) {
        console.log(
          `🗑️ Deleting Route: ${this.output.destinationCidrBlock} from Route Table ${this.output.routeTableId}`,
        );
        await retry(async () => {
          await ignore("InvalidRoute.NotFound", async () => {
            await callEC2Api(client, "DeleteRoute", parseRouteXmlResponse, {
              RouteTableId: this.output!.routeTableId,
              DestinationCidrBlock: this.output!.destinationCidrBlock,
            });
          });
        });

        // Wait for route to be fully deleted
        console.log(
          `  Waiting for Route ${this.output.destinationCidrBlock} to be fully deleted...`,
        );
        await waitForRouteDeleted(
          client,
          this.output.routeTableId,
          this.output.destinationCidrBlock,
          _timeoutConfig,
        );
        console.log(
          `  ✅ Route ${this.output.destinationCidrBlock} deletion completed`,
        );
      }
      return this.destroy();
    }

    // Prepare route parameters
    const routeParams: Record<string, string> = {
      RouteTableId: routeTableId,
      DestinationCidrBlock: props.destinationCidrBlock,
    };

    // Set the target based on the type
    if ("internetGateway" in props.target) {
      const igwId =
        typeof props.target.internetGateway === "string"
          ? props.target.internetGateway
          : props.target.internetGateway.internetGatewayId;
      routeParams.GatewayId = igwId;
    } else if ("natGateway" in props.target) {
      const natId =
        typeof props.target.natGateway === "string"
          ? props.target.natGateway
          : props.target.natGateway.natGatewayId;
      routeParams.NatGatewayId = natId;
    } else if ("instanceId" in props.target) {
      routeParams.InstanceId = props.target.instanceId;
    } else if ("networkInterfaceId" in props.target) {
      routeParams.NetworkInterfaceId = props.target.networkInterfaceId;
    } else if ("vpcPeeringConnectionId" in props.target) {
      routeParams.VpcPeeringConnectionId = props.target.vpcPeeringConnectionId;
    } else if ("transitGatewayId" in props.target) {
      routeParams.TransitGatewayId = props.target.transitGatewayId;
    }

    if (this.phase === "update" && this.output?.routeTableId) {
      // Check if route exists
      const response = await callEC2Api<DescribeRouteTablesResponse>(
        client,
        "DescribeRouteTables",
        parseRouteXmlResponse,
        {
          "RouteTableId.1": routeTableId,
        },
      );

      const routeTable = response.RouteTables?.[0];
      const existingRoute = routeTable?.Routes?.find(
        (r) => r.DestinationCidrBlock === props.destinationCidrBlock,
      );

      if (existingRoute) {
        // Replace existing route
        await callEC2Api(
          client,
          "ReplaceRoute",
          parseRouteXmlResponse,
          routeParams,
        );
      } else {
        // Create new route
        await callEC2Api(
          client,
          "CreateRoute",
          parseRouteXmlResponse,
          routeParams,
        );
      }
    } else {
      // Create new route
      await callEC2Api(
        client,
        "CreateRoute",
        parseRouteXmlResponse,
        routeParams,
      );
    }

    // Wait a moment for the route to be fully created
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get the created/updated route to return current state
    const response = await callEC2Api<DescribeRouteTablesResponse>(
      client,
      "DescribeRouteTables",
      parseRouteXmlResponse,
      {
        "RouteTableId.1": routeTableId,
      },
    );

    const routeTable = response.RouteTables?.[0];
    const route = routeTable?.Routes?.find(
      (r) => r.DestinationCidrBlock === props.destinationCidrBlock,
    );

    if (!route) {
      throw new Error("Failed to find created route");
    }

    return this({
      routeTableId,
      state: route.State as "active" | "blackhole",
      origin: route.Origin as
        | "CreateRouteTable"
        | "CreateRoute"
        | "EnableVgwRoutePropagation",
      ...props,
      routeTable: routeTableId,
    });
  },
);

/**
 * Wait for Route to be deleted
 */
async function waitForRouteDeleted(
  client: AwsClient,
  routeTableId: string,
  destinationCidrBlock: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async () => {
    try {
      const response = await callEC2Api<DescribeRouteTablesResponse>(
        client,
        "DescribeRouteTables",
        parseRouteXmlResponse,
        {
          "RouteTableId.1": routeTableId,
        },
      );

      const routeTable = response.RouteTables?.[0];
      const route = routeTable?.Routes?.find(
        (r) => r.DestinationCidrBlock === destinationCidrBlock,
      );

      return route;
    } catch (error: any) {
      // If route table is not found, route is definitely deleted
      if (
        error.code === "InvalidRouteTableID.NotFound" ||
        error.code === "InvalidRouteTable.NotFound"
      ) {
        return undefined;
      }
      throw error;
    }
  };

  const isReady = (route: any) => {
    // Route is deleted if it doesn't exist
    return !route;
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    `${routeTableId}/${destinationCidrBlock}`,
    "Route",
    "be deleted",
  );
}

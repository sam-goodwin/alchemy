import { DescribeRouteTablesCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { InternetGatewayAttachment } from "../../../src/aws/ec2/internet-gateway-attachment.js";
import { InternetGateway } from "../../../src/aws/ec2/internet-gateway.js";
import { RouteTable } from "../../../src/aws/ec2/route-table.js";
import { Route } from "../../../src/aws/ec2/route.js";
import { Vpc } from "../../../src/aws/ec2/vpc.js";
import { destroy } from "../../../src/destroy.js";
import "../../../src/test/vitest.js";
import { BRANCH_PREFIX } from "../../util.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("Route", () => {
  test("create route to internet gateway", async (scope) => {
    const vpcName = `${BRANCH_PREFIX}-alchemy-test-route-vpc`;
    const rtName = `${BRANCH_PREFIX}-alchemy-test-route-rt`;
    const igwName = `${BRANCH_PREFIX}-alchemy-test-route-igw`;
    let vpc: Awaited<ReturnType<typeof Vpc>>;
    let routeTable: Awaited<ReturnType<typeof RouteTable>>;
    let internetGateway: Awaited<ReturnType<typeof InternetGateway>>;
    let _igwAttachment: Awaited<ReturnType<typeof InternetGatewayAttachment>>;
    let route: Awaited<ReturnType<typeof Route>>;
    try {
      // Create VPC, route table, and internet gateway
      vpc = await Vpc(vpcName, {
        cidrBlock: "10.0.0.0/16",
        tags: { Name: vpcName },
      });

      routeTable = await RouteTable(rtName, {
        vpc,
        tags: { Name: rtName },
      });

      internetGateway = await InternetGateway(igwName, {
        tags: { Name: igwName },
      });

      // Attach the Internet Gateway to the VPC
      _igwAttachment = await InternetGatewayAttachment(
        `${igwName}-attachment`,
        {
          internetGateway,
          vpc,
        },
      );

      route = await Route(`${BRANCH_PREFIX}-alchemy-test-route`, {
        routeTable,
        destinationCidrBlock: "0.0.0.0/0",
        target: { internetGateway: internetGateway },
      });

      expect(route.routeTableId).toBe(routeTable.routeTableId);
      expect(route.destinationCidrBlock).toBe("0.0.0.0/0");
      expect(route.target).toEqual({ internetGateway: internetGateway });

      // Verify route exists in route table
      const describeResponse = await ec2.send(
        new DescribeRouteTablesCommand({
          RouteTableIds: [routeTable.routeTableId],
        }),
      );
      const rt = describeResponse.RouteTables?.[0];
      const routeExists = rt?.Routes?.some(
        (r) =>
          r.DestinationCidrBlock === "0.0.0.0/0" &&
          r.GatewayId === internetGateway.internetGatewayId,
      );
      expect(routeExists).toBe(true);
    } finally {
      // Always clean up, even if test fails
      await destroy(scope);
    }
  });
});

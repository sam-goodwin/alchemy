import { DescribeRouteTablesCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { RouteTable } from "../../../src/aws/ec2/route-table.js";
import { Vpc } from "../../../src/aws/ec2/vpc.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";

import "../../../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("RouteTable", () => {
  test("create route table", async (scope) => {
    const vpcName = `${BRANCH_PREFIX}-alchemy-test-rt-vpc`;
    const rtName = `${BRANCH_PREFIX}-alchemy-test-rt`;
    let vpc: Awaited<ReturnType<typeof Vpc>>;
    let routeTable: Awaited<ReturnType<typeof RouteTable>>;

    try {
      // First create a VPC
      vpc = await Vpc(vpcName, {
        cidrBlock: "10.0.0.0/16",
        tags: { Name: vpcName },
      });

      routeTable = await RouteTable(rtName, {
        vpc,
        tags: {
          Name: rtName,
          Environment: "test",
        },
      });

      expect(routeTable.routeTableId).toBeTruthy();
      expect(routeTable.vpcId).toBe(vpc.vpcId);

      // Verify route table exists
      const describeResponse = await ec2.send(
        new DescribeRouteTablesCommand({
          RouteTableIds: [routeTable.routeTableId],
        }),
      );
      const rt = describeResponse.RouteTables?.[0];
      expect(rt?.RouteTableId).toBe(routeTable.routeTableId);
      expect(rt?.VpcId).toBe(vpc.vpcId);
    } finally {
      // Always clean up, even if test fails
      await destroy(scope);
    }
  });
});

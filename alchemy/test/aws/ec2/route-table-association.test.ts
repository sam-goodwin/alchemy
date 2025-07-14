import { DescribeRouteTablesCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { RouteTableAssociation } from "../../../src/aws/ec2/route-table-association.js";
import { RouteTable } from "../../../src/aws/ec2/route-table.js";
import { Subnet } from "../../../src/aws/ec2/subnet.js";
import { Vpc } from "../../../src/aws/ec2/vpc.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";

import "../../../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("RouteTableAssociation", () => {
  test("create route table association with subnet", async (scope) => {
    const vpcName = `${BRANCH_PREFIX}-alchemy-test-rta-vpc`;
    const rtName = `${BRANCH_PREFIX}-alchemy-test-rta-rt`;
    const subnetName = `${BRANCH_PREFIX}-alchemy-test-rta-subnet`;
    const assocName = `${BRANCH_PREFIX}-alchemy-test-rta-assoc`;
    let vpc: Awaited<ReturnType<typeof Vpc>>;
    let routeTable: Awaited<ReturnType<typeof RouteTable>>;
    let subnet: Awaited<ReturnType<typeof Subnet>>;
    let association: Awaited<ReturnType<typeof RouteTableAssociation>>;

    try {
      // Create a VPC
      vpc = await Vpc(vpcName, {
        cidrBlock: "10.0.0.0/16",
        tags: { Name: vpcName },
      });

      // Create a route table
      routeTable = await RouteTable(rtName, {
        vpc,
        tags: {
          Name: rtName,
          Environment: "test",
        },
      });

      // Create a subnet
      subnet = await Subnet(subnetName, {
        vpc,
        cidrBlock: "10.0.1.0/24",
        availabilityZone: `${process.env.AWS_REGION}a` || "us-east-1a",
        tags: { Name: subnetName },
      });

      // Create a route table association
      association = await RouteTableAssociation(assocName, {
        routeTable,
        subnet,
      });

      expect(association.associationId).toBeTruthy();
      expect(association.routeTableId).toBe(routeTable.routeTableId);
      expect(association.subnet).toBe(subnet.subnetId);
      expect(association.isMain).toBe(false); // Non-main association

      // Verify association exists
      const describeResponse = await ec2.send(
        new DescribeRouteTablesCommand({
          RouteTableIds: [routeTable.routeTableId],
        }),
      );
      const rt = describeResponse.RouteTables?.[0];
      expect(rt?.RouteTableId).toBe(routeTable.routeTableId);
      const assoc = rt?.Associations?.find(
        (a) => a.RouteTableAssociationId === association.associationId,
      );
      expect(assoc?.RouteTableAssociationId).toBe(association.associationId);
      expect(assoc?.SubnetId).toBe(subnet.subnetId);
      expect(assoc?.Main).toBe(false);
    } finally {
      // Always clean up, even if test fails
      await destroy(scope);
    }
  });
});

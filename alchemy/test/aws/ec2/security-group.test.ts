import { DescribeSecurityGroupsCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { SecurityGroup } from "../../../src/aws/ec2/security-group.js";
import { Vpc } from "../../../src/aws/ec2/vpc.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";

import "../../../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("SecurityGroup", () => {
  test("create security group with rules", async (scope) => {
    const vpcName = `${BRANCH_PREFIX}-alchemy-test-sg-vpc`;
    const sgName = `${BRANCH_PREFIX}-alchemy-test-sg`;
    let vpc: Awaited<ReturnType<typeof Vpc>>;
    let securityGroup: Awaited<ReturnType<typeof SecurityGroup>>;

    try {
      // First create a VPC
      vpc = await Vpc(vpcName, {
        cidrBlock: "10.0.0.0/16",
        tags: { Name: vpcName },
      });

      securityGroup = await SecurityGroup(sgName, {
        vpc,
        groupName: sgName,
        description: "Test security group for Alchemy",
        ingressRules: [
          {
            protocol: "tcp",
            fromPort: 80,
            toPort: 80,
            cidrBlocks: ["0.0.0.0/0"],
            description: "HTTP access",
          },
          {
            protocol: "tcp",
            fromPort: 443,
            toPort: 443,
            cidrBlocks: ["0.0.0.0/0"],
            description: "HTTPS access",
          },
        ],
        tags: {
          Name: sgName,
          Environment: "test",
        },
      });

      expect(securityGroup.groupId).toBeTruthy();
      expect(securityGroup.vpcId).toBe(vpc.vpcId);
      expect(securityGroup.groupName).toBe(sgName);
      expect(securityGroup.description).toBe("Test security group for Alchemy");

      // Verify security group exists
      const describeResponse = await ec2.send(
        new DescribeSecurityGroupsCommand({
          GroupIds: [securityGroup.groupId],
        }),
      );
      const sg = describeResponse.SecurityGroups?.[0];
      expect(sg?.GroupName).toBe(sgName);
      expect(sg?.VpcId).toBe(vpc.vpcId);
      expect(sg?.IpPermissions?.length).toBeGreaterThan(0);
    } finally {
      // Always clean up, even if test fails
      await destroy(scope);
    }
  });
});

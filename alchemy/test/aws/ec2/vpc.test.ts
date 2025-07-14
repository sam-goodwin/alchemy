import { DescribeVpcsCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { Vpc, VPC_TIMEOUT } from "../../../src/aws/ec2/vpc.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";

import "../../../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("VPC", () => {
  test(
    "create and delete VPC",
    async (scope) => {
      const vpcName = `${BRANCH_PREFIX}-alchemy-test-vpc`;
      let vpc: Awaited<ReturnType<typeof Vpc>>;

      try {
        vpc = await Vpc(vpcName, {
          cidrBlock: "10.0.0.0/16",
          enableDnsSupport: true,
          enableDnsHostnames: true,
          tags: {
            Name: vpcName,
            Environment: "test",
          },
        });

        expect(vpc.vpcId).toBeTruthy();
        expect(vpc.cidrBlock).toBe("10.0.0.0/16");
        expect(vpc.enableDnsSupport).toBe(true);
        expect(vpc.enableDnsHostnames).toBe(true);
        expect(vpc.tags).toEqual({
          Name: vpcName,
          Environment: "test",
        });

        // Verify VPC exists and is available
        const describeResponse = await ec2.send(
          new DescribeVpcsCommand({
            VpcIds: [vpc.vpcId],
          }),
        );
        expect(describeResponse.Vpcs?.[0]?.State).toBe("available");
        expect(describeResponse.Vpcs?.[0]?.CidrBlock).toBe("10.0.0.0/16");
      } finally {
        // Always clean up, even if test fails
        console.log("Starting cleanup...");
        await destroy(scope);
        console.log("Cleanup completed!");
      }
    },
    VPC_TIMEOUT.maxAttempts * VPC_TIMEOUT.delayMs + 30000, // Resource timeout + 30s buffer
  );
});

import { DescribeSubnetsCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect, test as vitestTest } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { Subnet, SUBNET_TIMEOUT } from "../../../src/aws/ec2/subnet.js";
import { Vpc } from "../../../src/aws/ec2/vpc.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";

import "../../../src/test/vitest.js";
import {
  mergeTimeoutConfig,
  validateTimeoutConfig,
  type TimeoutConfig,
} from "../../../src/util/timeout.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("Subnet", () => {
  test(
    "create subnet in VPC",
    async (scope) => {
      const vpcName = `${BRANCH_PREFIX}-alchemy-test-subnet-vpc`;
      const subnetName = `${BRANCH_PREFIX}-alchemy-test-subnet`;
      let vpc: Awaited<ReturnType<typeof Vpc>>;
      let subnet: Awaited<ReturnType<typeof Subnet>>;

      try {
        // First create a VPC
        vpc = await Vpc(vpcName, {
          cidrBlock: "10.0.0.0/16",
          tags: { Name: vpcName },
        });

        subnet = await Subnet(subnetName, {
          vpc,
          cidrBlock: "10.0.1.0/24",
          availabilityZone: `${process.env.AWS_REGION}a` || "us-east-1a",
          mapPublicIpOnLaunch: true,
          tags: {
            Name: subnetName,
            Type: "public",
          },
        });

        expect(subnet.subnetId).toBeTruthy();
        expect(subnet.vpcId).toBe(vpc.vpcId);
        expect(subnet.cidrBlock).toBe("10.0.1.0/24");
        expect(subnet.availabilityZone).toBe(
          `${process.env.AWS_REGION}a` || "us-east-1a",
        );
        expect(subnet.mapPublicIpOnLaunch).toBe(true);

        // Verify subnet exists and is available
        const describeResponse = await ec2.send(
          new DescribeSubnetsCommand({
            SubnetIds: [subnet.subnetId],
          }),
        );
        expect(describeResponse.Subnets?.[0]?.State).toBe("available");
        expect(describeResponse.Subnets?.[0]?.CidrBlock).toBe("10.0.1.0/24");
      } finally {
        // Always clean up, even if test fails
        await destroy(scope);
      }
    },
    SUBNET_TIMEOUT.maxAttempts * SUBNET_TIMEOUT.delayMs + 30000, // Resource timeout + 30s buffer
  );

  test(
    "create subnet with timeout override",
    async (scope) => {
      const vpcName = `${BRANCH_PREFIX}-subnet-timeout-override-vpc`;
      const subnetName = `${BRANCH_PREFIX}-subnet-timeout-override-subnet`;

      try {
        // Create VPC first
        const vpc = await Vpc(vpcName, {
          cidrBlock: "10.0.0.0/16",
          tags: { Name: vpcName },
        });

        // Create subnet with custom timeout configuration
        const subnet = await Subnet(subnetName, {
          vpc,
          cidrBlock: "10.0.1.0/24",
          availabilityZone: `${process.env.AWS_REGION}a` || "us-east-1a",
          tags: { Name: subnetName },
          timeout: {
            maxAttempts: 50, // Override default 30
            delayMs: 500, // Override default 1000
          },
        });

        expect(subnet.subnetId).toBeTruthy();
        expect(subnet.state).toBe("available");
        // The timeout override should be preserved in the props
        expect(subnet.timeout).toEqual({
          maxAttempts: 50,
          delayMs: 500,
        });
      } finally {
        await destroy(scope);
      }
    },
    SUBNET_TIMEOUT.maxAttempts * SUBNET_TIMEOUT.delayMs + 30000,
  );

  test(
    "create subnet with partial timeout override",
    async (scope) => {
      const vpcName = `${BRANCH_PREFIX}-subnet-partial-timeout-vpc`;
      const subnetName = `${BRANCH_PREFIX}-subnet-partial-timeout-subnet`;

      try {
        // Create VPC first
        const vpc = await Vpc(vpcName, {
          cidrBlock: "10.0.0.0/16",
          tags: { Name: vpcName },
        });

        // Create subnet with partial timeout override (only maxAttempts)
        const subnet = await Subnet(subnetName, {
          vpc,
          cidrBlock: "10.0.1.0/24",
          availabilityZone: `${process.env.AWS_REGION}a` || "us-east-1a",
          tags: { Name: subnetName },
          timeout: {
            maxAttempts: 40, // Override only maxAttempts, delayMs should use default
          },
        });

        expect(subnet.subnetId).toBeTruthy();
        expect(subnet.state).toBe("available");
        // The partial timeout override should be preserved
        expect(subnet.timeout).toEqual({
          maxAttempts: 40,
        });
      } finally {
        await destroy(scope);
      }
    },
    SUBNET_TIMEOUT.maxAttempts * SUBNET_TIMEOUT.delayMs + 30000,
  );

  test("should validate timeout configuration", async (scope) => {
    const vpcName = `${BRANCH_PREFIX}-subnet-invalid-timeout-vpc`;
    const subnetName = `${BRANCH_PREFIX}-subnet-invalid-timeout-subnet`;

    try {
      // Create VPC first
      const vpc = await Vpc(vpcName, {
        cidrBlock: "10.0.0.0/16",
        tags: { Name: vpcName },
      });

      // Attempt to create subnet with invalid timeout (should throw)
      await expect(
        Subnet(subnetName, {
          vpc,
          cidrBlock: "10.0.1.0/24",
          availabilityZone: `${process.env.AWS_REGION}a` || "us-east-1a",
          tags: { Name: subnetName },
          timeout: {
            maxAttempts: 0, // Invalid: must be > 0
            delayMs: 1000,
          },
        }),
      ).rejects.toThrow("maxAttempts must be greater than 0");
    } finally {
      await destroy(scope);
    }
  }, 10000); // Validation test should be quick
});
describe("Subnet Timeout Configuration Unit Tests", () => {
  const SUBNET_TIMEOUT_TEST: TimeoutConfig = {
    maxAttempts: 30,
    delayMs: 1000,
  };

  vitestTest("should merge timeout config with no override", () => {
    const result = mergeTimeoutConfig(SUBNET_TIMEOUT_TEST);

    expect(result).toEqual({
      maxAttempts: 30,
      delayMs: 1000,
    });
  });

  vitestTest("should merge timeout config with partial override", () => {
    const override = { maxAttempts: 50 };
    const result = mergeTimeoutConfig(SUBNET_TIMEOUT_TEST, override);

    expect(result).toEqual({
      maxAttempts: 50,
      delayMs: 1000, // Should use default
    });
  });

  vitestTest("should merge timeout config with full override", () => {
    const override = { maxAttempts: 40, delayMs: 2000 };
    const result = mergeTimeoutConfig(SUBNET_TIMEOUT_TEST, override);

    expect(result).toEqual({
      maxAttempts: 40,
      delayMs: 2000,
    });
  });

  vitestTest("should validate merged timeout config", () => {
    const invalidOverride = { maxAttempts: 0 };

    expect(() =>
      mergeTimeoutConfig(SUBNET_TIMEOUT_TEST, invalidOverride),
    ).toThrow("maxAttempts must be greater than 0");
  });

  vitestTest(
    "should validate merged timeout config with invalid delayMs",
    () => {
      const invalidOverride = { delayMs: -100 };

      expect(() =>
        mergeTimeoutConfig(SUBNET_TIMEOUT_TEST, invalidOverride),
      ).toThrow("delayMs must be greater than 0");
    },
  );

  vitestTest("should accept valid timeout configuration", () => {
    const validConfig: TimeoutConfig = {
      maxAttempts: 5,
      delayMs: 1000,
    };

    expect(() => validateTimeoutConfig(validConfig)).not.toThrow();
  });

  vitestTest("should throw error for zero maxAttempts", () => {
    const invalidConfig: TimeoutConfig = {
      maxAttempts: 0,
      delayMs: 1000,
    };

    expect(() => validateTimeoutConfig(invalidConfig)).toThrow(
      "maxAttempts must be greater than 0",
    );
  });

  vitestTest("should throw error for negative delayMs", () => {
    const invalidConfig: TimeoutConfig = {
      maxAttempts: 5,
      delayMs: -1000,
    };

    expect(() => validateTimeoutConfig(invalidConfig)).toThrow(
      "delayMs must be greater than 0",
    );
  });
});

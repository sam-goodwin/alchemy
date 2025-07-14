import {
  DescribeInternetGatewaysCommand,
  EC2Client,
} from "@aws-sdk/client-ec2";
import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import {
  INTERNET_GATEWAY_TIMEOUT,
  InternetGateway,
} from "../../../src/aws/ec2/internet-gateway.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";

import "../../../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("InternetGateway", () => {
  test(
    "create and delete internet gateway",
    async (scope) => {
      const igwName = `${BRANCH_PREFIX}-alchemy-test-igw`;
      let internetGateway: Awaited<ReturnType<typeof InternetGateway>>;

      try {
        // Create the Internet Gateway
        internetGateway = await InternetGateway(igwName, {
          tags: {
            Name: igwName,
            Environment: "test",
          },
        });

        expect(internetGateway.internetGatewayId).toBeTruthy();
        expect(internetGateway.state).toBe("available");

        // Verify Internet Gateway exists
        const describeResponse = await ec2.send(
          new DescribeInternetGatewaysCommand({
            InternetGatewayIds: [internetGateway.internetGatewayId],
          }),
        );
        const igw = describeResponse.InternetGateways?.[0];
        expect(igw?.InternetGatewayId).toBe(internetGateway.internetGatewayId);
        expect(igw?.Attachments).toHaveLength(0); // Should not be attached to any VPC
      } finally {
        // Always clean up, even if test fails
        await destroy(scope);
      }
    },
    INTERNET_GATEWAY_TIMEOUT.maxAttempts * INTERNET_GATEWAY_TIMEOUT.delayMs +
      30000, // Resource timeout + 30s buffer
  );
});

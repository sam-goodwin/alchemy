import { DescribeNatGatewaysCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect } from "vitest";
import { alchemy } from "../../../src/alchemy.js";
import { InternetGatewayAttachment } from "../../../src/aws/ec2/internet-gateway-attachment.js";
import { InternetGateway } from "../../../src/aws/ec2/internet-gateway.js";
import {
  NAT_GATEWAY_TIMEOUT,
  NatGateway,
} from "../../../src/aws/ec2/nat-gateway.js";
import { Subnet } from "../../../src/aws/ec2/subnet.js";
import { Vpc } from "../../../src/aws/ec2/vpc.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";

import "../../../src/test/vitest.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const ec2 = new EC2Client({});

describe("NatGateway", () => {
  test(
    "create NAT gateway with automatic EIP allocation",
    async (scope) => {
      const vpcName = `${BRANCH_PREFIX}-alchemy-test-nat-vpc`;
      const igwName = `${BRANCH_PREFIX}-alchemy-test-nat-igw`;
      const subnetName = `${BRANCH_PREFIX}-alchemy-test-nat-subnet`;
      const natName = `${BRANCH_PREFIX}-alchemy-test-nat`;

      let vpc: Awaited<ReturnType<typeof Vpc>>;
      let internetGateway: Awaited<ReturnType<typeof InternetGateway>>;
      let _internetGatewayAttachment: Awaited<
        ReturnType<typeof InternetGatewayAttachment>
      >;
      let subnet: Awaited<ReturnType<typeof Subnet>>;
      let natGateway: Awaited<ReturnType<typeof NatGateway>>;

      try {
        console.log("Creating VPC...");
        vpc = await Vpc(vpcName, {
          cidrBlock: "10.0.0.0/16",
          tags: { Name: vpcName },
        });
        console.log(`VPC created: ${vpc.vpcId}`);

        console.log("Creating Internet Gateway...");
        internetGateway = await InternetGateway(igwName, {
          tags: { Name: igwName },
        });
        console.log(
          `Internet Gateway created: ${internetGateway.internetGatewayId}`,
        );

        console.log("Attaching Internet Gateway to VPC...");
        try {
          _internetGatewayAttachment = await InternetGatewayAttachment(
            `${igwName}-attachment`,
            {
              vpc,
              internetGateway,
            },
          );
          console.log("Internet Gateway attached successfully");
        } catch (error) {
          console.error("Failed to attach Internet Gateway:", error);
          throw error;
        }

        console.log("Creating public subnet...");
        subnet = await Subnet(subnetName, {
          vpc,
          cidrBlock: "10.0.1.0/24",
          availabilityZone: `${process.env.AWS_REGION}a` || "us-east-1a",
          mapPublicIpOnLaunch: true,
          tags: { Name: subnetName, Type: "public" },
        });
        console.log(`Subnet created: ${subnet.subnetId}`);

        console.log("Creating NAT Gateway...");
        natGateway = await NatGateway(natName, {
          subnet,
          connectivityType: "public",
          tags: {
            Name: natName,
            Environment: "test",
          },
        });
        console.log(`NAT Gateway created: ${natGateway.natGatewayId}`);

        expect(natGateway.natGatewayId).toBeTruthy();
        expect(natGateway.subnetId).toBe(subnet.subnetId);
        expect(natGateway.vpcId).toBe(vpc.vpcId);
        expect(natGateway.allocationId).toBeTruthy();
        expect(natGateway.createdElasticIp).toBe(true);
        expect(natGateway.publicIp).toBeTruthy();

        // Verify NAT gateway exists and is available
        const describeResponse = await ec2.send(
          new DescribeNatGatewaysCommand({
            NatGatewayIds: [natGateway.natGatewayId],
          }),
        );
        const nat = describeResponse.NatGateways?.[0];
        expect(nat?.NatGatewayId).toBe(natGateway.natGatewayId);
        expect(nat?.SubnetId).toBe(subnet.subnetId);
        expect(nat?.VpcId).toBe(vpc.vpcId);
        expect(nat?.State).toBe("available");
      } finally {
        // Always clean up, even if test fails
        console.log("Starting cleanup...");
        await destroy(scope);
        console.log("Cleanup completed!");
      }
    },
    NAT_GATEWAY_TIMEOUT.maxAttempts * NAT_GATEWAY_TIMEOUT.delayMs + 120000, // NAT Gateway timeout + 2min buffer for other resources
  );
});

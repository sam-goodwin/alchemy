import { DescribeVpcsCommand, EC2Client } from "@aws-sdk/client-ec2";
import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy";
import { Vpc } from "../../src/aws/vpc";
import { destroy } from "../../src/destroy";
import { BRANCH_PREFIX } from "../util";
// must import this or else alchemy.test won't exist
import "../../src/test/bun";

const client = new EC2Client({});
const test = alchemy.test(import.meta);

describe("Vpc Resource", () => {
  const testId = `${BRANCH_PREFIX}-test-vpc`;

  test("create, update, and delete vpc with attributes", async (scope) => {
    let vpc: Vpc | undefined;

    try {
      // Create a test VPC with custom attributes
      vpc = await Vpc(testId, {
        cidrBlock: "10.0.0.0/16",
        name: `Test VPC ${testId}`,
        enableDnsHostnames: true,
        enableDnsSupport: true,
        tags: {
          Environment: "Testing",
          Project: "Alchemy",
        },
      });

      expect(vpc.id).toBeTruthy();
      expect(vpc.cidrBlock).toEqual("10.0.0.0/16");
      expect(vpc.name).toEqual(`Test VPC ${testId}`);
      expect(vpc.enableDnsHostnames).toEqual(true);
      expect(vpc.enableDnsSupport).toEqual(true);
      expect(vpc.tags?.Environment).toEqual("Testing");
      expect(vpc.tags?.Project).toEqual("Alchemy");

      // Verify VPC was created by querying AWS API directly
      const describeResponse = await client.send(
        new DescribeVpcsCommand({
          VpcIds: [vpc.id],
        })
      );

      expect(describeResponse.Vpcs).toBeTruthy();
      expect(describeResponse.Vpcs?.length).toEqual(1);

      const awsVpc = describeResponse.Vpcs![0];
      expect(awsVpc.VpcId).toEqual(vpc.id);
      expect(awsVpc.CidrBlock).toEqual("10.0.0.0/16");

      // Verify tags are set correctly
      const nameTag = awsVpc.Tags?.find((tag) => tag.Key === "Name");
      expect(nameTag?.Value).toEqual(`Test VPC ${testId}`);

      const envTag = awsVpc.Tags?.find((tag) => tag.Key === "Environment");
      expect(envTag?.Value).toEqual("Testing");

      // Update the VPC with different attributes
      vpc = await Vpc(testId, {
        cidrBlock: "10.0.0.0/16", // Cannot change CIDR, keep same
        name: `Updated VPC ${testId}`,
        enableDnsHostnames: false, // Changed from true
        enableDnsSupport: true,
        tags: {
          Environment: "Production", // Changed from Testing
          Project: "Alchemy",
        },
      });

      expect(vpc.name).toEqual(`Updated VPC ${testId}`);
      expect(vpc.enableDnsHostnames).toEqual(false);
      expect(vpc.tags?.Environment).toEqual("Production");

      // Verify updates by querying AWS API directly
      const updatedResponse = await client.send(
        new DescribeVpcsCommand({
          VpcIds: [vpc.id],
        })
      );

      const updatedVpc = updatedResponse.Vpcs![0];

      // Verify the name tag was updated
      const updatedNameTag = updatedVpc.Tags?.find((tag) => tag.Key === "Name");
      expect(updatedNameTag?.Value).toEqual(`Updated VPC ${testId}`);

      // Verify environment tag was updated
      const updatedEnvTag = updatedVpc.Tags?.find(
        (tag) => tag.Key === "Environment"
      );
      expect(updatedEnvTag?.Value).toEqual("Production");
    } catch (err) {
      // Log the error to help with debugging
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify VPC was deleted
      if (vpc?.id) {
        try {
          const getDeletedResponse = await client.send(
            new DescribeVpcsCommand({
              VpcIds: [vpc.id],
            })
          );

          // If we get here, the VPC might still exist
          // Check if it's in a terminated state or gone from the response
          if (getDeletedResponse.Vpcs && getDeletedResponse.Vpcs.length > 0) {
            const deletedVpc = getDeletedResponse.Vpcs[0];
            // VPC states are "available" or "pending"
            expect(deletedVpc.State).toEqual("pending");
          } else {
            // VPC was successfully deleted
            expect(getDeletedResponse.Vpcs?.length).toEqual(0);
          }
        } catch (error: any) {
          // The describe call should fail with any of the VPC not found error types
          expect(error.name).toMatch(
            /VpcNotFound|InvalidVpcID\.NotFound|InvalidVpcID\.Malformed/
          );
        }
      }
    }
  });
});

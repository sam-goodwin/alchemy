import { describe, expect } from "bun:test";
import { alchemy } from "../../../src/alchemy.js";
import { createCloudControlClient } from "../../../src/aws/control/client.js";
import { CloudControlResource } from "../../../src/aws/control/resource.js";
import { destroy } from "../../../src/destroy.js";
import { BRANCH_PREFIX } from "../../util.js";
// must import this or else alchemy.test won't exist
import "../../../src/test/bun";

const client = await createCloudControlClient();

const test = alchemy.test(import.meta);

describe("CloudControlResource", () => {
  const testId = `${BRANCH_PREFIX}-test-bucket`;

  test("create, update, and delete S3 bucket", async (scope) => {
    let resource: CloudControlResource | undefined;
    try {
      // Create a test S3 bucket
      resource = await CloudControlResource(testId, {
        typeName: "AWS::S3::Bucket",
        desiredState: {
          BucketName: testId,
          VersioningConfiguration: {
            Status: "Enabled",
          },
        },
      });

      expect(resource.id).toBeTruthy();
      expect(resource.typeName).toEqual("AWS::S3::Bucket");

      // Verify bucket was created by querying the API directly
      const getResponse = await client.getResource(
        "AWS::S3::Bucket",
        resource.id,
      );
      expect(getResponse.BucketName).toEqual(testId);
      expect(getResponse.VersioningConfiguration.Status).toEqual("Enabled");

      // Update the bucket configuration
      resource = await CloudControlResource(testId, {
        typeName: "AWS::S3::Bucket",
        desiredState: {
          BucketName: testId,
          VersioningConfiguration: {
            Status: "Suspended",
          },
        },
      });

      expect(resource.id).toBeTruthy();

      // Verify bucket was updated
      const getUpdatedResponse = await client.getResource(
        "AWS::S3::Bucket",
        resource.id,
      );
      expect(getUpdatedResponse.VersioningConfiguration.Status).toEqual(
        "Suspended",
      );
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify bucket was deleted
      try {
        await client.getResource("AWS::S3::Bucket", resource?.id || "");
        throw new Error("Bucket should have been deleted");
      } catch (error: any) {
        expect(error.code).toEqual("ResourceNotFoundException");
      }
    }
  });

  test("wildcard deletion handler", async (scope) => {
    const bucketIds = [`${testId}-1`, `${testId}-2`];
    let resources: CloudControlResource[] = [];

    try {
      // Create multiple test buckets
      for (const bucketId of bucketIds) {
        const resource = await CloudControlResource(bucketId, {
          typeName: "AWS::S3::Bucket",
          desiredState: {
            BucketName: bucketId,
          },
        });
        resources.push(resource);
      }

      // Verify buckets were created
      for (const resource of resources) {
        const getResponse = await client.getResource(
          "AWS::S3::Bucket",
          resource.id,
        );
        expect(getResponse.BucketName).toBeTruthy();
      }

      // Trigger wildcard deletion
      await destroy(scope);

      // Verify all buckets were deleted
      for (const resource of resources) {
        try {
          await client.getResource("AWS::S3::Bucket", resource.id);
          throw new Error("Bucket should have been deleted");
        } catch (error: any) {
          expect(error.code).toEqual("ResourceNotFoundException");
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      // Clean up in case any test assertions failed
      await destroy(scope);
    }
  });
});

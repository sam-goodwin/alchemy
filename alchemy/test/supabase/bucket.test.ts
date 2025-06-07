import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Bucket } from "../../src/supabase/bucket.ts";
import { Project } from "../../src/supabase/project.ts";
import { Organization } from "../../src/supabase/organization.ts";
import { createSupabaseApi } from "../../src/supabase/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Bucket", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete bucket",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-bucket-test`;
      const orgName = `${BRANCH_PREFIX}-bucket-org`;
      const projectName = `${BRANCH_PREFIX}-bucket-project`;
      const bucketName = `${BRANCH_PREFIX}-test-bucket`;

      try {
        const organization = await Organization("bucket-org", {
          name: orgName,
        });

        const project = await Project("bucket-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const bucket = await Bucket(testId, {
          project: project.id,
          name: bucketName,
          public: true,
          fileSizeLimit: 1024 * 1024,
          allowedMimeTypes: ["image/jpeg", "image/png"],
        });

        expect(bucket.id).toBeTruthy();
        expect(bucket.name).toEqual(bucketName);
        expect(bucket.public).toBe(true);

        const response = await api.get(
          `/projects/${project.id}/storage/buckets`,
        );
        expect(response.ok).toBe(true);
        const buckets = (await response.json()) as any[];
        const createdBucket = buckets.find((b: any) => b.name === bucketName);
        expect(createdBucket).toBeDefined();
        expect(createdBucket.id).toEqual(bucket.id);
        expect(createdBucket.public).toBe(true);

        const updatedBucket = await Bucket(testId, {
          project: project.id,
          name: bucketName,
          public: false,
          fileSizeLimit: 2 * 1024 * 1024,
        });

        expect(updatedBucket.id).toEqual(bucket.id);
        expect(updatedBucket.public).toBe(false);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "adopt existing bucket",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-adopt-test`;
      const orgName = `${BRANCH_PREFIX}-adopt-org`;
      const projectName = `${BRANCH_PREFIX}-adopt-project`;
      const bucketName = `${BRANCH_PREFIX}-adopt-bucket`;

      try {
        const organization = await Organization("adopt-org", {
          name: orgName,
        });

        const project = await Project("adopt-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const originalBucket = await Bucket("original", {
          project: project.id,
          name: bucketName,
          public: false,
        });

        expect(originalBucket.name).toEqual(bucketName);

        const adoptedBucket = await Bucket(testId, {
          project: project.id,
          name: bucketName,
          adopt: true,
        });

        expect(adoptedBucket.id).toEqual(originalBucket.id);
        expect(adoptedBucket.name).toEqual(bucketName);

        const response = await api.get(
          `/projects/${project.id}/storage/buckets`,
        );
        expect(response.ok).toBe(true);
        const buckets = (await response.json()) as any[];
        const bucketsWithName = buckets.filter(
          (b: any) => b.name === bucketName,
        );
        expect(bucketsWithName).toHaveLength(1);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});

import { describe, expect, beforeEach } from "bun:test";
import { alchemy } from "../../src/alchemy";
import { destroy } from "../../src/destroy";
import { Secret } from "../../src/gcp/secret";
import { Secret as AlchemySecretValue } from "../../src/secret";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { BRANCH_PREFIX } from "../util";
// must import this or else alchemy.test won't exist
import "../../src/test/bun";
import { getProjectNumber } from "./get-project-number";
import { GrpcStatus } from "../../src/gcp/grpc-status";

// Instantiate the official GCP client for direct API verification
const client = new SecretManagerServiceClient();

// Helper to decode secret payload
const decodeSecret = (data: string | Uint8Array | null | undefined): string => {
  if (!data) return "";
  return Buffer.from(data.toString(), "utf-8").toString("utf8");
};

// Define the expected structure for automatic replication returned by the API
const expectedAutomaticReplication = {
  automatic: { customerManagedEncryption: undefined },
};
// Define structures for user-managed replication used in tests, including CME field
const expectedUserManagedReplication1 = {
  userManaged: {
    replicas: [{ location: "us-east1", customerManagedEncryption: undefined }],
  },
};
// Input structures for attempting changes (don't need CME field for input)
const userManagedReplication1Input = {
  userManaged: { replicas: [{ location: "us-east1" }] },
};
const userManagedReplication2Input = {
  userManaged: { replicas: [{ location: "us-west1" }] },
};

const test = alchemy.test(import.meta);

describe("google-cloud::Secret Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testSecretIdBase = `${BRANCH_PREFIX}-test-secret`;

  let projectId: string;

  beforeEach(async () => {
    try {
      const projectStr = await client.getProjectId();
      // Project ID can be a string or a number, normalize to always be a number
      projectId = await getProjectNumber(projectStr);
    } catch (e) {
      console.error(
        "[Test Setup] Failed to get Google Cloud Project ID. Ensure ADC is configured.",
        e,
      );
      throw new Error("Could not determine Project ID for tests.");
    }

    if (!projectId) {
      throw new Error(
        "[Test Setup] Google Cloud Project ID is empty. Ensure ADC is configured.",
      );
    }
  });

  test("create, update, and delete secret", async (scope) => {
    const testSecretId = `${testSecretIdBase}-crud`; // Unique ID for this test
    // Construct name using the identifier fetched from the client
    const secretName = `projects/${projectId}/secrets/${testSecretId}`;

    let resource: Secret | undefined;
    let initialVersionName: string | undefined;
    let updatedVersionName: string | undefined;

    try {
      // --- Create Phase ---
      const initialSecretValue = "initial-secret-value";
      resource = await Secret(testSecretId, {
        secretValue: new AlchemySecretValue(initialSecretValue),
        labels: { env: "test", phase: "create" },
        replication: { automatic: {} },
      });

      expect(resource).toBeDefined();
      expect(resource.name).toEqual(secretName);
      expect(resource.labels?.env).toEqual("test");
      expect(resource.labels?.phase).toEqual("create");
      expect(resource.replication).toEqual(expectedAutomaticReplication); // Use constant
      expect(resource.latestVersionName).toBeTruthy();
      initialVersionName = resource.latestVersionName;
      // Verify creation via GCP API
      const [getCreatedSecret] = await client.getSecret({ name: secretName });
      expect(getCreatedSecret).toBeDefined();
      expect(getCreatedSecret.name).toEqual(secretName);
      expect(getCreatedSecret.labels?.env).toEqual("test");
      expect(getCreatedSecret.replication).toEqual(
        expect.objectContaining(expectedAutomaticReplication),
      );

      // Verify initial version content
      const [accessInitialVersion] = await client.accessSecretVersion({
        name: initialVersionName,
      });
      expect(decodeSecret(accessInitialVersion.payload?.data)).toEqual(
        initialSecretValue,
      );

      // --- Update Phase ---
      const updatedSecretValue = "updated-secret-value";
      resource = await Secret(testSecretId, {
        secretValue: new AlchemySecretValue(updatedSecretValue),
        labels: { env: "test", phase: "update", newlabel: "added" },
        replication: { automatic: {} },
      });

      expect(resource).toBeDefined();
      expect(resource.name).toEqual(secretName);
      expect(resource.labels?.env).toEqual("test");
      expect(resource.labels?.phase).toEqual("update");
      expect(resource.labels?.newlabel).toEqual("added");
      expect(resource.replication).toEqual(expectedAutomaticReplication); // Use constant
      expect(resource.latestVersionName).toBeTruthy();
      expect(resource.latestVersionName).not.toEqual(initialVersionName);
      updatedVersionName = resource.latestVersionName;

      // Verify update via GCP API
      const [getUpdatedSecret] = await client.getSecret({ name: secretName });
      expect(getUpdatedSecret).toBeDefined();
      expect(getUpdatedSecret.labels?.phase).toEqual("update");
      expect(getUpdatedSecret.labels?.newlabel).toEqual("added");
      expect(getUpdatedSecret.replication).toEqual(
        expect.objectContaining(expectedAutomaticReplication),
      );

      // Verify new version content
      const [accessUpdatedVersion] = await client.accessSecretVersion({
        name: updatedVersionName,
      });
      expect(decodeSecret(accessUpdatedVersion.payload?.data)).toEqual(
        updatedSecretValue,
      );
    } catch (err) {
      throw err;
    } finally {
      // --- Cleanup Phase ---
      await destroy(scope);

      // Verify resource was deleted via GCP API
      try {
        await client.getSecret({ name: secretName });
        throw new Error(
          `Secret ${secretName} was not deleted after destroy(scope).`,
        );
      } catch (error: any) {
        expect(error.code).toEqual(GrpcStatus.NOT_FOUND);
      }
      // Verify versions deleted
      if (initialVersionName) {
        try {
          await client.getSecretVersion({ name: initialVersionName });
        } catch (error: any) {
          expect(error.code).toEqual(GrpcStatus.NOT_FOUND);
        }
      }
      if (updatedVersionName) {
        try {
          await client.getSecretVersion({ name: updatedVersionName });
        } catch (error: any) {
          expect(error.code).toEqual(GrpcStatus.NOT_FOUND);
        }
      }
    }
  });

  // Test Case for Replication Type Update Attempt
  test("throws error when attempting to update replication policy type", async (scope) => {
    const testSecretId = `${testSecretIdBase}-replication-type`; // Unique ID
    const secretName = `projects/${projectId}/secrets/${testSecretId}`;
    let resource: Secret | undefined;

    try {
      // Create the secret with automatic replication
      resource = await Secret(testSecretId, {
        secretValue: new AlchemySecretValue("replication-test-value"),
        labels: { test: "replication" },
        replication: { automatic: {} },
      });
      expect(resource).toBeDefined();
      expect(resource.name).toEqual(secretName);
      expect(resource.replication).toEqual(expectedAutomaticReplication);

      // Attempt to update the secret with user-managed replication
      const updatePromise = Secret(testSecretId, {
        secretValue: new AlchemySecretValue("replication-test-value-update"),
        labels: { test: "replication", update: "attempt" },
        replication: userManagedReplication1Input, // Attempt type change
      });

      // Expect the update promise to reject with the specific error
      await expect(updatePromise).rejects.toThrow(
        `Replication policy type for secret ${secretName} cannot be changed after creation.`,
      );
      // Verify the secret still exists and wasn't modified unexpectedly
      const [getSecretAfterFail] = await client.getSecret({ name: secretName });
      expect(getSecretAfterFail).toBeDefined();
      expect(getSecretAfterFail.labels?.test).toEqual("replication");
      expect(getSecretAfterFail.labels?.update).toBeUndefined();
      expect(getSecretAfterFail.replication).toEqual(
        expect.objectContaining(expectedAutomaticReplication),
      );
    } catch (err) {
      throw err;
    } finally {
      // --- Cleanup Phase ---
      await destroy(scope);

      // Verify resource was deleted via GCP API
      try {
        await client.getSecret({ name: secretName });
        throw new Error(
          `Secret ${secretName} was not deleted after destroy(scope).`,
        );
      } catch (error: any) {
        expect(error.code).toEqual(GrpcStatus.NOT_FOUND);
      }
    }
  });

  // Test Case for UserManaged Replica Location Change Attempt
  test("throws error when attempting to change userManaged replica locations", async (scope) => {
    const testSecretId = `${testSecretIdBase}-replica-loc`; // Unique ID
    const secretName = `projects/${projectId}/secrets/${testSecretId}`;
    let resource: Secret | undefined;

    try {
      // Create the secret with user-managed replication (location 1)
      resource = await Secret(testSecretId, {
        secretValue: new AlchemySecretValue("replica-location-test"),
        labels: { test: "replicaloc" },
        replication: userManagedReplication1Input, // Input structure
      });
      expect(resource).toBeDefined();
      expect(resource.name).toEqual(secretName);
      expect(resource.replication).toEqual(expectedUserManagedReplication1);

      // Attempt to update the secret with different replica locations

      const updatePromise = Secret(testSecretId, {
        secretValue: new AlchemySecretValue("replica-location-test-update"), // Value change needed
        labels: { test: "replicaloc", update: "attempt" },
        replication: userManagedReplication2Input, // Attempt change to location 2 (input structure)
      });

      // Expect the update promise to reject with the specific error
      await expect(updatePromise).rejects.toThrow(
        `User-managed replica locations for secret ${secretName} cannot be changed after creation.`,
      );

      // Verify the secret still exists and wasn't modified unexpectedly
      const [getSecretAfterFail] = await client.getSecret({ name: secretName });
      expect(getSecretAfterFail).toBeDefined();
      expect(getSecretAfterFail.labels?.test).toEqual("replicaloc");
      expect(getSecretAfterFail.labels?.update).toBeUndefined();
      // Replication should remain the original userManaged config
      expect(getSecretAfterFail.replication).toEqual(
        expect.objectContaining(expectedUserManagedReplication1),
      );
    } catch (err) {
      console.error("[Test RepLoc] Unexpected error during test:", err);
      throw err;
    } finally {
      // --- Cleanup Phase ---
      await destroy(scope);

      // Verify resource was deleted via GCP API
      try {
        await client.getSecret({ name: secretName });
        throw new Error(
          `Secret ${secretName} was not deleted after destroy(scope).`,
        );
      } catch (error: any) {
        expect(error.code).toEqual(GrpcStatus.NOT_FOUND);
      }
    }
  });
});

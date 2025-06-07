import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Namespace } from "../../src/k8s/namespace.ts";
import { createKubernetesClient } from "../../src/k8s/client.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Kubernetes Namespace Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-ns`;

  test("create and delete namespace", async (scope) => {
    let namespace: Namespace | undefined;

    try {
      // Create a test namespace
      namespace = await Namespace(testId, {
        name: testId,
        labels: {
          environment: "test",
          "managed-by": "alchemy"
        },
        annotations: {
          "description": "Test namespace for alchemy k8s provider",
          "created-by": "alchemy-test"
        }
      });

      expect(namespace.name).toEqual(testId);
      expect(namespace.labels?.environment).toEqual("test");
      expect(namespace.labels?.["managed-by"]).toEqual("alchemy");
      expect(namespace.annotations?.description).toEqual("Test namespace for alchemy k8s provider");
      expect(namespace.uid).toBeTruthy();
      expect(namespace.creationTimestamp).toBeTruthy();
      expect(namespace.resourceVersion).toBeTruthy();

      // Verify namespace exists in cluster
      const client = createKubernetesClient();
      const getResponse = await client.coreV1Api.readNamespace(testId);
      expect(getResponse.body.metadata?.name).toEqual(testId);
      expect(getResponse.body.metadata?.labels?.environment).toEqual("test");
    } finally {
      await destroy(scope);

      // Verify namespace was deleted
      if (namespace) {
        await assertNamespaceDeleted(namespace);
      }
    }
  });

  test("update namespace labels and annotations", async (scope) => {
    const updateTestId = `${testId}-update`;
    let namespace: Namespace | undefined;

    try {
      // Create namespace with initial labels
      namespace = await Namespace(updateTestId, {
        name: updateTestId,
        labels: {
          environment: "test",
          version: "v1"
        }
      });

      expect(namespace.name).toEqual(updateTestId);
      expect(namespace.labels?.environment).toEqual("test");
      expect(namespace.labels?.version).toEqual("v1");

      // Update the namespace with new labels and annotations
      namespace = await Namespace(updateTestId, {
        name: updateTestId,
        labels: {
          environment: "production",
          version: "v2",
          "new-label": "added"
        },
        annotations: {
          "updated": "true",
          "timestamp": new Date().toISOString()
        }
      });

      expect(namespace.labels?.environment).toEqual("production");
      expect(namespace.labels?.version).toEqual("v2");
      expect(namespace.labels?.["new-label"]).toEqual("added");
      expect(namespace.annotations?.updated).toEqual("true");
      expect(namespace.annotations?.timestamp).toBeTruthy();
    } finally {
      await destroy(scope);
    }
  });

  test("adopt existing namespace", async (scope) => {
    const adoptTestId = `${testId}-adopt`;

    try {
      // Create namespace directly via Kubernetes API
      const client = createKubernetesClient();
      await client.coreV1Api.createNamespace({
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: adoptTestId,
          labels: {
            "pre-existing": "true"
          }
        }
      });

      // Now try to create the same namespace via Alchemy (should adopt it)
      const namespace = await Namespace(adoptTestId, {
        name: adoptTestId,
        labels: {
          environment: "test",
          "managed-by": "alchemy"
        }
      });

      expect(namespace.name).toEqual(adoptTestId);
      expect(namespace.labels?.["pre-existing"]).toEqual("true");
      expect(namespace.uid).toBeTruthy();

      // Verify it was adopted and updated
      const getResponse = await client.coreV1Api.readNamespace(adoptTestId);
      expect(getResponse.body.metadata?.labels?.environment).toEqual("test");
      expect(getResponse.body.metadata?.labels?.["managed-by"]).toEqual("alchemy");
    } finally {
      await destroy(scope);
    }
  });
});

async function assertNamespaceDeleted(namespace: Namespace) {
  const client = createKubernetesClient();
  try {
    await client.coreV1Api.readNamespace(namespace.name);
    throw new Error(`Namespace ${namespace.name} was not deleted as expected`);
  } catch (error: any) {
    // If we get a 404, the namespace was deleted (expected)
    if (error.response?.status === 404) {
      return; // This is expected
    } else {
      throw new Error(`Unexpected error checking if namespace was deleted: ${error}`);
    }
  }
}
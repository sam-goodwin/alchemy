import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { DOFSStateStore } from "../../src/cloudflare/do-state-store/index.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

// must import this or else alchemy.test won't exist
import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("DOFS State Store", () => {
  test("create and configure state store", async (scope) => {
    const stateStore = new DOFSStateStore(scope, {
      autoDeploy: false,
      url: "https://test-worker.example.workers.dev",
      workerName: `${BRANCH_PREFIX}-test-worker`,
      basePath: "/test-alchemy",
    });

    expect(stateStore.scope).toBe(scope);
    
    await destroy(scope);
  });

  test("auto-deploy worker with bundling", async (scope) => {
    const stateStore = new DOFSStateStore(scope, {
      autoDeploy: true,
      workerName: `${BRANCH_PREFIX}-dofs-test-worker`,
      basePath: "/test-alchemy",
    });

    // This should create and deploy a worker successfully
    await stateStore.init();
    
    await destroy(scope);
  });

  test("state operations", async (scope) => {
    const stateStore = new DOFSStateStore(scope, {
      autoDeploy: true,
      workerName: `${BRANCH_PREFIX}-ops-test-worker`,
    });

    // Test basic operations with actual deployment
    const keys = await stateStore.list();
    expect(Array.isArray(keys)).toBe(true);

    const count = await stateStore.count();
    expect(typeof count).toBe('number');

    const allStates = await stateStore.all();
    expect(typeof allStates).toBe('object');

    await destroy(scope);
  });

  test("resource lifecycle with state persistence", async (scope) => {
    const stateStore = new DOFSStateStore(scope, {
      autoDeploy: true,
      workerName: `${BRANCH_PREFIX}-lifecycle-final`,
    });

    // Simulate resource creation state
    const resourceId = "test-resource-001";
    const createState = {
      status: "created" as const,
      kind: "cloudflare::Worker",
      id: resourceId,
      fqn: `${scope.chain.join("/")}/${resourceId}`,
      seq: 1,
      data: {},
      props: { 
        name: "my-worker",
        script: "export default { fetch() { return new Response('v1'); } }",
        url: true 
      },
      output: {
        id: resourceId,
        name: "my-worker", 
        url: "https://my-worker.example.workers.dev",
        createdAt: Date.now(),
        updatedAt: Date.now()
      } as any,
    };

    // Create initial state
    await stateStore.set(resourceId, createState);
    
    // Verify state was persisted
    let retrievedState = await stateStore.get(resourceId);
    expect(retrievedState).toBeTruthy();
    expect(retrievedState?.status).toBe("created");
    expect(retrievedState?.props?.name).toBe("my-worker");

    // Simulate resource update
    const updateState = {
      ...createState,
      status: "updated" as const,
      seq: 2,
      props: {
        ...createState.props,
        script: "export default { fetch() { return new Response('v2'); } }",
      },
      output: {
        ...createState.output,
        updatedAt: Date.now()
      }
    };

    await stateStore.set(resourceId, updateState);

    // Verify update was persisted
    retrievedState = await stateStore.get(resourceId);
    expect(retrievedState?.status).toBe("updated");
    expect(retrievedState?.seq).toBe(2);
    expect(retrievedState?.props?.script).toContain("v2");

    // Test resource deletion
    await stateStore.delete(resourceId);
    const deletedState = await stateStore.get(resourceId);
    expect(deletedState).toBeUndefined();

    await destroy(scope);
  });

  test("authentication with api key", async (scope) => {
    const stateStore = new DOFSStateStore(scope, {
      autoDeploy: true,
      workerName: `${BRANCH_PREFIX}-auth-test-worker`,
      apiKey: "test-secret-key-123"
    });

    // This should work with valid authentication
    await stateStore.init();
    const keys = await stateStore.list();
    expect(Array.isArray(keys)).toBe(true);

    await destroy(scope);
  });

  test("authentication fails with wrong api key", async (scope) => {
    // Create worker with one API key  
    const stateStore1 = new DOFSStateStore(scope, {
      autoDeploy: true,
      workerName: `${BRANCH_PREFIX}-auth-fail-unique`,
      apiKey: "correct-secret-key-123"
    });
    
    await stateStore1.init();
    
    // Get the deployed worker URL directly from the private property
    const workerUrl = (stateStore1 as any).deployedWorkerUrl;
    
    if (!workerUrl) {
      throw new Error("Worker URL not found after deployment");
    }

    // Try to access the same worker URL but with wrong API key
    // This should fail at the worker level with 401 Unauthorized 
    const response = await fetch(`${workerUrl}/listDir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer wrong-secret-key-456"
      },
      body: JSON.stringify({ path: "/test" })
    });
    
    // Should get 401 Unauthorized
    expect(response.status).toBe(401);
    expect(await response.text()).toBe("Unauthorized");

    await destroy(scope);
  });

  test("scope hierarchy and state isolation", async (scope) => {
    const parentStore = new DOFSStateStore(scope, {
      autoDeploy: true,
      workerName: `${BRANCH_PREFIX}-hierarchy-test`,
    });

    // Create nested scope using alchemy.run instead of scope.run
    let childScope: any;
    await alchemy.run("child-scope", async (childScopeParam) => {
      childScope = childScopeParam;
      const childStore = new DOFSStateStore(childScope, {
        autoDeploy: true,
        workerName: `${BRANCH_PREFIX}-hierarchy-test`,
      });

      // Parent and child should have different paths due to scope hierarchy
      expect(parentStore.scope.chain).not.toEqual(childStore.scope.chain);
      expect(childStore.scope.chain.length).toBe(parentStore.scope.chain.length + 1);

      // Set state in child scope
      const childResourceState = {
        status: "created" as const,
        kind: "cloudflare::KVNamespace",
        id: "child-resource",
        fqn: `${childScope.chain.join("/")}/child-resource`,
        seq: 1,
        data: {},
        props: { name: "child-kv" },
        output: { id: "child-resource", name: "child-kv" } as any,
      };

      await childStore.set("child-resource", childResourceState);

      // Verify child state exists in child scope
      const childState = await childStore.get("child-resource");
      expect(childState).toBeTruthy();
      expect(childState?.props?.name).toBe("child-kv");
    });

    // Set state in parent scope
    const parentResourceState = {
      status: "created" as const,
      kind: "cloudflare::R2Bucket",
      id: "parent-resource",
      fqn: `${scope.chain.join("/")}/parent-resource`,
      seq: 1,
      data: {},
      props: { name: "parent-bucket" },
      output: { id: "parent-resource", name: "parent-bucket" } as any,
    };

    await parentStore.set("parent-resource", parentResourceState);

    // Verify parent and child states are isolated
    const parentState = await parentStore.get("parent-resource");
    expect(parentState).toBeTruthy();
    expect(parentState?.props?.name).toBe("parent-bucket");

    // Parent store should not see child resource
    const childStateFromParent = await parentStore.get("child-resource");
    expect(childStateFromParent).toBeUndefined();

    // Child store should not see parent resource
    const childStore = new DOFSStateStore(childScope, {
      autoDeploy: true,
      workerName: `${BRANCH_PREFIX}-hierarchy-test`,
    });
    const parentStateFromChild = await childStore.get("parent-resource");
    expect(parentStateFromChild).toBeUndefined();

    await destroy(scope);
  });
}); 
import { describe, expect, test } from "bun:test";
import { apply } from "../../src/apply";
import type { WorkerBindingWorkflow } from "../../src/cloudflare/bindings";
import { Worker } from "../../src/cloudflare/worker";
import { Workflow } from "../../src/cloudflare/workflow";
import { destroy } from "../../src/destroy";

describe("Workflow Resource", () => {
  // Test worker names
  const workerWithWorkflowName = "test-worker-workflow";
  const workerWithMultipleWorkflowsName = "test-worker-multi-workflows";
  const workerWithWorkflowMigrationName = "test-worker-workflow-migration";

  // Sample worker script with workflow
  const workerWithWorkflowScript = `
    export class MyWorkflow {
      async fetch(request, env) {
        return new Response('Hello from workflow!', { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        if (request.url.includes('/workflow')) {
          return env.MY_WORKFLOW.fetch(request);
        }
        return new Response('Hello from main worker!', { status: 200 });
      }
    };
  `;

  // Sample worker script with multiple workflows
  const workerWithMultipleWorkflowsScript = `
    export class WorkflowA {
      async fetch(request, env) {
        return new Response('Hello from workflow A!', { status: 200 });
      }
    }

    export class WorkflowB {
      async fetch(request, env) {
        return new Response('Hello from workflow B!', { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.pathname === '/workflow-a') {
          return env.WORKFLOW_A.fetch(request);
        }
        if (url.pathname === '/workflow-b') {
          return env.WORKFLOW_B.fetch(request);
        }
        return new Response('Hello from main worker!', { status: 200 });
      }
    };
  `;

  // Sample worker script with workflow class to be migrated
  const workerWithWorkflowV1Script = `
    export class OriginalWorkflow {
      async fetch(request, env) {
        return new Response('Hello from original workflow!', { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        if (request.url.includes('/workflow')) {
          return env.MY_WORKFLOW.fetch(request);
        }
        return new Response('Hello from main worker!', { status: 200 });
      }
    };
  `;

  const workerWithWorkflowV2Script = `
    export class UpdatedWorkflow {
      async fetch(request, env) {
        return new Response('Hello from updated workflow!', { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        if (request.url.includes('/workflow')) {
          return env.MY_WORKFLOW.fetch(request);
        }
        return new Response('Hello from main worker!', { status: 200 });
      }
    };
  `;

  test("create and delete worker with workflow binding", async () => {
    let worker: Worker | undefined;
    try {
      // Create a workflow binding
      const workflowBinding = new Workflow("test-workflow", {
        workflowName: "my-workflow",
        className: "MyWorkflow",
        // get 400 if workflow
        scriptName: workerWithWorkflowName,
      });

      // Create a worker with the workflow binding
      worker = new Worker(workerWithWorkflowName, {
        name: workerWithWorkflowName,
        script: workerWithWorkflowScript,
        format: "esm",
        bindings: {
          MY_WORKFLOW: workflowBinding,
        },
        url: true,
      });

      // Apply to create the worker
      const output = await apply(worker);
      expect(output.id).toBeTruthy();
      expect(output.name).toEqual(workerWithWorkflowName);
      expect(output.bindings).toHaveLength(1);

      // Verify the workflow binding
      const binding = output.bindings[0] as WorkerBindingWorkflow;
      expect(binding.type).toEqual("workflow");
      expect(binding.name).toEqual("MY_WORKFLOW");
      expect(binding.workflow_name).toEqual("my-workflow");
      expect(binding.script_name).toEqual("my-workflow");
      expect(binding.class_name).toEqual("MyWorkflow");
    } finally {
      if (worker) {
        await destroy(worker);
      }
    }
  });

  test("create worker with multiple workflow bindings", async () => {
    let worker: Worker | undefined;
    let workflowA: Workflow | undefined;
    let workflowB: Workflow | undefined;
    try {
      // Create workflow bindings
      workflowA = new Workflow("test-workflow-a", {
        workflowName: "workflow_a",
        className: "WorkflowA",
        // script name m
        scriptName: workerWithMultipleWorkflowsName,
      });

      workflowB = new Workflow("test-workflow-b", {
        workflowName: "workflow_b",
        className: "WorkflowB",
        scriptName: workerWithMultipleWorkflowsName,
      });

      // Create worker with multiple workflow bindings
      worker = new Worker(workerWithMultipleWorkflowsName, {
        name: workerWithMultipleWorkflowsName,
        script: workerWithMultipleWorkflowsScript,
        format: "esm",
        bindings: {
          WORKFLOW_A: workflowA,
          WORKFLOW_B: workflowB,
        },
        url: true,
      });

      // Apply to create the worker
      const output = await apply(worker);
      expect(output.id).toBeTruthy();
      expect(output.name).toEqual(workerWithMultipleWorkflowsName);
      expect(output.bindings).toHaveLength(2);

      // Verify workflow A binding
      const bindingA = output.bindings[0] as WorkerBindingWorkflow;
      expect(bindingA.type).toEqual("workflow");
      expect(bindingA.name).toEqual("WORKFLOW_A");
      expect(bindingA.workflow_name).toEqual("workflow_a");
      expect(bindingA.script_name).toEqual("workflow_a");
      expect(bindingA.class_name).toEqual("WorkflowA");

      // Verify workflow B binding
      const bindingB = output.bindings[1] as WorkerBindingWorkflow;
      expect(bindingB.type).toEqual("workflow");
      expect(bindingB.name).toEqual("WORKFLOW_B");
      expect(bindingB.workflow_name).toEqual("workflow_b");
      expect(bindingB.script_name).toEqual("workflow_b");
      expect(bindingB.class_name).toEqual("WorkflowB");
    } finally {
      if (worker) {
        await destroy(worker);
      }
      if (workflowA) {
        await destroy(workflowA);
      }
      if (workflowB) {
        await destroy(workflowB);
      }
    }
  });

  test("migrate workflow by renaming class", async () => {
    let worker: Worker | undefined;
    let workflow: Workflow | undefined;
    try {
      // First create the worker with original workflow class
      workflow = new Workflow("test-workflow-migration", {
        workflowName: "my-workflow",
        className: "OriginalWorkflow",
        scriptName: workerWithWorkflowMigrationName,
        worker: () => worker,
      });

      worker = new Worker(workerWithWorkflowMigrationName, {
        name: workerWithWorkflowMigrationName,
        script: workerWithWorkflowV1Script,
        format: "esm",
        bindings: {
          MY_WORKFLOW: workflow,
        },
      });

      // Apply to create the worker
      const initialOutput = await apply(worker);
      expect(initialOutput.bindings).toHaveLength(1);
      expect(
        (initialOutput.bindings[0] as WorkerBindingWorkflow).class_name,
      ).toEqual("OriginalWorkflow");

      // Update the worker with renamed workflow class
      workflow = new Workflow("test-workflow-migration", {
        workflowName: "my-workflow",
        className: "UpdatedWorkflow",
      });

      const updatedWorker = new Worker(workerWithWorkflowMigrationName, {
        name: workerWithWorkflowMigrationName,
        script: workerWithWorkflowV2Script,
        format: "esm",
        bindings: {
          MY_WORKFLOW: workflow,
        },
      });

      // Apply the update
      const updatedOutput = await apply(updatedWorker);
      expect(updatedOutput.bindings).toHaveLength(1);
      expect(
        (updatedOutput.bindings[0] as WorkerBindingWorkflow).class_name,
      ).toEqual("UpdatedWorkflow");
    } finally {
      if (worker) {
        await destroy(worker);
      }
      if (workflow) {
        await destroy(workflow);
      }
    }
  });
});

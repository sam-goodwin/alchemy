import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
import { Project } from "../../src/railway/project.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Function, type FunctionResource } from "../../src/railway/function.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const api = createRailwayApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Railway Function", () => {
  test("function lifecycle with HTTP trigger", async (scope) => {
    const projectName = `${BRANCH_PREFIX}-function-test`;
    let project: Project;
    let environment: Environment;
    let func: FunctionResource | undefined;

    try {
      // Create project and environment
      project = await Project("function-test-project", {
        name: projectName,
        description: "Test project for Railway function provider",
      });

      environment = await Environment("test-env", {
        name: "test",
        project: project,
      });

      // Create simple HTTP function
      const functionCode = `
        export default {
          async fetch(request) {
            const url = new URL(request.url);
            
            if (url.pathname === "/health") {
              return new Response(JSON.stringify({ status: "ok" }), {
                headers: { "Content-Type": "application/json" }
              });
            }
            
            return new Response(JSON.stringify({ 
              message: "Hello from Railway Function!",
              timestamp: new Date().toISOString()
            }), {
              headers: { "Content-Type": "application/json" }
            });
          }
        };
      `;

      func = await Function("test-function", {
        name: "test-api",
        code: functionCode,
        project: project,
        environment: environment,
        trigger: {
          http: {
            methods: ["GET", "POST"],
            path: "/",
          },
        },
        runtime: {
          memoryMB: 128,
          timeoutSeconds: 30,
        },
        description: "Test function for API endpoint",
      });

      expect(func).toMatchObject({
        name: "test-api",
        code: functionCode,
        status: "SUCCESS",
        runtime: {
          memoryMB: 128,
          timeoutSeconds: 30,
        },
        trigger: {
          http: {
            methods: ["GET", "POST"],
            path: "/",
          },
        },
        description: "Test function for API endpoint",
      });

      expect(func.functionId).toBeTruthy();
      expect(func.projectId).toBe(project.projectId);
      expect(func.environmentId).toBe(environment.environmentId);
      expect(func.url).toBeTruthy();
      expect(func.codeSize).toBeGreaterThan(0);
      expect(func.createdAt).toBeTruthy();
      expect(func.updatedAt).toBeTruthy();

      // Update function code
      const updatedCode = `
        import { Hono } from "hono@4";
        
        const app = new Hono();
        
        app.get("/", (c) => c.json({ message: "Updated function!" }));
        app.get("/version", (c) => c.json({ version: "2.0" }));
        
        export default app;
      `;

      func = await Function("test-function", {
        name: "test-api",
        code: updatedCode,
        project: project,
        environment: environment,
        trigger: {
          http: {
            methods: ["GET", "POST"],
            path: "/",
          },
        },
        packages: ["hono@4"],
        runtime: {
          memoryMB: 256, // Increased memory
          timeoutSeconds: 45,
        },
        description: "Updated test function with Hono framework",
      });

      expect(func.code).toBe(updatedCode);
      expect(func.packages).toContain("hono@4");
      expect(func.runtime.memoryMB).toBe(256);
      expect(func.runtime.timeoutSeconds).toBe(45);
      expect(func.description).toBe(
        "Updated test function with Hono framework",
      );
    } finally {
      await destroy(scope);
      if (func) {
        await assertFunctionDoesNotExist(api, func);
      }
    }
  });

  test("cron-triggered function", async (scope) => {
    const projectName = `${BRANCH_PREFIX}-cron-function-test`;
    let project: Project;
    let environment: Environment;
    let func: FunctionResource | undefined;

    try {
      // Create project and environment
      project = await Project("cron-function-test-project", {
        name: projectName,
        description: "Test project for Railway cron function",
      });

      environment = await Environment("test-env", {
        name: "test",
        project: project,
      });

      // Create cron function
      const cronCode = `
        export default {
          async scheduled(event, env, ctx) {
            console.log("Cron job executed at:", new Date().toISOString());
            
            // Simulate some work
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return new Response("Cron job completed successfully");
          }
        };
      `;

      func = await Function("cron-function", {
        name: "daily-cleanup",
        code: cronCode,
        project: project,
        environment: environment,
        trigger: {
          cron: {
            schedule: "0 2 * * *", // Daily at 2 AM
            timezone: "UTC",
          },
        },
        runtime: {
          memoryMB: 256,
          timeoutSeconds: 300, // 5 minutes for longer-running tasks
        },
        description: "Daily cleanup cron job",
      });

      expect(func).toMatchObject({
        name: "daily-cleanup",
        code: cronCode,
        trigger: {
          cron: {
            schedule: "0 2 * * *",
            timezone: "UTC",
          },
        },
        runtime: {
          memoryMB: 256,
          timeoutSeconds: 300,
        },
        description: "Daily cleanup cron job",
      });

      expect(func.functionId).toBeTruthy();
      expect(func.status).toBe("SUCCESS");
    } finally {
      await destroy(scope);
      if (func) {
        await assertFunctionDoesNotExist(api, func);
      }
    }
  });
});

async function assertFunctionDoesNotExist(
  api: ReturnType<typeof createRailwayApi>,
  func: FunctionResource,
) {
  try {
    const query = `
      query getFunction($id: String!) {
        function(id: $id) {
          id
        }
      }
    `;

    await api.query(query, { id: func.functionId });

    // If we get here, the function still exists
    throw new Error(
      `Function ${func.functionId} should have been deleted but still exists`,
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("should have been deleted")
    ) {
      throw error;
    }
    // Expected: function not found error means it was successfully deleted
  }
}

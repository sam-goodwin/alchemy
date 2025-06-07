import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Function } from "../../src/supabase/function.ts";
import { Project } from "../../src/supabase/project.ts";
import { Organization } from "../../src/supabase/organization.ts";
import { createSupabaseApi } from "../../src/supabase/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Function", () => {
  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create, update, and delete function with inline code",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-function-test`;
      const orgName = `${BRANCH_PREFIX}-func-org`;
      const projectName = `${BRANCH_PREFIX}-func-project`;
      const functionName = `${BRANCH_PREFIX}-test-function`;

      try {
        const organization = await Organization("func-org", {
          name: orgName,
        });

        const project = await Project("func-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const functionCode = `
export default async function handler(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ message: "Hello from test function!" }), {
    headers: { "Content-Type": "application/json" },
  });
}`;

        const edgeFunction = await Function(testId, {
          project: project.id,
          name: functionName,
          script: functionCode,
        });

        expect(edgeFunction.id).toBeTruthy();
        expect(edgeFunction.name).toEqual(functionName);
        expect(edgeFunction.slug).toBeTruthy();

        const response = await api.get(`/projects/${project.id}/functions`);
        expect(response.ok).toBe(true);
        const functions = (await response.json()) as any[];
        const createdFunction = functions.find(
          (f: any) => f.name === functionName,
        );
        expect(createdFunction).toBeDefined();
        expect(createdFunction.id).toEqual(edgeFunction.id);

        const updatedCode = `
export default async function handler(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ message: "Updated test function!" }), {
    headers: { "Content-Type": "application/json" },
  });
}`;

        const updatedFunction = await Function(testId, {
          project: project.id,
          name: functionName,
          script: updatedCode,
        });

        expect(updatedFunction.id).toEqual(edgeFunction.id);
        expect(updatedFunction.name).toEqual(functionName);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "adopt existing function",
    async (scope) => {
      const api = await createSupabaseApi();
      const testId = `${BRANCH_PREFIX}-adopt-test`;
      const orgName = `${BRANCH_PREFIX}-adopt-org`;
      const projectName = `${BRANCH_PREFIX}-adopt-project`;
      const functionName = `${BRANCH_PREFIX}-adopt-function`;

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

        const functionCode = `
export default async function handler(req: Request): Promise<Response> {
  return new Response("Hello World");
}`;

        const originalFunction = await Function("original", {
          project: project.id,
          name: functionName,
          script: functionCode,
        });

        expect(originalFunction.name).toEqual(functionName);

        const adoptedFunction = await Function(testId, {
          project: project.id,
          name: functionName,
          script: functionCode,
          adopt: true,
        });

        expect(adoptedFunction.id).toEqual(originalFunction.id);
        expect(adoptedFunction.name).toEqual(functionName);

        const response = await api.get(`/projects/${project.id}/functions`);
        expect(response.ok).toBe(true);
        const functions = (await response.json()) as any[];
        const functionsWithName = functions.filter(
          (f: any) => f.name === functionName,
        );
        expect(functionsWithName).toHaveLength(1);
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create function with main property and bundling",
    async (scope) => {
      const testId = `${BRANCH_PREFIX}-bundle-test`;
      const orgName = `${BRANCH_PREFIX}-bundle-org`;
      const projectName = `${BRANCH_PREFIX}-bundle-project`;
      const functionName = `${BRANCH_PREFIX}-bundle-function`;

      try {
        const organization = await Organization("bundle-org", {
          name: orgName,
        });

        const project = await Project("bundle-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const edgeFunction = await Function(testId, {
          project: project.id,
          name: functionName,
          main: "./examples/supabase/src/api.ts",
          bundle: {
            format: "esm",
            target: "esnext",
          },
        });

        expect(edgeFunction.id).toBeTruthy();
        expect(edgeFunction.name).toEqual(functionName);
        expect(edgeFunction.slug).toBeTruthy();
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );

  test.skipIf(!process.env.SUPABASE_ACCESS_TOKEN)(
    "create function with script property",
    async (scope) => {
      const testId = `${BRANCH_PREFIX}-script-test`;
      const orgName = `${BRANCH_PREFIX}-script-org`;
      const projectName = `${BRANCH_PREFIX}-script-project`;
      const functionName = `${BRANCH_PREFIX}-script-function`;

      try {
        const organization = await Organization("script-org", {
          name: orgName,
        });

        const project = await Project("script-project", {
          organizationId: organization.id,
          name: projectName,
          region: "us-east-1",
          dbPass: "test-password-123",
        });

        const functionCode = `
export default async function handler(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ message: "Hello from script function!" }), {
    headers: { "Content-Type": "application/json" },
  });
}`;

        const edgeFunction = await Function(testId, {
          project: project.id,
          name: functionName,
          script: functionCode,
        });

        expect(edgeFunction.id).toBeTruthy();
        expect(edgeFunction.name).toEqual(functionName);
        expect(edgeFunction.slug).toBeTruthy();
      } catch (error: any) {
        console.error(`Test error: ${error.message}`);
        throw error;
      } finally {
        await destroy(scope);
      }
    },
  );
});

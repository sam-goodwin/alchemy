import type { Resolved } from "../output";
import { type Context, Resource } from "../resource";
import { createCloudflareApi } from "./api";
import type { WorkerBindings } from "./bindings";

export interface WorkflowInput {
  /**
   * The name of the workflow
   */
  workflowName: string;

  /**
   * The entrypoint for the workflow
   */
  entrypoint?: string;

  /**
   * The script for the workflow
   */
  script?: string;

  /**
   * The class name of the workflow
   */
  className: string;

  /**
   * The script name of the workflow
   *
   * @default workflowName
   */
  scriptName: string;

  /**
   * The bindings for the workflow
   */
  bindings?: WorkerBindings;
}

export interface WorkflowOutput extends WorkflowInput {
  /**
   * The ID of the workflow
   */
  id: string;

  /**
   * Time at which the workflow was created
   */
  createdAt: number;

  /**
   * Time at which the workflow was last updated
   */
  updatedAt: number;

  /**
   * The script name of the workflow
   */
  scriptName: string;
}

export function isWorkflow(binding: any): binding is Resolved<Workflow> {
  return binding.type === "workflow";
}

export class Workflow extends Resource(
  "cloudflare::Workflow",
  async (ctx: Context<WorkflowOutput>, props: WorkflowInput) => {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi();

    // Use the provided name
    const workflowName = props.workflowName;

    if (ctx.event === "delete") {
      // Delete workflow if it exists
      if (ctx.output?.id) {
        const deleteResponse = await api.delete(
          `/accounts/${api.accountId}/workflows/${workflowName}`,
        );

        // Check response status
        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          const errorData = (await deleteResponse.json().catch(() => ({
            errors: [{ message: deleteResponse.statusText }],
          }))) as CloudflareError;
          console.error(
            "Error deleting workflow:",
            errorData.errors?.[0]?.message || deleteResponse.statusText,
          );
        }
      }
      return;
    }

    const scriptName = props.scriptName;

    // Create or update workflow
    const response = await api.put(
      `/accounts/${api.accountId}/workflows/${workflowName}`,
      JSON.stringify({
        class_name: props.className,
        script_name: scriptName,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    interface CloudflareError {
      errors: { message: string }[];
    }

    interface CloudflareWorkflowResponse {
      result: {
        id: string;
        binding: string;
        class_name: string;
      };
    }

    if (!response.ok) {
      console.log(
        JSON.stringify(
          {
            class_name: props.className,
            script_name: scriptName,
          },
          null,
          2,
        ),
      );
      console.log(response.status);
      console.log(response.statusText);
      console.log(await response.text());
      const errorData = (await response.json().catch(() => ({
        errors: [{ message: response.statusText }],
      }))) as CloudflareError;
      throw new Error(
        `Error ${ctx.event === "create" ? "creating" : "updating"} workflow: ${
          errorData.errors?.[0]?.message || response.statusText
        }`,
      );
    }

    const result = (await response.json()) as CloudflareWorkflowResponse;
    const now = Date.now();

    return {
      type: "workflow" as const,
      id: result.result.id,
      className: props.className,
      scriptName,
      workflowName,
      createdAt: ctx.event === "create" ? now : ctx.output?.createdAt || now,
      updatedAt: now,
      entrypoint: props.entrypoint,
    };
  },
) {}

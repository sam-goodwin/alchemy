import type { WorkflowEntrypoint } from "cloudflare:workers";
import { handleApiError } from "./api-error.ts";
import type { CloudflareApi } from "./api.ts";
import type { Binding } from "./bindings.ts";

export interface WorkflowProps {
  /**
   * Name of the workflow
   *
   * @maxLength 64
   * @minLength 1
   * @default - className if provided, otherwise id
   */
  workflowName?: string;
  /**
   * Name of the class that implements the workflow
   *
   * @maxLength 255
   * @minLength 1
   * @default - workflowName if provided, otherwise id
   */
  className?: string;
  /**
   * Name of the script containing the workflow implementation
   *
   * @default - bound worker script
   */
  scriptName?: string;
  dev?: {
    /**
     * Whether to run the workflow remotely instead of locally
     * @default false
     */
    remote?: boolean;
  };
}

export type Workflow<
  T extends WorkflowEntrypoint<any> = WorkflowEntrypoint<any>,
> = {
  type: "workflow";
  /**
   * The unique identifier for the workflow binding.
   */
  id: string;
  /**
   * The name of the workflow. This is used to identify the workflow within the system.
   */
  workflowName: string;
  /**
   * The name of the class that implements the workflow logic.
   */
  className: string;
  /**
   * (Optional) The name of the script containing the workflow implementation.
   */
  scriptName?: string;
  /**
   * Phantom property to preserve workflow entrypoint class at the type level.
   * No value exists.
   * @internal
   */
  __phantom__: T;
};

export function isWorkflow(binding: Binding): binding is Workflow {
  return typeof binding === "object" && binding.type === "workflow";
}

/**
 * Creates a workflow binding for orchestrating and automating tasks.
 *
 * @example
 * ```ts
 * // Create a basic workflow
 * const workflow = Workflow("my-workflow", {
 *   workflowName: "my-workflow",
 *   className: "MyWorkflow"
 * });
 * ```
 */
export function Workflow<
  T extends WorkflowEntrypoint<any> = WorkflowEntrypoint<any>,
>(id: string, props: WorkflowProps = {}): Workflow<T> {
  const workflowName = props.workflowName ?? props.className ?? id;
  const className = props.className ?? workflowName;

  return {
    type: "workflow",
    __phantom__: undefined!,
    id,
    workflowName,
    className,
    scriptName: props.scriptName,
  };
}

export interface WorkflowMetadata {
  id: string; // uuid
  class_name: string;
  created_on: string; // date-time
  modified_on: string; // date-time
  name: string; // maxLength: 64, minLength: 1
  script_name: string;
  triggered_on: string; // date-time
  version_id: string; // uuid
}

export async function upsertWorkflow(
  api: CloudflareApi,
  props: WorkflowProps & {
    workflowName: string;
    scriptName: string;
  },
) {
  const response = await api.put(
    `/accounts/${api.accountId}/workflows/${props.workflowName}`,
    {
      class_name: props.className,
      script_name: props.scriptName,
    },
  );

  if (!response.ok) {
    await handleApiError(response, "create", "workflow", props.workflowName);
  }

  const body = (await response.json()) as {
    result: WorkflowMetadata;
  };

  return body.result;
}

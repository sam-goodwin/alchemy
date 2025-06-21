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

export function isWorkflow(binding: Binding): binding is Workflow {
  return typeof binding === "object" && binding.type === "workflow";
}

export class Workflow<PARAMS = unknown> {
  public readonly type = "workflow";
  /**
   * Phantom property to preserve workflow params at the type level.
   *
   * No value exists.
   */
  public readonly _PARAMS: PARAMS = undefined!;

  public readonly workflowName: string;
  public readonly className: string;
  public readonly scriptName?: string;

  constructor(
    public readonly id: string,
    props: WorkflowProps = {},
  ) {
    this.workflowName = props.workflowName ?? props.className ?? id;
    this.className = props.className ?? this.workflowName;
    this.scriptName = props.scriptName;
  }
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

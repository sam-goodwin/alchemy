export interface DurableObjectNamespaceInput {
  className: string;
  scriptName?: string | undefined;
  environment?: string | undefined;
  sqlite?: boolean | undefined;
  namespaceId?: string | undefined;
}

export class DurableObjectNamespace implements DurableObjectNamespaceInput {
  public readonly type = "durable_object_namespace" as const;
  // alias for bindingName to be consistent with other bindings
  public readonly className: string;
  public readonly scriptName?: string | undefined;
  public readonly environment?: string | undefined;
  public readonly sqlite?: boolean | undefined;
  public readonly namespaceId?: string | undefined;

  constructor(
    public readonly id: string,
    input: DurableObjectNamespaceInput,
  ) {
    this.className = input.className;
    this.scriptName = input.scriptName;
    this.environment = input.environment;
    this.sqlite = input.sqlite;
  }
}

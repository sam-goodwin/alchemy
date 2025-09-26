export type PlanAction = "create" | "update" | "delete" | "noop";

export interface PlanBinding {
  // Single label including target, eg: "Lambda.InvokeFunction(api)"
  id: string;
  action: PlanAction;
}

export interface PlanItem {
  id: string;
  type: string;
  action: PlanAction;
  bindings?: PlanBinding[]; // optional bindings
}

export type PlanSummary = Map<string, PlanItem>;

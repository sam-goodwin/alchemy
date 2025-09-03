// A policy is invariant over its allowed actions
export interface Policy<in out Statements extends Statement = any> {
  readonly statements: Statements;
}

export declare namespace Policy {
  export type Concat<A, B> =
    | Policy<
        Extract<A, Policy>["statements"] | Extract<B, Policy>["statements"]
      >
    | Exclude<A, Policy>
    | Exclude<B, Policy>;
}

export type Statement<Resource = any, Action extends string = string> =
  | Allow<Resource, Action>
  | Deny<Resource, Action>;

export interface Allow<Resource, Action extends string, Condition = any> {
  effect: "Allow";
  action: Action;
  resource: Resource;
  condition?: Condition;
}

export interface Deny<Resource, Action extends string, Condition = any> {
  effect: "Deny";
  action: Action;
  resource: Resource;
  condition?: Condition;
}

import type * as Effect from "effect/Effect";
import type { AttachAction, BindingAction } from "./plan.ts";
import type { Statement } from "./policy.ts";

// local dev mode as a Layer?

// watch? tail?
// local dev as a adifferent provider??

// drift detection: read + diff? or just read + generic comparison

type Diff =
  | {
      action: "update" | "noop";
      deleteFirst?: undefined;
    }
  | {
      action: "replace";
      deleteFirst?: boolean;
    };

export type Provider<
  Type extends string = string,
  Input = any,
  Output = any,
  Stmt extends Statement = Statement,
> = {
  props?: Input;
  type: Type;
  // drives alchemy sync/refresh/adopt
  read?(input: {
    // "my-worker" -> arn:aws:lambda:us-east-1:123456789012:function:my-worker
    id: string; // -> doesn't always map to a a physical ID
    olds: Input | undefined;
    // what is the ARN?
    output: Output | undefined; // current state -> synced state
  }): Effect.Effect<Output | undefined, any, never>;
  diff?(input: {
    id: string;
    olds: Input;
    news: Input;
    output: Output;
    bindings: BindingAction<Stmt>[];
  }): Effect.Effect<Diff, never, never>;
  // tail();
  // watch();
  // replace(): Effect.Effect<void, never, never>;
  create(input: {
    id: string;
    news: Input;
    bindings: BindingAction.Materialized<AttachAction<Stmt>>[];
  }): Effect.Effect<Output, any, never>;
  update(input: {
    id: string;
    news: Input;
    olds: Input;
    output: Output;
    bindings: BindingAction.Materialized<BindingAction<Stmt>>[];
  }): Effect.Effect<Output, any, never>;
  delete(input: {
    id: string;
    olds: Input;
    output: Output;
  }): Effect.Effect<void, any, never>;
};

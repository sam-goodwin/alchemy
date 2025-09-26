import * as Context from "effect/Context";
import * as Data from "effect/Data";
import type * as Effect from "effect/Effect";
import type { AnyPlan } from "./plan.ts";

export class PlanRejected extends Data.TaggedError("PlanRejected")<{}> {}

export class PlanReviewer extends Context.Tag("PlanReviewer")<
  PlanReviewer,
  {
    approve: <P extends AnyPlan>(plan: P) => Effect.Effect<void, PlanRejected>;
  }
>() {}

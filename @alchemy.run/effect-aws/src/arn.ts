import type * as Context from "effect/Context";

export interface Arn<Self> {
  arn: Self;
}

export type Tag<Self, A extends string> = Context.Tag<Arn<Self>, A>;

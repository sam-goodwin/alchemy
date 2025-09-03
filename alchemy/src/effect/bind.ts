import type { Effect } from "effect/Effect";
import type { Policy, Statement } from "./policy.ts";

export type Bind<S extends Statement> = <
  E extends Effect<any, never, Policy<S>>,
>(
  effect: E,
) => Effect<Effect.Success<E>, never, never>;

export declare function bind<S extends readonly Policy[]>(
  ...actions: S
): Bind<S[number]["statements"]>;

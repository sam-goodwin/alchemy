import { Effect } from "effect";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";

/**
 * Creates a Resource that uses Effect throughout the entire lifecycle
 *
 * This wrapper allows resources to be implemented using Effect's declarative
 * flow control features while maintaining compatibility with the existing
 * Resource interface that expects Promise return types.
 *
 * For delete operations, the effectHandler should use `yield* this.destroy()`
 * to explicitly handle destruction within the Effect chain.
 */
export function EffectResource<T extends Resource<string>, P>(
  type: string,
  effectHandler: (
    this: EffectContext<T>,
    id: string,
    props: P,
  ) => Generator<Effect.Effect<any, any>, T, any>,
) {
  return Resource(
    type,
    async function (this: Context<T>, id: string, props: P): Promise<T> {
      // Create Effect-wrapped context with destroy() as Effect
      const effectContext: EffectContext<T> = {
        ...this,
        destroy: () => Effect.sync(() => this.destroy()),
      };

      return await Effect.runPromise(
        Effect.gen(effectHandler.bind(effectContext, id, props)),
      );
    },
  );
}

/**
 * Effect-wrapped Context that provides destroy() as an Effect operation
 */
type EffectContext<T extends Resource<string>> = Context<T> & {
  destroy: () => Effect.Effect<T, never>;
};

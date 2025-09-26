import type * as Effect from "effect/Effect";
import type { App } from "./app.ts";

export declare const destroy: () => Effect.Effect<void, never, App>;

// biome-ignore lint/correctness/noUnusedImports: UMD global
import React from "react";

import { render } from "ink";

import * as Alchemy from "@alchemy.run/effect";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

import { PlanProgress } from "./components/PlanProgress.tsx";

export interface ProgressEventSource {
  subscribe(listener: (event: Alchemy.ApplyEvent) => void): () => void;
}

export const reportProgress = Layer.succeed(
  Alchemy.PlanStatusReporter,
  Alchemy.PlanStatusReporter.of({
    start: Effect.fn(function* (plan) {
      const listeners = new Set<(event: Alchemy.ApplyEvent) => void>();
      const { unmount } = render(
        <PlanProgress
          plan={plan}
          source={{
            subscribe(listener) {
              listeners.add(listener);
              return () => listeners.delete(listener);
            },
          }}
        />,
      );
      return {
        done: () =>
          Effect.gen(function* () {
            yield* Effect.sleep(10); // give the react event loop time to re-render
            yield* Effect.sync(() => unmount());
          }),
        emit: (event) =>
          Effect.sync(() => {
            for (const listener of listeners) listener(event);
          }),
      };
    }),
  }),
);

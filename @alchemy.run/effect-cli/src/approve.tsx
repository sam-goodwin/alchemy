// biome-ignore lint/correctness/noUnusedImports: UMD global
import React from "react";

import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

import * as Alchemy from "@alchemy.run/effect";
import { render } from "ink";

import { ApprovePlan } from "./components/ApprovePlan.tsx";

export const requireApproval = Layer.succeed(
  Alchemy.PlanReviewer,
  Alchemy.PlanReviewer.of({
    approve: <P extends Alchemy.AnyPlan>(plan: P) =>
      Effect.gen(function* () {
        let approved = false;

        const { waitUntilExit } = render(
          <ApprovePlan plan={plan} approve={(a) => (approved = a)} />,
        );

        yield* Effect.promise(() => waitUntilExit());

        if (!approved) {
          yield* Effect.fail(new Alchemy.PlanRejected());
        }
      }),
  }),
);

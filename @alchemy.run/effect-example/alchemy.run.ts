import * as Alchemy from "@alchemy.run/effect";
import * as AWS from "@alchemy.run/effect-aws";
import * as AlchemyCLI from "@alchemy.run/effect-cli";
import { NodeContext } from "@effect/platform-node";
import * as Effect from "effect/Effect";

import { ApiFunction } from "./src/index.ts";

// TODO(sam): combine this with Alchemy.plan to do it all in one-line
const app = Alchemy.app({ name: "my-iae-app", stage: "dev" });

const stack = await Alchemy.plan({
  phase: process.argv.includes("--destroy") ? "destroy" : "update",
  resources: [
    ApiFunction,
    // Consumer
  ],
}).pipe(
  Alchemy.apply,
  Effect.catchTag("PlanRejected", () => Effect.void),
  Effect.provide(AlchemyCLI.requireApproval),
  Effect.provide(AlchemyCLI.reportProgress),
  Effect.provide(AWS.layer),
  Effect.provide(Alchemy.State.localFs),
  Effect.provide(NodeContext.layer),
  Effect.provide(app),
  Effect.runPromise,
);

if (stack) {
  console.log(stack.api.functionUrl);
}

export default stack;

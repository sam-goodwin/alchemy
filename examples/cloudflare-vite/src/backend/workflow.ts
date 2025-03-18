import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";

type Env = {
  // Add your bindings here, e.g. KV, D1, AI, etc.
  MY_KV_NAMESPACE: KVNamespace;
};

// User-defined params passed to your workflow
type Params = {
  email: string;
};

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
    const my_value = await step.do("My First Step", async () => {
      return "a".repeat(25000);
    });

    await step.sleep("sleep", "2 minutes");

    await step.do(
      "My Second Step",
      {
        // Retries are enabled by default using the config below on all steps
        retries: {
          limit: 5,
          delay: "1 second",
          backoff: "constant",
        },
        timeout: "15 minutes",
      },
      async () => {
        // Do stuff here, with access to my_value!
        if (Math.random() > 0.5) {
          throw new Error("Oh no!");
        }
      },
    );
  }
}

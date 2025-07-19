// Import the Workflow definition
import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";
// just to test bundling
import { NonRetryableError } from "cloudflare:workflows";

// Create your own class that implements a Workflow
export class OFACWorkflow extends WorkflowEntrypoint<any, [name: string]> {
  // declare env: typeof worker.Env;

  // Define a run() method
  async run(_event: WorkflowEvent<[name: string]>, step: WorkflowStep) {
    // Define one or more steps that optionally return state.
    await step.do("my first step", async () => {
      console.log("OFAC WORKFLOW STEP 1");
    });
    await step.do("my second step", async () => {
      console.log("OFAC WORKFLOW STEP 2");
    });

    throw new NonRetryableError("test");
  }
}

import { env } from "cloudflare:workers";
import type { queue, worker } from "../alchemy.run.js";
export * from "./do.js";
export * from "./workflow.js";

export default {
  async fetch(_request: Request) {
    await env.QUEUE.send({
      name: "John Doe",
      email: "john.doe@example.com",
    });

    const obj = env.DO.get(env.DO.idFromName("foo"));
    await obj.increment();
    async function _foo() {
      // @ts-expect-error - foo doesn't exist on the HelloWorldDO class
      await obj.foo();
    }
    await obj.fetch(new Request("https://example.com"));

    await env.RPC.hello("John Doe");

    // Demonstrate Secrets Store usage
    const apiKey = await env.SECRETS.get("API_KEY");
    const databaseUrl = await env.SECRETS.get("DATABASE_URL");
    const oauthSecret = await env.SECRETS.get("OAUTH_SECRET");
    
    console.log(`API Key exists: ${apiKey ? "yes" : "no"}`);
    console.log(`Database URL exists: ${databaseUrl ? "yes" : "no"}`);
    console.log(`OAuth Secret exists: ${oauthSecret ? "yes" : "no"}`);

    return new Response("Ok");
  },
  async queue(batch: typeof queue.Batch, _env: typeof worker.Env) {
    for (const message of batch.messages) {
      console.log(message);
      message.ack();
    }
    batch.ackAll();
  },
};

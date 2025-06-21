import { WorkerEntrypoint } from "cloudflare:workers";
import type { worker2 } from "../alchemy.run.ts";

export default class extends WorkerEntrypoint<typeof worker2.Env> {
  async fetch(request: Request): Promise<Response> {
    const stub = this.env.DO.get(this.env.DO.idFromName("DO"));
    return await stub.fetch(request);
  }
  rpcMethod() {
    return "hello world";
  }
}

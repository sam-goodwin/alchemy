import { WorkerEntrypoint } from "cloudflare:workers";
import type { worker2 } from "../alchemy.run.ts";

export default class Worker2 extends WorkerEntrypoint {
  declare env: typeof worker2.Env;

  async fetch(request: Request): Promise<Response> {
    const stub = this.env.DO.get(this.env.DO.idFromName("DO"));
    // @ts-expect-error - TODO(sam): fix this
    return await stub.fetch(request);
  }
  rpcMethod() {
    return "hello world";
  }
}

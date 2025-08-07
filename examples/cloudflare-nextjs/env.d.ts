import "@cloudflare/workers-types";
import "@opennextjs/cloudflare";

import type { website } from "./alchemy.run.ts";

type WorkerEnv = typeof website.Env;

declare global {
    interface CloudflareEnv extends WorkerEnv {}
    
    namespace Cloudflare {
      export interface Env extends WorkerEnv {}
    }
}

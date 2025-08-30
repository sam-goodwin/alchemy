import type { worker } from "../alchemy.run.js";

declare global {
  export type CloudflareEnv = typeof worker._Env;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}

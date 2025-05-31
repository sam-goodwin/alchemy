/// <reference types="./env.d.ts" />

import type { website } from "../alchemy.run.js";

export type CloudFlareEnv = typeof website.Env;

declare global {
  export type Env = CloudFlareEnv;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudFlareEnv {}
  }
}

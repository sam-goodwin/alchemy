import type { website } from "../alchemy.run.js";

export type CloudFlareEnv = typeof website.Env;

// Necessary for the `env` property of loaders/actions to be typed
declare global {
  export type Env = CloudFlareEnv;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudFlareEnv { }
  }
}

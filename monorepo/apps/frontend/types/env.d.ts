// This file infers types for the cloudflare:workers environment from your Alchemy Worker.
// @see https://alchemy.run/concepts/bindings/#type-safe-bindings

import type { website } from "../alchemy.run.ts";

export type CloudflareEnv = typeof website.Env;

declare global {
  type Env = CloudflareEnv;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}

import type { website } from "../alchemy.run.ts";

export interface CloudflarePlatform {
  env: typeof website.Env;
  context: ExecutionContext;
  caches: CacheStorage & { default: Cache };
}

declare global {
  export type CloudflareEnv = typeof website.Env;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}

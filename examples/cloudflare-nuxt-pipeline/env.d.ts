/// <reference types="@cloudflare/workers-types" />

import type { website } from "./alchemy.run.ts";

declare module "h3" {
  interface H3EventContext {
    cf: CfProperties;
    cloudflare: {
      request: Request;
      env: typeof website.Env;
      context: ExecutionContext;
    };
  }
}


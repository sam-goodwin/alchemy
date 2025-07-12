/// <reference types="@cloudflare/workers-types" />

import { DurableObject } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "../drizzle/durable-object/migrations.js";
import { SQLiteStateStoreOperations } from "../src/state/operations.ts";
import type { StateStoreProxy } from "../src/state/proxy.ts";
import * as schema from "../src/state/schema.ts";

interface Env {
  STORE: DurableObjectNamespace<Store>;
  STATE_TOKEN: string;
}

interface Context {
  chain: string[];
}

const validateRequest = async (request: Request, env: Env) => {
  const encoder = new TextEncoder();
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  const expected = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(env.STATE_TOKEN),
  );
  const actual = await crypto.subtle.digest("SHA-256", encoder.encode(token));
  // @ts-expect-error - timingSafeEqual is available in workerd
  return await crypto.subtle.timingSafeEqual(expected, actual);
};

export default {
  fetch: async (request, env) => {
    if (!(await validateRequest(request, env))) {
      return Response.json(
        {
          success: false,
          status: 401,
          error: "Unauthorized",
        } as StateStoreProxy.ErrorResponse,
        { status: 401 },
      );
    }

    if (request.method === "HEAD") {
      return new Response(null, { status: 200 });
    }

    if (request.method !== "POST") {
      return Response.json(
        {
          success: false,
          status: 405,
          error: "Method not allowed",
        } as StateStoreProxy.ErrorResponse,
        { status: 405 },
      );
    }

    try {
      const store = env.STORE.get(env.STORE.idFromName("default"));
      const body = (await request.json()) as StateStoreProxy.Request<
        StateStoreProxy.Method,
        Context
      >;
      const result = await store.rpc(body);
      return Response.json(
        {
          success: true,
          status: 200,
          result,
        } as StateStoreProxy.SuccessResponse<StateStoreProxy.Method>,
        { status: 200 },
      );
    } catch (e) {
      console.error(e);
      return Response.json(
        {
          success: false,
          status: 500,
          error: String(e),
        } as StateStoreProxy.ErrorResponse,
        { status: 500 },
      );
    }
  },
} satisfies ExportedHandler<Env>;

export class Store extends DurableObject<Env> {
  db = drizzle(this.ctx.storage, { schema });

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      await migrate(this.db, migrations);
    });
  }

  async rpc(request: StateStoreProxy.Request<StateStoreProxy.Method, Context>) {
    const operations = new SQLiteStateStoreOperations(this.db, {
      chain: request.context.chain,
    });
    return operations.dispatch(request.method, request.params);
  }
}

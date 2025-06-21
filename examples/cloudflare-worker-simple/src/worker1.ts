import { DurableObject } from "cloudflare:workers";
import crypto from "node:crypto";
import type { worker1 } from "../alchemy.run.ts";

export default {
  async fetch(
    request: Request,
    env: typeof worker1.Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/":
        return Response.json({
          d1: await env.D1.exec("SELECT 1"),
          kv: await env.KV.list(),
          r2: await env.R2.list(),
        });
      case "/upload": {
        await env.KV.put(crypto.randomUUID(), crypto.randomBytes(16));
        return Response.json({ success: true });
      }
      case "/download": {
        const file = await env.KV.get(url.searchParams.get("name") ?? "");
        if (!file) {
          return Response.json({ error: "File not found" }, { status: 404 });
        }
        return new Response(file);
      }
      default:
        return Response.json({ error: "Not found" }, { status: 404 });
    }
  },
};

export class DO extends DurableObject<typeof worker1.Env> {
  override fetch(_: Request) {
    return Response.json({
      message: "hello from DO",
    });
  }
}

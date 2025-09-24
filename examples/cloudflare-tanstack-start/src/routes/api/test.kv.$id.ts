import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/test/kv/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        console.log("GET", params.id);
        const value = await env.KV.get(params.id);
        return new Response(value ?? "Key not found", {
          status: value ? 200 : 404,
        });
      },
      PUT: async ({ request, params }) => {
        const value = await request.text();
        console.log("PUT", params.id, value);
        await env.KV.put(params.id, value);
        return new Response(null, { status: 201 });
      },
      DELETE: async ({ params }) => {
        console.log("DELETE", params.id);
        await env.KV.delete(params.id);
        return new Response(null, { status: 204 });
      },
    },
  },
});

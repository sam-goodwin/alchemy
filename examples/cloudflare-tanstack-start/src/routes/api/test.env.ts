import { json } from "@tanstack/react-start";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";

export const ServerRoute = createServerFileRoute("/api/test/env").methods({
  GET: async () => {
    return json({
      TEST_SECRET_VALUE: env.TEST_SECRET_VALUE,
    });
  },
});

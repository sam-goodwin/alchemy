import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/test/env")({
  server: {
    handlers: {
      GET: async () => {
        return json({
          TEST_SECRET_VALUE: env.TEST_SECRET_VALUE,
        });
      },
    },
  },
});

import { verifyKey } from "discord-interactions";
import type { worker } from "../alchemy.run.ts";

export default {
  async fetch(request: Request, env: typeof worker.Env): Promise<Response> {
    // Only accept POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Get Discord signature headers
    const signature = request.headers.get("X-Signature-Ed25519");
    const timestamp = request.headers.get("X-Signature-Timestamp");
    const body = await request.text();

    if (!signature || !timestamp) {
      return new Response("Missing signature headers", { status: 401 });
    }

    // Verify the request is from Discord
    const isValid = await verifyKey(
      body,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY,
    );

    if (!isValid) {
      return new Response("Invalid signature", { status: 401 });
    }

    const interaction = JSON.parse(body);

    // Handle PING (Discord verification)
    if (interaction.type === 1) {
      return Response.json({ type: 1 });
    }

    // Handle slash commands
    if (interaction.type === 2) {
      const { name, options } = interaction.data;

      switch (name) {
        case "ping":
          return Response.json({
            type: 4,
            data: {
              content: "Pong! 🏓",
            },
          });

        case "hello": {
          const userName = options?.[0]?.value || "there";
          return Response.json({
            type: 4,
            data: {
              content: `Hello ${userName}! 👋`,
            },
          });
        }

        case "echo": {
          const message =
            options?.find((opt: any) => opt.name === "message")?.value || "";
          const uppercase =
            options?.find((opt: any) => opt.name === "uppercase")?.value ||
            false;
          const echoMessage = uppercase ? message.toUpperCase() : message;

          return Response.json({
            type: 4,
            data: {
              content: echoMessage,
              // Echo privately only to the user
              flags: 64,
            },
          });
        }

        default:
          return Response.json({
            type: 4,
            data: {
              content: "Unknown command!",
            },
          });
      }
    }

    return new Response("Unknown interaction type", { status: 400 });
  },
};

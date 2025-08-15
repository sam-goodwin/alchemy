import { once } from "../../util/once.ts";
import { env, type Env } from "./env.ts";
import { link } from "./link.ts";
import {
  isCallRequest,
  isListenRequest,
  type ProxiedHandler,
} from "./protocol.ts";

// a singleton reference to the Coordinator DO server
const server = once(() =>
  env.COORDINATOR.get(env.COORDINATOR.idFromName("default")),
);

// sets up a bridge between the remote worker and the local worker (through a DO Cooridinator server)
const bridge = once(() =>
  link<ProxiedHandler>({
    role: "client",
    token: env.SESSION_SECRET,
    remote: server(),
  }),
);

// Proxies a function call to a Local Worker through a central Coordinator DO.
const proxy =
  (prop: keyof ProxiedHandler) =>
  async (...args: any[]): Promise<any> =>
    (await bridge())[prop](...args);

export default {
  // hooks called by the Cloudflare platform for push-based events
  scheduled: proxy("scheduled"),
  queue: proxy("queue"),
  email: proxy("email"),
  tail: proxy("tail"),
  tailStream: proxy("tailStream"),
  test: proxy("test"),
  trace: proxy("trace"),

  // inbound requests from the public internet to the remote worker
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (isListenRequest(request)) {
      // a special request that a Local Worker makes to establish a connection to the Coordinator
      const auth =
        request.headers.get("Authorization")?.replace("Bearer ", "") ??
        url.searchParams.get("authToken");
      if (auth !== env.SESSION_SECRET) {
        return new Response("Unauthorized", { status: 401 });
      }
      const upgrade = request.headers.get("Upgrade");
      if (upgrade !== "websocket") {
        return new Response(
          `Upgrade required: ${request.headers.get("Upgrade")}`,
          {
            status: 426,
          },
        );
      }
    } else if (isCallRequest(request)) {
      // explicitly disallow RPC requests from the public internet
      return new Response("Cannot initiate RPC from remote worker", {
        status: 404,
      });
    }
    const response = await server().fetch(request);
    console.log(
      `WebSocket: ${response.status} ${response.webSocket === undefined}`,
    );
    return response;
  },
} satisfies ExportedHandler<Env>;

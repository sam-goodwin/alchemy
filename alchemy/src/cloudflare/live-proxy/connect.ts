import { env } from "./env.ts";
import { RPC_PATH } from "./protocol.ts";

export type CanConnect = Fetcher | DurableObjectStub;

export async function connect(
  fetcher: CanConnect,
  secret: string,
): Promise<WebSocket> {
  // establish a WebSocket connection from (this) Remote Worker to the Coordinator DO
  // this connection will live for the duration of the RPC call and serve as a means to:
  // 1. transport the RPC call and results to/from the Local Worker
  // 2. facilitate callbacks from the Local Worker to objects in this Remote Worker (e.g. batch.ackAll())
  const response = await fetcher.fetch(RPC_PATH, {
    headers: {
      Upgrade: "websocket",
      Authorization: `Bearer ${env.SESSION_SECRET}`,
    },
  });
  if (!response.ok || !response.webSocket) {
    throw new Error("Failed to open transaction");
  }
  return response.webSocket;
}

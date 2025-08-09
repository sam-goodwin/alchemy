import { env } from "../../env.ts";
import { connect } from "./connect.ts";
import {
  isConnectRequest,
  isRpcRequest,
  serializeHeaders,
  type HttpMessage,
  type HttpMethod,
  type HttpRequestMessage,
  type HttpResponseMessage,
  type RpcMessage,
} from "./protocol.ts";
import { rpc } from "./rpc.ts";
import { websocket } from "./websocket.ts";

export declare namespace Server {
  export interface Env {
    // Durable Object namespace used for coordinating live proxy sessions
    COORDINATOR: DurableObjectNamespace;
    SESSION_SECRET: string;
  }
}

/**
 * A Durable Object that coordinates the RPC connection between the local worker and the remote worker.
 */
export class Server implements DurableObject {
  static get env(): Server.Env {
    return env as any as Server.Env;
  }

  static async rpc<Output>(name: string, ...args: any[]): Promise<Output> {
    return rpc<Output>(await Server.connect(), name, ...args);
  }

  static connect() {
    return connect(Server.server, Server.env.SESSION_SECRET);
  }

  static fetch(request: Request) {
    return Server.server.fetch(request);
  }

  static get server() {
    return Server.env.COORDINATOR.get(
      Server.env.COORDINATOR.idFromName("default"),
    );
  }

  /** A WebSocket connection to the Local Worker running on the developer's machine */
  private local?: {
    send(message: RpcMessage | HttpMessage): void;
  };
  /** A map of transaction IDs to Remote Worker WebSocket connections */
  private readonly transactions = new Map<number, WebSocket>();
  /** A map of pending HTTP requests to their corresponding promise callbacks */
  private readonly requests = new Map<
    number,
    [resolve: (response: Response) => void, reject: (error: Error) => void]
  >();

  // TODO(sam): should we store in the DO state so that connection interruptions
  // can be resumed, even if the Worker hosting the DO is restarted?
  private counter = 0;
  // private state: DurableObjectState;

  async fetch(request: Request): Promise<Response> {
    // the DO only accepts web socket connections
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Upgrade required", { status: 426 });
    }

    if (isConnectRequest(request)) {
      // establish a WebSocket connection from the (calling) Local Worker to (this) Coordinator
      if (this.local) {
        return new Response("Already connected", { status: 400 });
      }
      return websocket<RpcMessage | HttpResponseMessage>({
        connect: (socket) => {
          this.local = {
            send: (message) => socket.send(JSON.stringify(message)),
          };
        },
        handle: (data) => {
          if (data.type === "http-response") {
            // the Local Worker has returned a response to an HTTP request, we should resolve the promise
            if (this.requests.has(data.id)) {
              const [resolve] = this.requests.get(data.id)!;
              resolve(
                new Response(data.body, {
                  status: data.status,
                  headers: new Headers(data.headers),
                }),
              );
            } else {
              // TODO(sam): not sure if we can provide this feedback to the Local Worker (who has returned the response)
              console.warn("Unknown request ID", data.id);
            }
          } else {
            // the Local Worker is sending a RpcMessage to the Remote Worker, so we just forward it
            if (this.transactions.has(data.id)) {
              this.transactions.get(data.id)!.send(JSON.stringify(data));
            } else {
              console.warn("Unknown transaction ID", data.id);
            }
          }
        },
        close: () => {
          // we just lost connection to the Local Worker, reject all pending HTTP requests
          // TODO(sam): should we allow the Local Worker to reconnect and continue existing requests? -> probably yes
          for (const [id, [, reject]] of this.requests) {
            reject(new Error("Connection closed"));
            this.requests.delete(id);
          }
          this.local = undefined;
        },
      });
    } else if (isRpcRequest(request)) {
      // establish a WebSocket connection from (this) Coordinator to the (calling) Remote Worker
      if (!this.local) {
        return new Response("Not connected", { status: 400 });
      }
      const txId = this.counter++;
      return websocket<RpcMessage>({
        connect: (socket) => this.transactions.set(txId, socket),
        // just forward the messages to the Local Worker
        handle: (data) => this.local!.send(data),
        close: () => this.transactions.delete(txId),
      });
    } else if (this.local) {
      // inbound request from the public internet received by the remote worker
      const requestId = this.counter++;

      const { promise, resolve, reject } = Promise.withResolvers<Response>();
      // register the promise before sending the message to ensure zero race conditions
      this.requests.set(requestId, [resolve, reject]);

      this.local.send({
        type: "http-request",
        id: requestId,
        method: request.method as HttpMethod,
        url: request.url,
        // TODO(sam): serializing the stream here is not ideal for large or long-lived streams
        // for that, we would probably be better off using a Tunnel (cloudflared, or tailscale?)
        // OR: do we implement some low-level streaming protocol on top of WebSockets?
        // Http/2 would be helpful here, but not supported yet (see: https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
        body: (await request.bytes()).toBase64(),
        headers: serializeHeaders(request.headers),
      } satisfies HttpRequestMessage);

      return promise;
    } else {
      return new Response("Local worker is not connected", { status: 400 });
    }
  }
}

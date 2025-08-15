import { DurableObject } from "cloudflare:workers";
import { isCallRequest, isListenRequest, type RpcMessage } from "./protocol.ts";

/**
 * A Durable Object that coordinates the RPC connection between the local worker and the remote worker.
 */
export class Server extends DurableObject {
  /** A WebSocket connection to the Local Worker running on the developer's machine */
  private local?: {
    fetch(request: Request): Promise<Response>;
    send(message: RpcMessage): void;
  };
  /** A map of transaction IDs to Remote Worker WebSocket connections */
  private readonly calls = new Map<number, WebSocket>();

  // cached value of the counter - we access durable storage only on writes or when initializing the object
  private _counter = 0;

  async nextId() {
    const id = this._counter++;
    await this.ctx.storage.put("counter", this._counter);
    return id;
  }

  constructor(ctx: DurableObjectState, env: any) {
    super(ctx, env);

    ctx.blockConcurrencyWhile(() => this.restoreWebSockets());
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    // the DO only accepts web socket connections
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Upgrade required", { status: 426 });
    }

    if (isListenRequest(request)) {
      console.log("isListenRequest");
      // establish a WebSocket connection from the (calling) Local Worker to (this) Coordinator
      if (this.local) {
        return new Response("Already connected", { status: 409 });
      }
      const tunnelUrl = url.searchParams.get("tunnelUrl");
      if (!tunnelUrl) {
        return new Response("Missing tunnelUrl query parameter", {
          status: 400,
        });
      }
      const [client, server] = this.webSocket({
        type: "listen",
        tunnelUrl,
      });
      this.local = {
        send(message) {
          server.send(JSON.stringify(message));
        },
        fetch(request) {
          const url = new URL(request.url);
          const localUrl = new URL(tunnelUrl);
          // re-route the request to the Local Worker (on http://localhost:****)
          url.hostname = localUrl.hostname;
          url.port = localUrl.port;
          url.protocol = localUrl.protocol;
          return fetch(url, request);
        },
      };
      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    } else if (isCallRequest(request)) {
      console.log("isCallRequest");
      // establish a WebSocket connection from (this) Coordinator to the (calling) Remote Worker
      if (!this.local) {
        return notConnected("Cannot handle call request: no local worker");
      }
      const [client] = this.webSocket({
        type: "call",
        callId: await this.nextId(),
      });
      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    } else if (this.local) {
      // inbound request from the public internet received by the remote worker
      // -> FWD it to the Local Worker via the tunnel
      return this.local.fetch(request);
    }
    return notConnected("Fall Through");
  }

  private async restoreWebSockets() {
    // TODO(sam): this can throw:
    // > TypeError The Durable Object's code has been updated, this version can no longer access storage.
    this._counter = (await this.ctx.storage.get<number>("counter")) ?? 0;

    this.ctx.getWebSockets().map((ws) => {
      const attachment = ws.deserializeAttachment() as WebSocketAttachment;
      if (attachment.type === "listen") {
        this.local = {
          fetch: (request) => fetch(attachment.tunnelUrl!, request),
          send: (message) => ws.send(JSON.stringify(message)),
        };
      } else if (attachment.type === "call") {
        this.calls.set(attachment.callId, ws);
      }
    });
  }

  async webSocketMessage(
    ws: WebSocket,
    message: string | ArrayBuffer,
  ): Promise<void> {
    const attachment = ws.deserializeAttachment() as WebSocketAttachment;
    const data = JSON.parse(
      typeof message === "string" ? message : new TextDecoder().decode(message),
    ) as RpcMessage;
    console.log(
      "webSocketMessage",
      JSON.stringify(
        {
          type: data.type,
          callId: data.callId,
          functionId: data.functionId,
        },
        null,
        2,
      ),
    );

    if (attachment.type === "call") {
      // mesage received from the Remote Worker sending a RPC call to the Local Worker

      // forward messages to the Local Worker
      this.local!.send(data);
    } else if (attachment.type === "listen") {
      // the Local Worker is sending a RpcMessage to the Remote Worker, so we just FWD it
      if (this.calls.has(data.callId)) {
        this.calls.get(data.callId)!.send(JSON.stringify(data));
      } else {
        console.warn("Unknown transaction ID", data.callId);
      }
    }
  }

  async webSocketClose(
    ws: WebSocket,
    code: number,
    reason: string,
    wasClean: boolean,
  ): Promise<void> {
    const attachment = ws.deserializeAttachment() as WebSocketAttachment;
    if (attachment.type === "call") {
      this.calls.delete(attachment.callId);
    } else if (attachment.type === "listen") {
      this.local = undefined;
    }
  }

  async webSocketError(ws: WebSocket, error: unknown): Promise<void> {
    // TODO(sam): should we do anything here?
  }

  /**
   * Create a WebSocket pair and return a socket to be returned to the caller.
   */
  private webSocket(attachment: WebSocketAttachment) {
    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    server.serializeAttachment(attachment);
    this.ctx.acceptWebSocket(server);
    return [client, server];
  }
}

const notConnected = (message?: string) =>
  new Response(
    message ||
      "Local worker is not connected. Please connect the local worker to the live proxy first. ",
    { status: 409 },
  );

type WebSocketAttachment =
  | {
      type: "listen";
      tunnelUrl: string;
    }
  | {
      type: "call";
      callId: number;
    };

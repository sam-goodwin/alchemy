import * as miniflare from "miniflare";
import { once } from "node:events";
import http from "node:http";
import type Stream from "node:stream";
import { Readable } from "node:stream";
import { WebSocket, WebSocketServer } from "ws";
import { logger } from "../../util/logger.ts";
import { promiseWithResolvers } from "../../util/promise-with-resolvers.ts";

interface MiniflareWorkerProxyOptions {
  name: string;
  port?: number;
  miniflare: Promise<miniflare.Miniflare>;
}

export class MiniflareWorkerProxy {
  private server = http.createServer();
  private wss = new WebSocketServer({ noServer: true });
  public readonly url: Promise<string>;

  constructor(private readonly options: MiniflareWorkerProxyOptions) {
    this.server.on("upgrade", async (req, socket, head) => {
      await this.handleUpgrade(req, socket, head);
    });
    this.server.on("request", async (req, res) => {
      await this.handleRequest(req, res);
    });
    const url = promiseWithResolvers<string>();
    this.url = url.promise;
    const server = this.server.listen(options.port, () => {
      const address = server.address();
      if (address && typeof address === "object") {
        url.resolve(`http://localhost:${address.port}`);
      } else if (typeof address === "string") {
        url.resolve(address);
      } else {
        throw new Error("Failed to get port");
      }
    });  
  }

  get ready() {
    if (!this.server.listening) {
      return once(this.server, "listening");
    }
    return Promise.resolve();
  }


  async close() {
    await Promise.all([
      new Promise((resolve) => this.wss.close(resolve)),
      new Promise((resolve) => this.server.close(resolve)),
    ]);
  }

  private async handleUpgrade(
    req: http.IncomingMessage,
    socket: Stream.Duplex,
    head: Buffer,
  ) {
    const server = await this.createServerWebSocket(req);
    if (!server) {
      socket.destroy();
      return;
    }
    this.wss.handleUpgrade(req, socket, head, (client) => {
      client.on("message", (event, binary) => server.send(event, { binary }));
      client.on("close", (code, reason) => server.close(code, reason));
      server.on("message", (event, binary) => client.send(event, { binary }));
      server.on("close", (code, reason) => client.close(code, reason));
      this.wss.emit("connection", client, req);
    });
  }

  private async createServerWebSocket(req: http.IncomingMessage) {
    const target = await (await this.options.miniflare).unsafeGetDirectURL(
      this.options.name,
    );
    if (!target) {
      logger.error(
        `[Alchemy] Websocket connection failed: The worker "${this.options.name}" is not running.`,
      );
      return null;
    }
    const url = new URL(req.url ?? "/", target);
    url.protocol = url.protocol.replace("http", "ws");
    const protocols = req.headers["sec-websocket-protocol"]
      ?.split(",")
      .map((p) => p.trim());
    const server = new WebSocket(url, protocols);
    const controller = new AbortController();
    return await Promise.race([
      once(server, "open", { signal: controller.signal }).then(() => server),
      once(server, "close", { signal: controller.signal }).then((args) => {
        const [code, reason] = args as [number, string];
        logger.error(
          `[Alchemy] Websocket connection failed for worker "${this.options.name}": ${code} ${reason}`,
        );
        return null;
      }),
    ]).finally(() => controller.abort());
  }

  private async handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ) {
    console.log(this.options)
    const miniflare = await this.options.miniflare
    const worker = await miniflare.getWorker(this.options.name);
    if (!worker) {
      res.statusCode = 503;
      res.end(`[Alchemy] The worker "${this.options.name}" is not running.`);
      return;
    }
    try {
      const response = await worker.fetch(toMiniflareRequest(req));
      writeMiniflareResponseToNode(response, res);
    } catch (rawError) {
      const message =
        rawError instanceof Error
          ? (rawError.stack ?? rawError.message)
          : String(rawError);
      res.statusCode = 500;
      res.end(
        `[Alchemy] The worker "${this.options.name}" threw an error:\n\n${message}`,
      );
    }
  }
}

const toMiniflareRequest = (req: http.IncomingMessage) => {
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const headers = new miniflare.Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        headers.append(key, v);
      }
    } else if (value) {
      headers.set(key, value);
    }
  }
  const body =
    ["GET", "HEAD", "OPTIONS"].includes(method) || !req.readable
      ? undefined
      : Readable.toWeb(req);
  return new miniflare.Request(url, {
    method,
    headers,
    body,
    redirect: "manual",
    duplex: body ? "half" : undefined,
  });
};

const writeMiniflareResponseToNode = (
  res: miniflare.Response,
  out: http.ServerResponse,
) => {
  out.statusCode = res.status;
  res.headers.forEach((value, key) => {
    out.setHeader(key, value);
  });

  if (res.body) {
    Readable.fromWeb(res.body).pipe(out, { end: true });
  } else {
    out.end();
  }
};

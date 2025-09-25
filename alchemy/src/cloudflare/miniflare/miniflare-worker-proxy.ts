import * as miniflare from "miniflare";
import { once } from "node:events";
import http from "node:http";
import { Readable } from "node:stream";
import { WebSocket, WebSocketServer } from "ws";
import { coupleWebSocket } from "../../util/http.ts";

export interface MiniflareWorkerProxy {
  url: URL;
  close: () => Promise<void>;
}

export async function createMiniflareWorkerProxy(options: {
  port: number;
  transformRequest?: (request: RequestInfo) => void;
  getWorkerName: (request: miniflare.Request) => string;
  miniflare: miniflare.Miniflare;
  mode: "local" | "remote";
}) {
  const server = http.createServer();
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", async (req, socket, head) => {
    try {
      const server = await createServerWebSocket(req);
      coupleWebSocket(wss, req, socket, head, server);
    } catch (error) {
      console.error(error);
      socket.destroy();
    }
  });
  server.on("request", async (req, res) => {
    try {
      const response = await handleFetch(req);
      writeMiniflareResponseToNode(response, res);
    } catch (error) {
      console.error(error);
      const response = MiniflareWorkerProxyError.fromUnknown(error).toResponse(
        options.mode,
      );
      writeMiniflareResponseToNode(response, res);
    }
  });

  const handleFetch = async (
    req: http.IncomingMessage,
  ): Promise<miniflare.Response> => {
    const { request, url } = toMiniflareRequest(req);
    const name = options.getWorkerName(request);
    const worker = await options.miniflare.getWorker(name);

    // Handle scheduled events
    // https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/#background
    // https://github.com/cloudflare/workers-sdk/blob/7d53b9ab6b370944b7934ad51ebef43160c3c775/packages/wrangler/templates/middleware/middleware-scheduled.ts#L6
    if (url.pathname === "/__scheduled") {
      await worker.scheduled({
        scheduledTime: new Date(),
        cron: url.searchParams.get("cron") ?? undefined,
      });
      return new miniflare.Response("Ran scheduled function");
    }

    const result = await worker
      .fetch(request)
      .then((response) => ({ success: true, response }) as const)
      .catch((error) => ({ success: false, error }) as const);

    // If you open the `/__scheduled` page in a browser, the browser will automatically make a request to `/favicon.ico`.
    // For scheduled Workers _without_ a fetch handler, this will result in an unhelpful error that we don't need to log.
    // To avoid this, inject a 404 response to favicon.ico loads on the `/__scheduled` page
    if (
      request.headers.get("referer")?.endsWith("/__scheduled") &&
      url.pathname === "/favicon.ico" &&
      !result.success
    ) {
      return new miniflare.Response(null, { status: 404 });
    }

    if (!result.success) {
      throw result.error;
    }

    return result.response;
  };

  const toMiniflareRequest = (
    req: http.IncomingMessage,
  ): { request: miniflare.Request; url: URL } => {
    const info = parseIncomingMessage(req);
    options.transformRequest?.(info);
    return {
      request: new miniflare.Request(info.url, {
        method: info.method,
        headers: info.headers,
        body: info.body,
        redirect: info.redirect,
        duplex: info.duplex,
      }),
      url: info.url,
    };
  };

  const createServerWebSocket = async (req: http.IncomingMessage) => {
    const { request } = toMiniflareRequest(req);
    const name = options.getWorkerName(request);
    const target = await options.miniflare.unsafeGetDirectURL(name);
    const url = new URL(req.url ?? "/", target);
    url.protocol = url.protocol.replace("http", "ws");
    const protocols = req.headers["sec-websocket-protocol"]
      ?.split(",")
      .map((p) => p.trim());
    const server = new WebSocket(url, protocols);
    await once(server, "open");
    return server;
  };

  server.listen(options.port);
  await once(server, "listening");
  const url = new URL(`http://localhost:${options.port}`);

  return {
    url,
    close: async () => {
      await Promise.all([
        new Promise((resolve) => server.close(resolve)),
        new Promise((resolve) => wss.close(resolve)),
      ]);
    },
  };
}

interface RequestInfo {
  method: string;
  url: URL;
  headers: miniflare.Headers;
  body: miniflare.BodyInit | undefined;
  redirect: "manual";
  duplex: "half" | undefined;
}

const parseIncomingMessage = (req: http.IncomingMessage): RequestInfo => {
  const method = req.method ?? "GET";
  const protocol = req.headers["x-forwarded-proto"] ?? "http";
  const url = new URL(req.url ?? "/", `${protocol}://${req.headers.host}`);
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
  return {
    method,
    url,
    headers,
    body,
    redirect: "manual",
    duplex: body ? "half" : undefined,
  };
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

export class MiniflareWorkerProxyError extends Error {
  constructor(
    message: string,
    readonly status: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }

  toResponse(mode: "local" | "remote"): miniflare.Response {
    let text = `[Alchemy] ${this.message}`;
    if (mode === "local" && this.cause) {
      const cause =
        this.cause instanceof Error
          ? (this.cause.stack ?? this.cause.message)
          : String(this.cause);
      text += `\n\n${cause}`;
    }
    return new miniflare.Response(text, {
      status: this.status,
      headers: {
        "Content-Type": "text/plain",
        "Alchemy-Error": this.message,
      },
    });
  }

  static fromUnknown(error: unknown): MiniflareWorkerProxyError {
    if (error instanceof MiniflareWorkerProxyError) {
      return error;
    }
    return new MiniflareWorkerProxyError("An unknown error occurred.", 500, {
      cause: error,
    });
  }
}

import http from "node:http";
import type { AddressInfo } from "node:net";
import { Readable } from "node:stream";
import { promiseWithResolvers } from "./promise-with-resolvers.ts";

export class HTTPServer {
  server: http.Server;
  ready: Promise<void>;

  constructor(options: {
    port?: number;
    fetch: (request: Request) => Promise<Response>;
  }) {
    const { promise, resolve } = promiseWithResolvers<void>();
    this.ready = promise;
    this.server = http
      .createServer(async (req, res) => {
        const response = await options.fetch(toWebRequest(req));
        await writeNodeResponse(res, response);
      })
      .listen(options.port, resolve);
  }

  get port() {
    return (this.server.address() as AddressInfo).port;
  }

  get hostname() {
    const address = (this.server.address() as AddressInfo)?.address;
    if (address === "::") {
      return "localhost";
    }
    return address;
  }

  get url() {
    return `http://${this.hostname}:${this.port}`;
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(undefined);
        }
      });
    });
  }
}

function toWebRequest(request: http.IncomingMessage): Request {
  const method = request.method ?? "GET";
  return new Request(`http://${request.headers.host}${request.url ?? "/"}`, {
    method,
    headers: request.headers as Record<string, string>,
    body:
      ["GET", "HEAD", "OPTIONS"].includes(method) || !request.readable
        ? undefined
        : (Readable.toWeb(request) as unknown as BodyInit),
    // TODO: why is Cloudflare's request type showing up here?
    // @ts-expect-error - `duplex` not present on Cloudflare Workers request type, but valid for Node
    duplex: "half",
  });
}

async function writeNodeResponse(res: http.ServerResponse, response: Response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  await response.body?.pipeTo(
    new WritableStream({
      write(chunk) {
        res.write(chunk);
      },
      close() {
        res.end();
      },
    }),
  );
  res.end();
}

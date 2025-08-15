import alchemy from "alchemy";
import { DurableObjectNamespace, Queue, Worker } from "alchemy/cloudflare";
import { SQLiteStateStore } from "alchemy/state";
import { quickTunnel } from "../quick-tunnel.ts";
import { link } from "./link.ts";
import type { ProxiedHandler } from "./protocol.ts";

const app = await alchemy("my-test-app", {
  stateStore: (scope) => new SQLiteStateStore(scope),
  password: "placeholder",
});

const token = alchemy.secret("placeholder");

const queue = await Queue<{
  body: string;
}>("my-queue", {
  adopt: true,
  dev: {
    remote: true,
  },
});

const proxy = await Worker("live-proxy", {
  entrypoint: "../../../workers/live-proxy-worker.ts",
  bindings: {
    SESSION_SECRET: token,
    COORDINATOR: DurableObjectNamespace("server", {
      className: "Server",
    }),
    QUEUE: queue,
  },
  eventSources: [queue],
  adopt: true,
  dev: {
    remote: true,
  },
  sourceMap: true,
});

const { tunnelUrl, localUrl } = await quickTunnel(app, "http://localhost:8080");

const client = await link<ProxiedHandler>({
  role: "server",
  remote: proxy.url!,
  token,
  tunnelUrl,
  localUrl,
  functions: {
    async email(message, ctx) {},
    async fetch(request, ctx) {
      return new Response("Hello, world!");
    },
    async tail(request, ctx) {},
    async trace(request, ctx) {},
    async tailStream(request, ctx) {
      throw new Error("Not implemented");
    },
    async scheduled(event, ctx) {},
    async queue(batch: MessageBatch, ctx) {
      // console.log("batch", batch);
      batch.ackAll();
      // batch.messages[0].ack();
    },
    async test(controller, ctx) {},
  } satisfies ProxiedHandler,
});

while (true) {
  console.log("sending message");
  await queue.send({
    body: "Hello, world!",
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

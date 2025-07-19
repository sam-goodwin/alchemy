import * as miniflare from "miniflare";
import path from "node:path";
import { findOpenPort } from "../../util/find-open-port.ts";
import {
  promiseWithResolvers,
  type PromiseWithResolvers,
} from "../../util/promise-with-resolvers.ts";
import {
  buildMiniflareWorkerOptions,
  buildRemoteBindings,
  type MiniflareWorkerOptions,
} from "./miniflare-worker-options.ts";
import { MiniflareWorkerProxy } from "./miniflare-worker-proxy.ts";
import {
  createRemoteProxyWorker,
  type RemoteBindingProxy,
} from "./remote-binding-proxy.ts";

class MiniflareServer {
  miniflare?: miniflare.Miniflare;
  workers = new Map<string, miniflare.WorkerOptions>();
  workerProxies = new Map<string, MiniflareWorkerProxy>();
  remoteBindingProxies = new Map<string, RemoteBindingProxy>();

  stream = new WritableStream<{
    worker: MiniflareWorkerOptions;
    promise: PromiseWithResolvers<{ url: string }>;
  }>({
    write: async ({ worker, promise }) => {
      try {
        const server = await this.set(worker);
        promise.resolve(server);
      } catch (error) {
        promise.reject(error);
      }
    },
    close: async () => {
      await this.dispose();
    },
  });
  writer = this.stream.getWriter();

  async push(worker: MiniflareWorkerOptions) {
    const promise = promiseWithResolvers<{ url: string }>();
    const [, server] = await Promise.all([
      this.writer.write({ worker, promise }),
      promise.promise,
    ]);
    return server;
  }

  async close() {
    await this.writer.close();
  }

  private async set(worker: MiniflareWorkerOptions) {
    this.workers.set(
      worker.name,
      await buildMiniflareWorkerOptions({
        ...worker,
        remoteProxyConnectionString: await this.maybeCreateRemoteProxy(worker),
      }),
    );
    if (this.miniflare) {
      await withErrorRewrite(
        this.miniflare.setOptions(await this.miniflareOptions()),
      );
    } else {
      // Miniflare intercepts SIGINT and exits with 130, which is not a failure.
      // No one likes to see a non-zero exit code when they Ctrl+C, so here's our workaround.
      process.on("exit", (code) => {
        if (code === 130) {
          process.exit(0);
        }
      });
      this.miniflare = new miniflare.Miniflare(await this.miniflareOptions());
      await withErrorRewrite(this.miniflare.ready);
    }
    const existingProxy = this.workerProxies.get(worker.name);
    if (existingProxy) {
      return existingProxy;
    }
    const newProxy = new MiniflareWorkerProxy({
      name: worker.name,
      port: worker.port ?? (await findOpenPort()),
      miniflare: this.miniflare,
    });
    this.workerProxies.set(worker.name, newProxy);
    await newProxy.ready;
    return newProxy;
  }

  private async dispose() {
    await Promise.all([
      this.miniflare?.dispose(),
      ...Array.from(this.workerProxies.values()).map((server) =>
        server.close(),
      ),
      ...Array.from(this.remoteBindingProxies.values()).map((proxy) =>
        proxy.server.close(),
      ),
    ]);
    this.miniflare = undefined;
    this.workers.clear();
    this.workerProxies.clear();
  }

  private async maybeCreateRemoteProxy(
    worker: MiniflareWorkerOptions,
  ): Promise<miniflare.RemoteProxyConnectionString | undefined> {
    const bindings = buildRemoteBindings(worker);
    if (bindings.length === 0) {
      return undefined;
    }
    const existing = this.remoteBindingProxies.get(worker.name);
    if (
      existing?.bindings.every((b) =>
        bindings.find((b2) => b2.name === b.name && b2.type === b.type),
      )
    ) {
      return existing.connectionString;
    } else if (existing) {
      await existing.server.close();
    }
    const proxy = await createRemoteProxyWorker({
      name: `mixed-mode-proxy-${crypto.randomUUID()}`,
      bindings,
    });
    this.remoteBindingProxies.set(worker.name, proxy);
    return proxy.connectionString;
  }

  private async miniflareOptions(): Promise<miniflare.MiniflareOptions> {
    return {
      workers: Array.from(this.workers.values()),
      defaultPersistRoot: path.join(process.cwd(), ".alchemy/miniflare"),
      unsafeDevRegistryPath: miniflare.getDefaultDevRegistryPath(),
      analyticsEngineDatasetsPersist: true,
      cachePersist: true,
      d1Persist: true,
      durableObjectsPersist: true,
      kvPersist: true,
      r2Persist: true,
      secretsStorePersist: true,
      workflowsPersist: true,
      log: process.env.DEBUG
        ? new miniflare.Log(miniflare.LogLevel.DEBUG)
        : undefined,
    };
  }
}

export class ExternalDependencyError extends Error {
  constructor() {
    super(
      'Miniflare detected an external dependency that could not be resolved. This typically occurs when the "nodejs_compat" or "nodejs_als" compatibility flag is not enabled.',
    );
  }
}

async function withErrorRewrite<T>(promise: Promise<T>) {
  try {
    return await promise;
  } catch (error) {
    if (
      error instanceof miniflare.MiniflareCoreError &&
      error.code === "ERR_MODULE_STRING_SCRIPT"
    ) {
      throw new ExternalDependencyError();
    } else {
      throw error;
    }
  }
}

declare global {
  var _ALCHEMY_MINIFLARE_SERVER: MiniflareServer | undefined;
}

export const miniflareServer = new Proxy({} as MiniflareServer, {
  get: (_, prop: keyof MiniflareServer) => {
    globalThis._ALCHEMY_MINIFLARE_SERVER ??= new MiniflareServer();
    return globalThis._ALCHEMY_MINIFLARE_SERVER[prop];
  },
});

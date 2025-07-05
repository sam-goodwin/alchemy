import {
  MiniflareCoreError,
  type Miniflare,
  type MiniflareOptions,
  type RemoteProxyConnectionString,
  type WorkerOptions,
} from "miniflare";
import path from "node:path";
import { findOpenPort } from "../../util/find-open-port.ts";
import { logger } from "../../util/logger.ts";
import {
  promiseWithResolvers,
  type PromiseWithResolvers,
} from "../../util/promise-with-resolvers.ts";
import { HTTPServer } from "./http-server.ts";
import {
  buildMiniflareWorkerOptions,
  buildRemoteBindings,
  type MiniflareWorkerOptions,
} from "./miniflare-worker-options.ts";
import { createMixedModeProxy, type MixedModeProxy } from "./mixed-mode.ts";

class MiniflareServer {
  miniflare?: Miniflare;
  workers = new Map<string, WorkerOptions>();
  servers = new Map<string, HTTPServer>();
  mixedModeProxies = new Map<string, MixedModeProxy>();

  stream = new WritableStream<{
    worker: MiniflareWorkerOptions;
    promise: PromiseWithResolvers<HTTPServer>;
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
    const promise = promiseWithResolvers<HTTPServer>();
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
      worker.name as string,
      buildMiniflareWorkerOptions({
        ...worker,
        remoteProxyConnectionString:
          await this.maybeCreateMixedModeProxy(worker),
      }),
    );
    if (this.miniflare) {
      await withErrorRewrite(
        this.miniflare.setOptions(await this.miniflareOptions()),
      );
    } else {
      const { Miniflare } = await import("miniflare").catch(() => {
        throw new Error(
          "Miniflare is not installed, but is required in local mode for Workers. Please run `npm install miniflare`.",
        );
      });

      // Miniflare intercepts SIGINT and exits with 130, which is not a failure.
      // No one likes to see a non-zero exit code when they Ctrl+C, so here's our workaround.
      process.on("exit", (code) => {
        if (code === 130) {
          process.exit(0);
        }
      });
      this.miniflare = new Miniflare(await this.miniflareOptions());
      await withErrorRewrite(this.miniflare.ready);
    }
    const existing = this.servers.get(worker.name);
    if (existing) {
      return existing;
    }
    const server = new HTTPServer({
      port: worker.port ?? (await findOpenPort()),
      fetch: this.createRequestHandler(worker.name as string),
    });
    this.servers.set(worker.name, server);
    await server.ready;
    return server;
  }

  private async dispose() {
    await Promise.all([
      this.miniflare?.dispose(),
      ...Array.from(this.servers.values()).map((server) => server.stop()),
      ...Array.from(this.mixedModeProxies.values()).map((proxy) =>
        proxy.server.stop(),
      ),
    ]);
    this.miniflare = undefined;
    this.workers.clear();
    this.servers.clear();
  }

  private async maybeCreateMixedModeProxy(
    worker: MiniflareWorkerOptions,
  ): Promise<RemoteProxyConnectionString | undefined> {
    const bindings = buildRemoteBindings(worker);
    if (bindings.length === 0) {
      return undefined;
    }
    const existing = this.mixedModeProxies.get(worker.name);
    if (
      existing?.bindings.every((b) =>
        bindings.find((b2) => b2.name === b.name && b2.type === b.type),
      )
    ) {
      return existing.connectionString;
    }
    const proxy = await createMixedModeProxy({
      name: `mixed-mode-proxy-${crypto.randomUUID()}`,
      bindings,
    });
    this.mixedModeProxies.set(worker.name, proxy);
    return proxy.connectionString;
  }

  private createRequestHandler(name: string) {
    return async (req: Request) => {
      try {
        if (!this.miniflare) {
          return new Response(
            "[Alchemy] Miniflare is not initialized. Please try again.",
            {
              status: 503,
            },
          );
        }
        const miniflare = await this.miniflare?.getWorker(name);
        if (!miniflare) {
          return new Response(
            `[Alchemy] Cannot find worker "${name}". Please try again.`,
            {
              status: 503,
            },
          );
        }
        const res = await miniflare.fetch(req.url, {
          method: req.method,
          headers: req.headers as any,
          body: req.body as any,
          redirect: "manual",
        });
        return res as unknown as Response;
      } catch (error) {
        logger.error(error);
        return new Response(
          `[Alchemy] Internal server error: ${String(error)}`,
          {
            status: 500,
          },
        );
      }
    };
  }

  private async miniflareOptions(): Promise<MiniflareOptions> {
    const { getDefaultDevRegistryPath } = await import("miniflare");
    return {
      workers: Array.from(this.workers.values()),
      defaultPersistRoot: path.join(process.cwd(), ".alchemy/miniflare"),
      unsafeDevRegistryPath: getDefaultDevRegistryPath(),
      analyticsEngineDatasetsPersist: true,
      cachePersist: true,
      d1Persist: true,
      durableObjectsPersist: true,
      kvPersist: true,
      r2Persist: true,
      secretsStorePersist: true,
      workflowsPersist: true,
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
      error instanceof MiniflareCoreError &&
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

import fs from "node:fs/promises";
import { Self, type Bindings } from "./bindings.js";
import type { WorkerProps } from "./worker.js";

import type {
  Miniflare,
  MixedModeConnectionString,
  WorkerOptions,
} from "miniflare";
import { AsyncMutex } from "../util/mutex.js";
import { isQueueEventSource } from "./event-source.js";
import { isQueue } from "./queue.js";

let _mf: Miniflare | undefined;

let port = 9000;

// global list of local workers running in the singleton miniflare instance
const workers: WorkerOptions[] = [];
const mutex = new AsyncMutex();
const workerPorts: {
  [workerName: string]: number;
} = {};

export async function miniflareWorker(
  props: WorkerProps & {
    compatibilityDate: string;
    compatibilityFlags: string[];
    workerName: string;
    script: string;
    scriptPath: string;
    format?: "esm" | "cjs";
  },
) {
  const worker: WorkerOptions = {
    name: props.workerName,
    script: props.script,
    // needed for imports
    scriptPath: props.scriptPath,
    modules: true,
    // modulesRules: [
    //   { type: "ESModule", include: ["**/libsodium*"], fallthrough: true },
    // ],
    compatibilityDate: props.compatibilityDate,
    compatibilityFlags: props.compatibilityFlags,
    unsafeDirectSockets: props.url
      ? [
          {
            host: "localhost",
            // TODO(sam): per-Worker port
            port: (workerPorts[props.workerName] ??= port++), //await findOpenPortStartingFrom(9000)),
          },
        ]
      : undefined,
  };
  await fs.writeFile("script.js", props.script);

  const bindings = (props.bindings ?? {}) as Bindings;

  const { kCurrentWorker } = await import("miniflare");

  // Convert bindings to the format expected by the API
  for (const [bindingName, binding] of Object.entries(bindings)) {
    // Create a copy of the binding to avoid modifying the original

    if (typeof binding === "string") {
      // (worker.textBlobBindings ??= {})[bindingName] = binding;
    } else if (binding === Self) {
      (worker.serviceBindings ??= {})[bindingName] = kCurrentWorker as any;
    } else if (binding.type === "d1") {
      ((worker.d1Databases ??= {}) as Record<string, string>)[bindingName] =
        binding.name;
      // name or UUID?
      // binding.id;
    } else if (binding.type === "kv_namespace") {
      ((worker.kvNamespaces ??= {}) as Record<string, string>)[bindingName] =
        "namespaceId" in binding ? binding.namespaceId : binding.id;
    } else if (binding.type === "service") {
      (worker.serviceBindings ??= {})[bindingName] =
        binding.name === worker.name ? (kCurrentWorker as any) : binding.name;
    } else if (binding.type === "durable_object_namespace") {
      (worker.durableObjects ??= {})[bindingName] = {
        className: binding.className,
        scriptName: binding.scriptName,
        useSQLite: binding.sqlite ?? false,
      };
    } else if (binding.type === "r2_bucket") {
      ((worker.r2Buckets ??= {}) as Record<string, string>)[bindingName] =
        binding.name;
    } else if (binding.type === "assets") {
      if (worker.assets) {
        throw new Error(
          `There can only be one asset binding, but found ${worker.assets.binding} and ${bindingName}`,
        );
      }
      worker.assets = {
        directory: binding.path,
        binding: bindingName,
        workerName: props.workerName,
        ...(props.assets
          ? {
              assetConfig: {
                html_handling: props.assets.html_handling,
                not_found_handling: props.assets.not_found_handling,
                // TODO(sam): parse these files?
                // headers: props.assets._headers,
                // redirects: props.assets._redirects
                // script_id: ?? // is this needed?
              },
              routerConfig: {
                invoke_user_worker_ahead_of_assets:
                  props.assets?.run_worker_first,
              },
            }
          : {}),
      };
    } else if (binding.type === "secret") {
      (worker.bindings ??= {})[bindingName] = binding.unencrypted;
    } else if (binding.type === "workflow") {
      (worker.workflows ??= {})[bindingName] = {
        className: binding.className,
        name: binding.workflowName,
        // TODO(sam): what if this is a binding to a workflow in another script?
        scriptName: props.workerName,
      };
    } else if (binding.type === "queue") {
      ((worker.queueProducers ??= {}) as Record<string, string>)[bindingName] =
        binding.name;
    } else if (binding.type === "pipeline") {
      ((worker.pipelines ??= {}) as Record<string, string>)[bindingName] =
        binding.name;
    } else if (binding.type === "vectorize") {
      // @ts-ignore
      (worker.vectorize ??= {})[bindingName] = {
        index_name: binding.name,
        // TODO(sam): where do I get this from?
        // mixedModeConnectionString: ??
      };
    } else if (binding.type === "ai_gateway") {
      // TODO(sam): can we proxy this to the real deal? e.g. "mixed" mode?
      throw new Error("AI Gateway binding not supported in Miniflare");
    } else if (binding.type === "hyperdrive") {
      //   (options.hyperdrives ??= {})[bindingName] = binding.hyperdriveId
      // TODO(sam): can we proxy this to the real deal?
      throw new Error("Hyperdrive binding not supported in Alchemy dev mode");
    } else if (binding.type === "browser") {
      if (worker.browserRendering) {
        throw new Error(
          `Duplicate browser rendering binding: ${bindingName}, already have ${worker.browserRendering.binding}`,
        );
      }
      // TODO(sam): we need a mixed mode connection string
      worker.browserRendering = {
        binding: bindingName,
        // TODO(sam): how do I get this?
        mixedModeConnectionString: new URL(
          "http://localhost:8787",
        ) as MixedModeConnectionString,
      };
      throw new Error(
        "Browser Rendering not yet supported in Alchemy dev mode",
      );
    } else if (binding.type === "ai") {
      if (worker.ai) {
        throw new Error(
          `Duplicate AI binding: ${bindingName}, already have ${worker.ai.binding}`,
        );
      }
      worker.ai = {
        binding: bindingName,
        // TODO(sam): how do I get this?
        mixedModeConnectionString: new URL(
          "http://localhost:8787",
        ) as MixedModeConnectionString,
      };
      throw new Error("AI binding not yet supported in Alchemy dev mode");
    } else if (binding.type === "json") {
      (worker.bindings ??= {})[bindingName] = binding.json;
    } else if (binding.type === "analytics_engine") {
      (worker.analyticsEngineDatasets ??= {})[bindingName] = {
        dataset: binding.dataset,
      };
    } else {
      // @ts-expect-error - we should never reach here
      throw new Error(`Unsupported binding type: ${binding.type}`);
    }
  }

  if (props.eventSources) {
    for (const eventSource of props.eventSources) {
      if (isQueue(eventSource) || isQueueEventSource(eventSource)) {
        // const queue = isQueue(eventSource) ? eventSource : eventSource.queue;
        // (
        //   (worker.queueConsumers ??= []) as Record<
        //     string,
        //     {
        //       maxBatchSize?: number | undefined;
        //       maxBatchTimeout?: number | undefined;
        //       maxRetires?: number | undefined;
        //       maxRetries?: number | undefined;
        //       deadLetterQueue?: string | undefined;
        //       retryDelay?: number | undefined;
        //     }
        //   >
        // )[queue.name] =
        //   (isQueueEventSource(eventSource)
        //     ? eventSource.settings
        //     : undefined) ?? {};
      } else {
        throw new Error(`Unsupported event source type: ${eventSource}`);
      }
    }
  }
  return mutex.lock(async () => {
    const miniflare = await import("miniflare");
    const index = workers.findIndex((w) => w.name === worker.name);
    if (index !== -1) {
      workers.splice(index, 1, worker);
    } else {
      workers.push(worker);
    }
    if (!_mf) {
      // Kill any lingering workerd processes before starting new ones
      await killLingeringWorkerd();

      while (true) {
        try {
          _mf = new miniflare.Miniflare({
            kvPersist: true,
            workers,
            liveReload: true,
          });
          await _mf.ready;
          break;
        } catch {
          // await _mf?.dispose();
          console.error("Failed to ready");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } else {
      await _mf.setOptions({
        workers,
      });
    }
    return {
      fetch: async (input: string | URL, init?: RequestInit) => {
        // @ts-expect-error - slight difference in types ([string, string] vs string[]) but it's fine
        return (await _mf!.getWorker(worker.name!)).fetch(input, init);
      },
      url: (await _mf.unsafeGetDirectURL(worker.name!)).toString(),
    };
  });
}

export async function dispose() {
  console.log("dispose");
  await _mf?.dispose();
}

/**
 * Kill any workerd process that is a child or grand-child of this Node process.
 * Works on Windows, macOS, and Linux without optional utilities.
 *
 * When running `bun --watch`, both the pid and ppid remain stable, so any `workerd` with parent as pid or ppid can safely be killed.
 * When running `node --watch`, the pid changes but the ppid remains stable (ppid is the shell pid).
 *   -> Killing any `workerd` assumes only one `--watch` per shell (e.g. one per terminal).
 */
async function killLingeringWorkerd(): Promise<void> {
  // Use dynamic import for node:child_process and node:util
  const { exec: _exec } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const exec = promisify(_exec);

  const { pid, ppid, platform } = process;

  if (platform === "win32") {
    // --- Windows -------------------------------------------------------------
    // 1) find children of *this* PID, 2) if none, use parent PID.
    for (const parent of [pid, ppid]) {
      if (!parent) continue;
      try {
        const { stdout } = await exec(
          `wmic process where (ParentProcessId=${parent} and Name="workerd.exe") get ProcessId /format:value`,
        );
        // WMIC prints lines such as "ProcessId=1234"
        const match = stdout.match(/ProcessId=(\d+)/);
        if (match) {
          await exec(`taskkill /F /PID ${match[1]}`);
          return;
        }
      } catch {
        /* ignore – WMIC returns non-zero when no rows match */
      }
    }
  } else {
    // --- macOS / Linux -------------------------------------------------------
    const isMac = platform === "darwin";
    // BSD (macOS) ps vs. GNU (Linux) ps have different flag syntax.
    // We ask for "pid  ppid  command", trimmed of headers.
    const psCmd = isMac
      ? "ps -ax -o pid=,ppid=,comm="
      : "ps -eo pid=,ppid=,comm=";

    const psLines = (await exec(psCmd)).stdout.trim().split("\n");

    /** helper to locate a workerd child of a given parent id */
    const findChild = (parent?: number): string | undefined => {
      if (!parent) return;
      for (const line of psLines) {
        const [childPid, childPpid, cmd] = line.trim().split(/\s+/, 3);
        if (Number(childPpid) === parent && cmd?.includes("workerd")) {
          return childPid;
        }
      }
    };

    const targetPid = findChild(pid) ?? findChild(ppid);
    if (targetPid) {
      process.kill(Number(targetPid), "SIGKILL");
    }
  }
}

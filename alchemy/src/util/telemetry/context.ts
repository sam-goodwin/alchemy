import { exec } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import { join } from "node:path";
import pkg from "../../../package.json" with { type: "json" };
import type { Phase } from "../../alchemy.ts";
import { CONFIG_DIR } from "./constants.ts";
import type { Telemetry } from "./types.ts";

async function userId() {
  const path = join(CONFIG_DIR, "id");

  try {
    return (await readFile(path, "utf-8")).trim();
  } catch {}

  try {
    await mkdir(CONFIG_DIR, { recursive: true });
  } catch {}

  const id = crypto.randomUUID();
  try {
    await writeFile(path, id);
    console.warn(
      [
        "Attention: To help improve Alchemy, we now collect anonymous usage, performance, and error data.",
        "You can opt out by setting the ALCHEMY_TELEMETRY_DISABLED or DO_NOT_TRACK environment variable to a truthy value.",
      ].join("\n"),
    );
  } catch {
    return null;
  }

  return id;
}

function projectId() {
  return new Promise<string | null>((resolve) => {
    exec("git rev-list --max-parents=0 HEAD", (err, stdout) => {
      if (err) {
        resolve(null);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

function system(): Telemetry.Context["system"] {
  return {
    platform: os.platform(),
    osVersion: os.release(),
    arch: os.arch(),
    cpus: os.cpus().length,
    memory: os.totalmem() / 1024 / 1024,
  };
}

declare global {
  var Deno:
    | {
        version: {
          deno: string;
        };
      }
    | undefined;
  var EdgeRuntime: Record<string, unknown> | undefined;
}

const RUNTIMES = [
  {
    name: "bun",
    detect: () => !!globalThis.Bun,
    version: () => globalThis.Bun?.version,
  },
  {
    name: "deno",
    detect: () => !!globalThis.Deno,
    version: () => globalThis.Deno?.version?.deno,
  },
  {
    name: "workerd",
    detect: () => !!globalThis.EdgeRuntime,
    version: () => null,
  },
  {
    name: "node",
    detect: () => !!globalThis.process?.versions?.node,
    version: () => process.versions.node,
  },
] as const;

function runtime(): Telemetry.Context["runtime"] {
  for (const runtime of RUNTIMES) {
    if (runtime.detect()) {
      return {
        name: runtime.name,
        version: runtime.version() ?? null,
      };
    }
  }
  return {
    name: null,
    version: null,
  };
}

const PROVIDERS = [
  { env: "GITHUB_ACTIONS", provider: "GitHub Actions", isCI: true },
  { env: "GITLAB_CI", provider: "GitLab CI", isCI: true },
  { env: "CIRCLECI", provider: "CircleCI", isCI: true },
  { env: "JENKINS_URL", provider: "Jenkins", isCI: true },
  { env: "TRAVIS", provider: "Travis CI", isCI: true },
  { env: "NOW_BUILDER", provider: "Vercel", isCI: true },
  { env: "VERCEL", provider: "Vercel", isCI: false },
];

function environment(): Telemetry.Context["environment"] {
  for (const provider of PROVIDERS) {
    if (process.env[provider.env]) {
      return {
        provider: provider.provider,
        isCI: provider.isCI,
      };
    }
  }
  return {
    provider: null,
    isCI: !!process.env.CI,
  };
}

export async function context(input: {
  sessionId: string;
  phase: Phase;
}): Promise<Telemetry.Context> {
  const env = environment();
  const [uid, pid] = await Promise.all([
    env.isCI ? null : userId(),
    projectId(),
  ]);
  return {
    userId: uid,
    projectId: pid,
    sessionId: input.sessionId,
    system: system(),
    runtime: runtime(),
    environment: env,
    alchemy: {
      version: pkg.version,
      phase: input.phase,
    },
  };
}

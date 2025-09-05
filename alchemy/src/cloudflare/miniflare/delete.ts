import crypto from "node:crypto";
import type { RmDirOptions } from "node:fs";
import fs from "node:fs/promises";
import path from "pathe";
import type { Scope } from "../../scope.ts";
import type { DurableObjectNamespace } from "../durable-object-namespace.ts";
import type { Workflow } from "../workflow.ts";
import { getPersistPath } from "./paths.ts";

const BINDING_TYPE_KEY = {
  d1: "miniflare-D1DatabaseObject",
  kv: "miniflare-KVNamespaceObject",
  r2: "miniflare-R2BucketObject",
} as const;

type BindingType = keyof typeof BINDING_TYPE_KEY;

/**
 * Delete a binding from the miniflare directory.
 */
export async function deleteMiniflareBinding(
  scope: Scope,
  type: BindingType,
  id: string,
) {
  const persistRoot = getPersistPath(scope);
  const bindingPath = path.join(persistRoot, type, BINDING_TYPE_KEY[type]);

  // delete durable object/sqlite files
  const namespaceId = durableObjectNamespaceIdFromName(
    BINDING_TYPE_KEY[type],
    id,
  );
  const files = await fs
    .readdir(bindingPath)
    .then((files) => files.filter((file) => file.startsWith(namespaceId)))
    .catch(() => []);
  await Promise.all(files.map((file) => fs.rm(path.join(bindingPath, file))));

  // delete data directory, if present
  await removeDirectory(path.join(persistRoot, type, id), {
    recursive: true,
  });

  // delete the miniflare directory if it is empty
  await cleanMiniflareDirectory(persistRoot);
}

/**
 * Delete local durable object and workflow data for a given Worker script.
 */
export async function deleteMiniflareWorkerData(
  scope: Scope,
  scriptName: string,
  input: {
    durableObjects: DurableObjectNamespace[];
    workflows: Workflow[];
  },
) {
  const persistRoot = getPersistPath(scope);
  await Promise.all(
    input.durableObjects.map((durableObject) =>
      removeDirectory(
        path.join(
          persistRoot,
          "do",
          `${scriptName}-${durableObject.className}`,
        ),
        {
          recursive: true,
        },
      ),
    ),
  );
  await Promise.all(
    input.workflows.map((workflow) =>
      removeDirectory(
        path.join(
          persistRoot,
          "workflows",
          `miniflare-workflows-${workflow.workflowName}`,
        ),
        {
          recursive: true,
        },
      ),
    ),
  );
  await cleanMiniflareDirectory(persistRoot);
}

/**
 * Delete the miniflare directory iff it is empty.
 */
async function cleanMiniflareDirectory(persistRoot: string) {
  // TODO(sam): do we need to ../ or can we just delete minflare/v3
  const directory = path.resolve(persistRoot, "..");
  const files = await fs
    .readdir(directory, {
      recursive: true,
      withFileTypes: true,
    })
    .catch((error) => {
      if (!isENOENT(error)) {
        throw error;
      }
      return [];
    });
  if (!files.some((file) => !file.isDirectory())) {
    await removeDirectory(directory, { recursive: true });
  }
}

const removeDirectory = async (path: string, options?: RmDirOptions) => {
  try {
    await fs.rmdir(path, options);
  } catch (error) {
    if (!isENOENT(error)) {
      throw error;
    }
  }
};

const isENOENT = (error: unknown): error is { code: "ENOENT" } =>
  !!error &&
  typeof error === "object" &&
  "code" in error &&
  error.code === "ENOENT";

// copied from https://github.com/cloudflare/workers-sdk/blob/a5892915e173ca8666c04fb394e70711e87b46d8/packages/miniflare/src/plugins/shared/index.ts#L236
const durableObjectNamespaceIdFromName = (uniqueKey: string, name: string) => {
  const key = crypto.createHash("sha256").update(uniqueKey).digest();
  const nameHmac = crypto
    .createHmac("sha256", key)
    .update(name)
    .digest()
    .subarray(0, 16);
  const hmac = crypto
    .createHmac("sha256", key)
    .update(nameHmac)
    .digest()
    .subarray(0, 16);
  return Buffer.concat([nameHmac, hmac]).toString("hex");
};

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { memoize } from "../../util/memoize.ts";
import type { CloudflareApi } from "../api.ts";

export const getAccountSubdomain = memoize(
  async (api: CloudflareApi) => {
    const res = await api.get(`/accounts/${api.accountId}/workers/subdomain`);
    if (!res.ok) {
      throw new Error(
        `Failed to get account subdomain: ${res.status} ${res.statusText}`,
      );
    }
    const json: { result?: { subdomain: string } } = await res.json();
    return json.result?.subdomain;
  },
  (api) => api.accountId,
);

export async function getWorkerTemplate(
  name: "do-state-store" | "mixed-mode-proxy-worker",
) {
  const dir = dirname(fileURLToPath(import.meta.url));
  const path = join(dir, "..", "..", "..", "workers", `${name}.js`);
  const template = await readFile(path, "utf8");
  return new File([template], `${name}.js`, {
    type: "application/javascript+module",
  });
}

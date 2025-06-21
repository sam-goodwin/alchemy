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

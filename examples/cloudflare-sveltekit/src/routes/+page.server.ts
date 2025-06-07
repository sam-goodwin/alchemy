import type { PageServerLoad } from "./$types";

async function getKvDemo(kv: any) {
  if (!kv) return null;

  try {
    let value = await kv.get("demo-key");

    // Set default value if none exists
    if (!value) {
      const defaultData = {
        message: "Hello from Cloudflare KV!",
        timestamp: new Date().toISOString(),
      };
      await kv.put("demo-key", JSON.stringify(defaultData));
      return defaultData;
    }

    // Try parsing as JSON, fall back to string wrapper
    try {
      return JSON.parse(value);
    } catch {
      return { message: value, type: "string", timestamp: "Set via API" };
    }
  } catch (error) {
    console.error("KV error:", error);
    return null;
  }
}

async function getR2Info(r2: any) {
  if (!r2) return null;

  try {
    const { objects = [] } = await r2.list({ limit: 10 });
    return {
      bucketName: "Storage bucket connected!",
      objectCount: objects.length,
      objects: objects.map((obj: any) => ({
        key: obj.key,
        size: obj.size,
        modified: obj.uploaded,
      })),
    };
  } catch (error) {
    console.error("R2 error:", error);
    return { error: "Failed to access R2 bucket" };
  }
}

export const load: PageServerLoad = async ({ platform }) => {
  const env = platform?.env;

  const [kv, r2] = await Promise.all([
    getKvDemo(env?.AUTH_STORE),
    getR2Info(env?.STORAGE),
  ]);

  return {
    kv,
    r2,
    platform: {
      hasKV: !!env?.AUTH_STORE,
      hasR2: !!env?.STORAGE,
      hasContext: !!platform?.context,
    },
  };
};

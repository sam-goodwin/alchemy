import type { RequestEvent } from "@sveltejs/kit";

export const GET = async ({ platform }: RequestEvent) => {
  try {
    // Demonstrate KV access
    const kvValue = await platform?.env.AUTH_STORE.get("demo-key");

    // Demonstrate R2 list operation
    const r2List = await platform?.env.STORAGE.list({ limit: 5 });

    return new Response(
      JSON.stringify({
        message: "SvelteKit + Cloudflare API working!",
        kv: {
          key: "demo-key",
          value: kvValue || "No value found",
        },
        r2: {
          objects:
            r2List?.objects.map((obj: any) => ({
              key: obj.key,
              size: obj.size,
              uploaded: obj.uploaded,
            })) || [],
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "API Error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const POST = async ({ request, platform }: RequestEvent) => {
  try {
    const body = (await request.json()) as {
      key?: string;
      value?: string;
      fileContent?: string;
    };

    const { key, value, fileContent } = body;

    // Demonstrate KV write
    if (key && value) {
      await platform?.env.AUTH_STORE.put(key, value);
    }

    // Demonstrate R2 write
    if (fileContent) {
      const fileName = `demo-${Date.now()}.txt`;
      await platform?.env.STORAGE.put(fileName, fileContent);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Data stored successfully",
        stored: {
          kv: key ? { key, value } : null,
          r2: fileContent ? `demo-${Date.now()}.txt` : null,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Storage Error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

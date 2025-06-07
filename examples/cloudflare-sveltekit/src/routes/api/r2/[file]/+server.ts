import type { RequestEvent } from "@sveltejs/kit";

export const GET = async ({ url, platform }: RequestEvent) => {
  if (!platform?.env?.STORAGE) {
    return new Response("R2 bucket not available", { status: 500 });
  }

  // Extract filename from the URL path after /api/r2/
  const pathname = url.pathname;
  const filename = pathname.split("/api/r2/")[1];

  if (!filename) {
    return new Response("Filename required", { status: 400 });
  }

  try {
    const object = await platform.env.STORAGE.get(filename);

    if (!object) {
      return new Response("File not found", { status: 404 });
    }

    // Get the file content
    const content = await object.text();

    // Determine content type based on file extension
    const contentType = filename.endsWith(".json")
      ? "application/json"
      : filename.endsWith(".txt")
        ? "text/plain"
        : "application/octet-stream";

    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error serving R2 file:", error);
    return new Response("Error retrieving file", { status: 500 });
  }
};

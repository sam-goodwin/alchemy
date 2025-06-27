import { ImageResponse } from "workers-og";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Static dimensions
    const width = 1200;
    const height = 630;

    // Extract the path from the URL (everything after the domain)
    const path = url.pathname;

    // Make request to alchemy.run/og/... with the same path to get HTML
    const ogHtmlUrl = `https://alchemy.run/og${path}`;

    const response = await fetch(ogHtmlUrl);

    if (!response.ok) {
      return new Response("Not Found", { status: 404 });
    }

    const html = await response.text();

    return new ImageResponse(html, {
      width,
      height,
    });
  },
};

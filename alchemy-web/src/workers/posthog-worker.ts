// Sourced from: https://posthog.com/docs/advanced/proxy/cloudflare
// This worker is a reverse proxy for the Posthog API, used to bypass
// common ad blockers.

/// <reference types="@cloudflare/workers-types" />

const API_HOST = "us.i.posthog.com"; // Change to "eu.i.posthog.com" for the EU region
const ASSET_HOST = "us-assets.i.posthog.com"; // Change to "eu-assets.i.posthog.com" for the EU region

async function handleRequest(
  request: Request,
  ctx: ExecutionContext,
): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;
  const pathWithParams = pathname + search;

  if (pathname.startsWith("/static/")) {
    return retrieveStatic(request, pathWithParams, ctx);
  } else {
    return forwardRequest(request, pathWithParams);
  }
}

async function retrieveStatic(
  request: Request,
  pathname: string,
  ctx: ExecutionContext,
): Promise<Response> {
  const cache = await caches.open("default");
  let response = await cache.match(request);
  if (!response) {
    response = await fetch(`https://${ASSET_HOST}${pathname}`);
    ctx.waitUntil(cache.put(request, response.clone()));
  }
  return response;
}

async function forwardRequest(
  request: Request,
  pathWithSearch: string,
): Promise<Response> {
  const originRequest = new Request(request);
  originRequest.headers.delete("cookie");
  return await fetch(`https://${API_HOST}${pathWithSearch}`, originRequest);
}

export default {
  async fetch(
    request: Request,
    _: unknown,
    ctx: ExecutionContext,
  ): Promise<Response> {
    return handleRequest(request, ctx);
  },
};

import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute<{ id: string }> = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Not found", { status: 404 });
  }
  const doc = await getEntry("docs", params.id);
  if (!doc) {
    return new Response("Not found", { status: 404 });
  }
  return redirect(`/${params.id}`);
};

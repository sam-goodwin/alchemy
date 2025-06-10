import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const getStaticPaths = async () => {
  const docs = await getCollection("docs");
  return docs.map((doc) => ({
    params: { id: doc.id },
  }));
};

export const GET: APIRoute<{ id: string }> = async ({ params }) => {
  if (!params.id) {
    return new Response("Not found", { status: 404 });
  }
  const doc = await getEntry("docs", params.id);
  if (!doc) {
    return new Response("Not found", { status: 404 });
  }
  return new Response([`# ${doc.data.title}`, "", doc.body].join("\n"), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
};

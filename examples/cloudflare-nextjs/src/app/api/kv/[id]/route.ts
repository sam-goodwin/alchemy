import { getCloudflareContext } from "@opennextjs/cloudflare";

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { env } = await getCloudflareContext({ async: true });
  const { id } = await params;
  const value = await env.KV.get(id);
  if (!value) {
    return new Response(null, { status: 404 });
  }
  return new Response(value);
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { env } = await getCloudflareContext({ async: true });
  const { id } = await params;
  const value = await request.text();
  await env.KV.put(id, value);
  return new Response(null, { status: 201 });
};

export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { env } = await getCloudflareContext({ async: true });
  const { id } = await params;
  await env.KV.delete(id);
  return new Response(null, { status: 204 });
};

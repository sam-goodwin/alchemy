import { getCloudflareContext } from "@opennextjs/cloudflare";

export const GET = async () => {
  const { env } = getCloudflareContext();
  const values = await env.KV.list();
  return Response.json(values);
};

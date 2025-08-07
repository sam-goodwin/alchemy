import { getCloudflareContext } from "@opennextjs/cloudflare";

export const GET = async () => {
  const context = await getCloudflareContext({ async: true });
  return Response.json({
    cfEnv: context.env,
  });
};

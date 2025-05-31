export default {
  async fetch(request: Request, env: any): Promise<Response> {
    if (env.IMAGES && env.IMAGES.type === "images") {
      return new Response("Images binding available", { status: 200 });
    }
    return new Response("Images binding not found", { status: 500 });
  },
};

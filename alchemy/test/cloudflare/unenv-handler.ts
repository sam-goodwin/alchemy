import fs from "node:fs/promises";

export default {
  async fetch(
    _request: Request,
    _env: any,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    return new Response(typeof fs.readFile);
  },
};

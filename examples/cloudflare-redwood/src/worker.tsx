import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { index, render } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "src/Document";
import { setCommonHeaders } from "src/headers";
import { Home } from "src/pages/Home";

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  db: ReturnType<typeof drizzle>;
};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup db in appContext
    ctx.db = drizzle(env.DB);
  },
  render(Document, [index([Home])]),
]);

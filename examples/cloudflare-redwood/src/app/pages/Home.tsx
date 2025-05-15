import type { RequestInfo } from "rwsdk/worker";
import { users } from "../../db/schema.js";

export async function Home({ ctx }: RequestInfo) {
  const allUsers = await ctx.db.select().from(users).all();
  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>
    </div>
  );
}

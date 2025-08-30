import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.ts";

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.HYPERDRIVE.connectionString, { schema });
    switch (request.method) {
      case "GET": {
        const result = await db.select().from(schema.users);
        return Response.json(result);
      }
      case "POST": {
        const result = await db
          .insert(schema.users)
          .values({
            email: "test@test.com",
            password: "password",
          })
          .returning();
        return Response.json(result);
      }
    }
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  },
};

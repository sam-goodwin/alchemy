import { drizzle } from "drizzle-orm/d1";
import { defineScript } from "rwsdk/worker";
import { users } from "./schema.js";

export default defineScript(async ({ env }) => {
  const db = drizzle(env.DB);

  // Insert a user
  await db.insert(users).values({
    name: "__change me__",
    email: "__change me__",
  });

  // Verify the insert by selecting all users
  const result = await db.select().from(users).all();

  console.log("🌱 Finished seeding");

  return Response.json(result);
});

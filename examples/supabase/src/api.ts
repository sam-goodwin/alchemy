import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, posts } from "./schema.ts";

const connectionString = Deno.env.get("SUPABASE_DB_URL")!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  try {
    if (path === "/users" && req.method === "GET") {
      const allUsers = await db.select().from(users);
      return new Response(JSON.stringify(allUsers), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/users" && req.method === "POST") {
      const body = await req.json();
      const newUser = await db.insert(users).values(body).returning();
      return new Response(JSON.stringify(newUser[0]), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (path === "/posts" && req.method === "GET") {
      const allPosts = await db.select().from(posts);
      return new Response(JSON.stringify(allPosts), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

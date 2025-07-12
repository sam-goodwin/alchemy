import { $ } from "bun";

await Promise.all([
  $`drizzle-kit generate --schema src/sqlite/db.ts --out drizzle/default --dialect sqlite`,
  $`drizzle-kit generate --schema src/sqlite/db.ts --out drizzle/durable-object --dialect sqlite --driver durable-sqlite`,
]);
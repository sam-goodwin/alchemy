import path from "node:path";

export const MIGRATIONS_DIRECTORY = path.join(
  import.meta.dirname,
  "..",
  "..",
  "drizzle",
  "default",
);

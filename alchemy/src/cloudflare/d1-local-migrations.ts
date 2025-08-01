import * as mf from "miniflare";
import path from "node:path";

export interface D1LocalMigrationOptions {
  databaseId: string;
  migrationsTable: string;
  migrations: { id: string; sql: string }[];
}

export const applyLocalD1Migrations = async (
  options: D1LocalMigrationOptions,
) => {
  const miniflare = new mf.Miniflare({
    script: "",
    modules: true,
    defaultPersistRoot: path.join(process.cwd(), ".alchemy/miniflare/v3"), // vite plugin forces /v3 suffix
    d1Persist: true,
    d1Databases: { DB: options.databaseId },
    log: process.env.DEBUG ? new mf.Log(mf.LogLevel.DEBUG) : undefined,
  });
  try {
    await miniflare.ready;
    const db = await miniflare.getD1Database("DB");
    const session = db.withSession("first-primary");
    await session
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${options.migrationsTable} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`,
      )
      .run();
    const appliedMigrations = await session
      .prepare(
        `SELECT name FROM ${options.migrationsTable} ORDER BY applied_at ASC`,
      )
      .all<{ name: string }>();
    const insertRecord = session.prepare(
      `INSERT INTO ${options.migrationsTable} (name) VALUES (?)`,
    );
    for (const migration of options.migrations) {
      if (appliedMigrations.results.some((m) => m.name === migration.id)) {
        continue;
      }
      await session.prepare(migration.sql).run();
      await insertRecord.bind(migration.id).run();
    }
  } finally {
    await miniflare.dispose();
  }
};

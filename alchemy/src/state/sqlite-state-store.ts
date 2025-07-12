import type { Config as LibSQLConfig } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";
import type { Scope } from "../scope.ts";
import { memoize } from "../util/memoize.ts";
import { MIGRATIONS_DIRECTORY } from "./migrations.ts";
import { SQLiteStateStoreOperations } from "./operations.ts";
import { StateStoreProxy } from "./proxy.ts";
import * as schema from "./schema.ts";

interface BunSQLiteStateStoreOptions {
  /**
   * Use `bun:sqlite` to connect to the SQLite database.
   * Requires Bun.
   */
  engine: "bun";
  /**
   * The filename to use for the SQLite database.
   * @default process.env.ALCHEMY_STATE_FILE if set, otherwise ".alchemy/state.sqlite"
   */
  filename?: string;

  // Options are copied from Bun instead of inherited because Bun's type is not exported,
  // and the constructor type isn't an interface so inheritance doesn't work.

  readonly?: boolean;
  create?: boolean;
  readwrite?: boolean;
  safeIntegers?: boolean;
  strict?: boolean;
}

interface LibSQLStateStoreOptions extends Omit<LibSQLConfig, "url"> {
  /**
   * Use the `@libsql/client` library to connect to the SQLite database.
   * Supported on Node.js and Bun.
   */
  engine: "libsql";
  /**
   * The filename to use for the SQLite database.
   * @default process.env.ALCHEMY_STATE_FILE if set, otherwise ".alchemy/state.sqlite"
   * @note If the `url` option is specified, this option is ignored.
   */
  filename?: string;
  /**
   * The database URL. Overrides the `filename` option.
   *
   * The client supports `libsql:`, `http:`/`https:`, `ws:`/`wss:` and `file:` URL. For more infomation,
   * please refer to the project README:
   *
   * https://github.com/libsql/libsql-client-ts#supported-urls
   */
  url?: string;
}

interface AutoSQLiteStateStoreOptions {
  /**
   * Automatically choose the best SQLite engine based on your environment.
   * @default "auto" - Uses `bun:sqlite` if available, otherwise uses `@libsql/client`.
   */
  engine?: "auto";

  /**
   * The filename to use for the SQLite database.
   * @default ".alchemy/state.sqlite"
   */
  filename?: string;
}

type SQLiteStateStoreOptions =
  | BunSQLiteStateStoreOptions
  | LibSQLStateStoreOptions
  | AutoSQLiteStateStoreOptions;

export class SQLiteStateStore extends StateStoreProxy {
  constructor(
    scope: Scope,
    private options?: SQLiteStateStoreOptions,
  ) {
    super(scope);
  }

  async provision(): Promise<StateStoreProxy.Dispatch> {
    const db = await createDatabase(this.options);
    const operations = new SQLiteStateStoreOperations(db, {
      chain: this.scope.chain,
    });
    return operations.dispatch.bind(operations);
  }
}

const createDatabase = memoize(
  async (options: SQLiteStateStoreOptions | undefined) => {
    switch (options?.engine) {
      case "bun":
        return await createBunSQLiteDatabase(options);
      case "libsql":
        return await createLibSQLDatabase(options);
      default: {
        return await createDefaultDatabase(options?.filename);
      }
    }
  },
);

async function createDefaultDatabase(filename: string | undefined) {
  if ("Bun" in globalThis) {
    return createBunSQLiteDatabase({ engine: "bun", filename });
  }
  return createLibSQLDatabase({ engine: "libsql", filename });
}

async function createBunSQLiteDatabase(
  options: BunSQLiteStateStoreOptions | undefined,
) {
  if (!("Bun" in globalThis)) {
    throw new Error(
      "[SQLiteStateStore] The `engine: 'bun'` option is only available in Bun. Please use `engine: 'libsql'` instead.",
    );
  }

  const filename =
    options?.filename ??
    process.env.ALCHEMY_STATE_FILE ??
    ".alchemy/state.sqlite";
  ensureDirectory(filename);
  const { Database } = await import("bun:sqlite");
  const { drizzle } = await import("drizzle-orm/bun-sqlite").catch(() => {
    throw new Error(
      "[SQLiteStateStore] Missing `drizzle-orm` peer dependency. Please `bun install drizzle-orm`.",
    );
  });
  const { migrate } = await import("drizzle-orm/bun-sqlite/migrator");
  // Bun's constructor throws if we pass in an empty object or if extraneous
  // options are passed in, so here's some ugly destructuring!
  const { engine: _engine, filename: _filename, ...rest } = options ?? {};
  const bunOptions = Object.keys(rest).length > 0 ? rest : undefined;
  const client = new Database(filename, bunOptions);
  client.exec("PRAGMA journal_mode = WAL;");
  const db = drizzle(client, {
    schema,
  });
  migrate(db, { migrationsFolder: MIGRATIONS_DIRECTORY });
  return db;
}

async function createLibSQLDatabase(
  options: LibSQLStateStoreOptions | undefined,
) {
  const url =
    options?.url ??
    `file:${options?.filename ?? process.env.ALCHEMY_STATE_FILE ?? ".alchemy/state.sqlite"}`;
  const filename = url.startsWith("file:") ? url.slice(5) : undefined;
  if (filename) {
    ensureDirectory(filename);
  }
  const { createClient } = await import("@libsql/client").catch(() => {
    throw new Error(
      "[SQLiteStateStore] Missing `@libsql/client` peer dependency. Please `npm install @libsql/client`.",
    );
  });
  const { drizzle } = await import("drizzle-orm/libsql").catch(() => {
    throw new Error(
      "[SQLiteStateStore] Missing `drizzle-orm` peer dependency. Please `npm install drizzle-orm`.",
    );
  });
  const { migrate } = await import("drizzle-orm/libsql/migrator");
  const client = createClient({ url, ...options });
  await client.execute("PRAGMA journal_mode = WAL;");
  const db = drizzle(client, {
    schema,
  });
  await migrate(db, { migrationsFolder: MIGRATIONS_DIRECTORY });
  return db;
}

const ensureDirectory = (filename: string) => {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

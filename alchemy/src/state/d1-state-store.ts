import { drizzle, type RemoteCallback } from "drizzle-orm/sqlite-proxy";
import assert from "node:assert";
import { extractCloudflareResult } from "../cloudflare/api-response.ts";
import type { CloudflareApi, CloudflareApiOptions } from "../cloudflare/api.ts";
import type { Scope } from "../scope.ts";
import { memoize } from "../util/memoize.ts";
import { MIGRATIONS_DIRECTORY } from "./migrations.ts";
import { SQLiteStateStoreOperations } from "./operations.ts";
import { StateStoreProxy } from "./proxy.ts";
import * as schema from "./schema.ts";

export interface D1StateStoreOptions extends CloudflareApiOptions {
  databaseName?: string;
}

export class D1StateStore extends StateStoreProxy {
  constructor(
    scope: Scope,
    private options: D1StateStoreOptions = {},
  ) {
    super(scope);
  }

  async provision(): Promise<StateStoreProxy.Dispatch> {
    const db = await createDatabaseClient(this.options);
    const operations = new SQLiteStateStoreOperations(db, {
      chain: this.scope.chain,
    });
    return operations.dispatch.bind(operations);
  }
}

const createDatabaseClient = memoize(async (options: D1StateStoreOptions) => {
  const { createCloudflareApi } = await import("../cloudflare/api.ts");
  const api = await createCloudflareApi(options);
  const database = await upsertDatabase(
    api,
    options.databaseName ?? "alchemy-state",
  );
  const remoteCallback: RemoteCallback = async (sql, params) => {
    const [result] = await extractCloudflareResult<
      {
        results: { columns: string[]; rows: any[][] };
      }[]
    >(
      "execute D1 query",
      api.post(
        `/accounts/${api.accountId}/d1/database/${database.id}/raw`,
        { sql, params },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );
    assert(result, "Missing result");
    return {
      rows: Object.values(result.results.rows),
    };
  };
  return drizzle(remoteCallback, {
    schema,
  });
});

const upsertDatabase = async (api: CloudflareApi, databaseName: string) => {
  const { listDatabases, createDatabase } = await import(
    "../cloudflare/d1-database.ts"
  );
  const { applyMigrations, listMigrationsFiles } = await import(
    "../cloudflare/d1-migrations.ts"
  );
  const migrate = async (databaseId: string) => {
    await applyMigrations({
      migrationsFiles: await listMigrationsFiles(MIGRATIONS_DIRECTORY),
      migrationsTable: "migrations",
      accountId: api.accountId,
      databaseId,
      api,
      quiet: true,
    });
  };
  const databases = await listDatabases(api, databaseName);
  if (databases[0]) {
    await migrate(databases[0].id);
    return {
      id: databases[0].id,
    };
  }
  const res = await createDatabase(api, databaseName, {
    readReplication: { mode: "disabled" },
  });
  assert(res.result.uuid, "Missing UUID for database");
  await migrate(res.result.uuid);
  return {
    id: res.result.uuid,
  };
};

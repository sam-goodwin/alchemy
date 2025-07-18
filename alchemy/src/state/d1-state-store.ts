import { drizzle, type RemoteCallback } from "drizzle-orm/sqlite-proxy";
import assert from "node:assert";
import { extractCloudflareResult } from "../cloudflare/api-response.ts";
import type { CloudflareApi, CloudflareApiOptions } from "../cloudflare/api.ts";
import type { Scope } from "../scope.ts";
import { StateStore, type State } from "../state.ts";
import { memoize } from "../util/memoize.ts";

import { MIGRATIONS_DIRECTORY } from "./migrations.ts";
import { SQLiteStateStoreOperations } from "./operations.ts";
import * as schema from "./schema.ts";

export interface D1StateStoreOptions extends CloudflareApiOptions {
  databaseName?: string;
}

/**
 * @deprecated Use `CloudflareStateStore` from `alchemy/state` instead.
 */
export class D1StateStore extends StateStore {
  private operations?: Promise<SQLiteStateStoreOperations>;

  constructor(
    scope: Scope,
    private options: D1StateStoreOptions = {},
  ) {
    super(scope);
  }

  private async getOperations(): Promise<SQLiteStateStoreOperations> {
    if (!this.operations) {
      this.operations = this.provision();
    }
    return this.operations;
  }

  private async provision(): Promise<SQLiteStateStoreOperations> {
    const db = await createDatabaseClient(this.options);
    return new SQLiteStateStoreOperations(db, {
      chain: this.scope.chain,
    });
  }

  async init(): Promise<void> {
    const operations = await this.getOperations();
    return operations.dispatch("init", []);
  }

  async deinit(): Promise<void> {
    const operations = await this.getOperations();
    return operations.dispatch("deinit", []);
  }

  async listRaw(): Promise<string[]> {
    const operations = await this.getOperations();
    return operations.dispatch("list", []);
  }

  async countRaw(): Promise<number> {
    const operations = await this.getOperations();
    return operations.dispatch("count", []);
  }

  async getRaw(key: string): Promise<State | undefined> {
    const operations = await this.getOperations();
    return operations.dispatch("get", [key]);
  }

  async getBatchRaw(ids: string[]): Promise<Record<string, State>> {
    const operations = await this.getOperations();
    return operations.dispatch("getBatch", [ids]);
  }

  async allRaw(): Promise<Record<string, State>> {
    const operations = await this.getOperations();
    return operations.dispatch("all", []);
  }

  async setRaw(key: string, value: State): Promise<void> {
    const operations = await this.getOperations();
    return operations.dispatch("set", [key, value]);
  }

  async deleteRaw(key: string): Promise<void> {
    const operations = await this.getOperations();
    return operations.dispatch("delete", [key]);
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

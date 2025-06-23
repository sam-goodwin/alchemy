import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { ResourceScope } from "../resource.ts";
import type { Scope } from "../scope.ts";
import { serialize } from "../serde.ts";
import { deserializeState, type State, type StateStore } from "../state.ts";

export interface SqliteStateStoreOptions {
  /** Database file path (defaults to .alchemy/state-store.db) */
  databasePath?: string;
}

export class SqliteStateStore implements StateStore {
  private db: DatabaseSync | null = null;
  private readonly dbPath: string;
  private readonly scopePath: string;

  constructor(
    public readonly scope: Scope,
    options: SqliteStateStoreOptions = {},
  ) {
    this.dbPath = options.databasePath ?? ".alchemy/state-store.db";
    this.scopePath = scope.chain.join("/");
  }

  async init(): Promise<void> {
    if (this.db) return;

    // Ensure directory exists
    mkdirSync(dirname(this.dbPath), { recursive: true });

    // Open database
    this.db = new DatabaseSync(this.dbPath);

    // Create schema
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS alchemy_state (
        resource_id TEXT NOT NULL,
        scope_path TEXT NOT NULL,
        state_json TEXT NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
        PRIMARY KEY (resource_id, scope_path)
      );

      CREATE INDEX IF NOT EXISTS idx_alchemy_state_scope_path 
      ON alchemy_state(scope_path);
    `);
  }

  async deinit(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async list(): Promise<string[]> {
    await this.init();

    const stmt = this.db!.prepare(`
      SELECT resource_id FROM alchemy_state 
      WHERE scope_path = ?
    `);

    const rows = stmt.all(this.scopePath) as Array<{ resource_id: string }>;
    return rows.map((row) => row.resource_id);
  }

  async count(): Promise<number> {
    await this.init();

    const stmt = this.db!.prepare(`
      SELECT COUNT(*) as count FROM alchemy_state 
      WHERE scope_path = ?
    `);

    const result = stmt.get(this.scopePath) as { count: number };
    return result.count;
  }

  async get(key: string): Promise<State | undefined> {
    await this.init();

    const stmt = this.db!.prepare(`
      SELECT state_json FROM alchemy_state 
      WHERE resource_id = ? AND scope_path = ?
    `);

    const result = stmt.get(key, this.scopePath) as
      | { state_json: string }
      | undefined;

    if (!result) {
      return undefined;
    }

    const state = await deserializeState(this.scope, result.state_json);

    return {
      ...state,
      output: {
        ...(state.output || {}),
        [ResourceScope]: this.scope,
      },
    };
  }

  async getBatch(ids: string[]): Promise<Record<string, State>> {
    const result: Record<string, State> = {};

    const promises = ids.map(async (id) => {
      const state = await this.get(id);
      if (state) {
        result[id] = state;
      }
    });

    await Promise.all(promises);
    return result;
  }

  async all(): Promise<Record<string, State>> {
    const keys = await this.list();
    return this.getBatch(keys);
  }

  async set(key: string, value: State): Promise<void> {
    await this.init();

    const stateJson = JSON.stringify(
      await serialize(this.scope, value),
      null,
      2,
    );

    const stmt = this.db!.prepare(`
      INSERT OR REPLACE INTO alchemy_state 
      (resource_id, scope_path, state_json, updated_at) 
      VALUES (?, ?, ?, unixepoch())
    `);

    stmt.run(key, this.scopePath, stateJson);
  }

  async delete(key: string): Promise<void> {
    await this.init();

    const stmt = this.db!.prepare(`
      DELETE FROM alchemy_state 
      WHERE resource_id = ? AND scope_path = ?
    `);

    stmt.run(key, this.scopePath);
  }
}

import { and, eq, getTableColumns, inArray } from "drizzle-orm";
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import type { State, StateStore } from "../state.ts";
import { assertNever } from "../util/assert-never.ts";
import * as schema from "./schema.ts";

const { scope: _, ...columns } = getTableColumns(schema.resources);

type Database = BaseSQLiteDatabase<any, any, typeof schema>;

type StateStoreMethod = keyof Pick<
  StateStore,
  | "init"
  | "deinit"
  | "list"
  | "count"
  | "get"
  | "getBatch"
  | "all"
  | "set"
  | "delete"
>;

type StateStoreAPI = {
  init: { params: []; result: void };
  deinit: { params: []; result: void };
  list: { params: []; result: string[] };
  count: { params: []; result: number };
  get: { params: [key: string]; result: State | undefined };
  getBatch: { params: [ids: string[]]; result: Record<string, State> };
  all: { params: []; result: Record<string, State> };
  set: { params: [key: string, value: State]; result: void };
  delete: { params: [key: string]; result: void };
};

/**
 * Represents the SQL operations for a SQLite-backed state store.
 * DOES NOT include serialization/deserialization — that is handled by the StateStore class.
 */
export class SQLiteStateStoreOperations {
  constructor(
    private readonly db: Database,
    private readonly context: { chain: string[] },
  ) {}

  async dispatch<TMethod extends StateStoreMethod>(
    method: TMethod,
    params: StateStoreAPI[TMethod]["params"],
  ): Promise<StateStoreAPI[TMethod]["result"]> {
    switch (method) {
      case "init":
        return;
      case "deinit":
        return;
      case "list":
        return this.list();
      case "count":
        return this.count();
      case "get": {
        const [key] = params as StateStoreAPI["get"]["params"];
        return this.get(key);
      }
      case "getBatch": {
        const [keys] = params as StateStoreAPI["getBatch"]["params"];
        return this.getBatch(keys);
      }
      case "all":
        return this.all();
      case "set": {
        const [key, state] = params as StateStoreAPI["set"]["params"];
        return this.set(key, state);
      }
      case "delete": {
        const [key] = params as StateStoreAPI["delete"]["params"];
        return this.delete(key);
      }
      default:
        assertNever(method);
    }
  }

  async list() {
    const result = await this.db
      .select({ id: schema.resources.id })
      .from(schema.resources)
      .where(eq(schema.resources.scope, this.context.chain));
    return result.map((r) => r.id);
  }
  async count() {
    const result = await this.db.$count(
      this.db
        .select()
        .from(schema.resources)
        .where(eq(schema.resources.scope, this.context.chain)),
    );
    return result;
  }
  async get(key: string) {
    const [result] = await this.db
      .select(columns)
      .from(schema.resources)
      .where(
        and(
          eq(schema.resources.scope, this.context.chain),
          eq(schema.resources.id, key),
        ),
      );
    if (!result) {
      return undefined;
    }
    return {
      ...result,
      props: result.props ?? undefined,
      oldProps: result.oldProps ?? undefined,
    };
  }
  async all() {
    const result = await this.db
      .select(columns)
      .from(schema.resources)
      .where(eq(schema.resources.scope, this.context.chain));
    const record: Record<string, State> = {};
    for (const r of result) {
      record[r.id] = {
        ...r,
        props: r.props ?? undefined,
        oldProps: r.oldProps ?? undefined,
      };
    }
    return record;
  }
  async set(_key: string, state: State) {
    await this.db
      .insert(schema.resources)
      .values({
        ...state,
        scope: this.context.chain,
      })
      .onConflictDoUpdate({
        target: [schema.resources.id, schema.resources.scope],
        set: {
          ...state,
        },
      });
  }
  async delete(key: string) {
    await this.db
      .delete(schema.resources)
      .where(
        and(
          eq(schema.resources.scope, this.context.chain),
          eq(schema.resources.id, key),
        ),
      );
  }
  async getBatch(keys: string[]) {
    const result = await this.db
      .select(columns)
      .from(schema.resources)
      .where(
        and(
          eq(schema.resources.scope, this.context.chain),
          inArray(schema.resources.id, keys),
        ),
      );
    const record: Record<string, State> = {};
    for (const r of result) {
      record[r.id] = {
        ...r,
        props: r.props ?? undefined,
        oldProps: r.oldProps ?? undefined,
      };
    }
    return record;
  }
}

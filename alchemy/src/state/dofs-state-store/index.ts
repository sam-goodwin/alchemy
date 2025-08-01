import { alchemy } from "../../alchemy.ts";
import {
  createCloudflareApi,
  type CloudflareApiOptions,
} from "../../cloudflare/api.ts";
import { getAccountSubdomain } from "../../cloudflare/worker-subdomain.ts";
import { ResourceScope } from "../../resource.ts";
import type { Scope } from "../../scope.ts";
import { deserialize, serialize } from "../../serde.ts";
import type { State, StateStore } from "../../state.ts";
import { DOFSStateStoreClient, upsertStateStoreWorker } from "./store.ts";

export interface DOFSStateStoreOptions extends CloudflareApiOptions {
  /**
   * The prefix to use for state keys.
   * Each app and stage has its own state store, so this is primarily for testing.
   * @default "alchemy"
   */
  prefix?: string;
  worker?:
    | {
        /**
         * The name of the worker to use
         * @default "alchemy-state"
         */
        name?: string;
        /**
         * The token to use for the worker
         * @default the value of the ALCHEMY_STATE_TOKEN environment variable
         */
        token?: string;
        /**
         * Whether to force the creation of a new worker
         */
        force?: boolean;
      }
    | {
        /**
         * The URL of an existing state store worker to use
         */
        url: string;
        /**
         * The token to use for the worker
         * @default the value of the ALCHEMY_STATE_TOKEN environment variable
         */
        token?: string;
      };
}

/**
 * A state store backed by a {@link https://www.npmjs.com/package/dofs Durable Object File System (DOFS)}.
 *
 * @deprecated This state store is no longer recommended for production use. Please use {@link https://alchemy.run/guides/cloudflare-state-store/ CloudflareStateStore} from `alchemy/state` instead, which offers better reliability and performance.
 */
export class DOFSStateStore implements StateStore {
  private prefix: string;
  private client?: Promise<DOFSStateStoreClient>;

  constructor(
    private readonly scope: Scope,
    private readonly options: DOFSStateStoreOptions = {},
  ) {
    this.prefix = [options.prefix ?? "alchemy", ...scope.chain, ""].join("/");
  }

  private async createClient() {
    const token =
      this.options.worker?.token ??
      (await alchemy.secret.env.ALCHEMY_STATE_TOKEN).unencrypted;
    if (this.options.worker && "url" in this.options.worker) {
      const client = new DOFSStateStoreClient({
        app: this.scope.appName ?? "alchemy",
        stage: this.scope.stage,
        url: this.options.worker.url,
        token,
      });
      // The worker is already created and should be ready to use.
      // If it's not, we'll fail fast with a helpful error message.
      const res = await client.validate();
      if (res.status === 200) {
        return client;
      }
      if (res.status === 401) {
        throw new Error(
          "A worker URL was provided to DOFSStateStore, but the token is incorrect. Correct the token or remove the worker URL to create a new worker.",
        );
      }
      throw new Error(
        `A worker URL was provided to DOFSStateStore, but the worker status is ${res.status} ${res.statusText}.`,
      );
    }
    const workerName = this.options.worker?.name ?? "alchemy-state";
    const api = await createCloudflareApi(this.options);
    const [subdomain, _] = await Promise.all([
      getAccountSubdomain(api),
      upsertStateStoreWorker(
        api,
        workerName,
        token,
        this.options.worker?.force ?? false,
      ),
    ]);
    if (!subdomain) {
      throw new Error(
        "Failed to access state store worker because the workers.dev subdomain is not available.",
      );
    }
    const client = new DOFSStateStoreClient({
      app: this.scope.appName ?? "alchemy",
      stage: this.scope.stage,
      url: `https://${workerName}.${subdomain}.workers.dev`,
      token,
    });
    await client.waitUntilReady();
    return client;
  }

  private async getClient() {
    this.client ??= this.createClient();
    return await this.client;
  }

  async init() {
    await this.getClient();
  }

  async list(): Promise<string[]> {
    const client = await this.getClient();
    const res = await client.rpc("list", { prefix: this.prefix });
    return res.map((key) => this.deserializeKey(key));
  }

  async count(): Promise<number> {
    const client = await this.getClient();
    const res = await client.rpc("count", { prefix: this.prefix });
    return res;
  }

  async get(key: string): Promise<State | undefined> {
    const client = await this.getClient();
    const res = await client.rpc("get", { key: this.serializeKey(key) });
    if (res) {
      return await this.deserializeState(res);
    }
    return undefined;
  }

  async getBatch(ids: string[]): Promise<Record<string, State>> {
    const client = await this.getClient();
    const res = await client.rpc("getBatch", {
      keys: ids.map((id) => this.serializeKey(id)),
    });
    return await this.deserializeStates(res);
  }

  async all(): Promise<Record<string, State>> {
    const client = await this.getClient();
    const res = await client.rpc("all", { prefix: this.prefix });
    return await this.deserializeStates(res);
  }

  async set(key: string, value: State): Promise<void> {
    const client = await this.getClient();
    await client.rpc("set", {
      key: this.serializeKey(key),
      value: await serialize(this.scope, value),
    });
  }

  async delete(key: string): Promise<void> {
    const client = await this.getClient();
    await client.rpc("delete", { key: this.serializeKey(key) });
  }

  private async deserializeStates(
    input: Record<string, string>,
  ): Promise<Record<string, State>> {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(input).map(async ([key, value]) => [
          this.deserializeKey(key),
          await this.deserializeState(value),
        ]),
      ),
    );
  }

  private async deserializeState(input: string): Promise<State> {
    const state = (await deserialize(this.scope, JSON.parse(input))) as State;
    if (state.output === undefined) {
      state.output = {} as any;
    }
    state.output[ResourceScope] = this.scope;
    return state;
  }

  private deserializeKey(key: string): string {
    return key.replace(this.prefix, "").replaceAll(":", "/");
  }

  private serializeKey(key: string): string {
    return `${this.prefix}${key.replaceAll("/", ":")}`;
  }
}

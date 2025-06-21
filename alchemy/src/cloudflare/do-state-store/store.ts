import { alchemy } from "../../alchemy.ts";
import { ResourceScope } from "../../resource.ts";
import type { Scope } from "../../scope.ts";
import type { State, StateStore } from "../../state.ts";
import { deserializeState } from "../../state.ts";
import { createCloudflareApi, type CloudflareApiOptions } from "../api.ts";
import { getAccountSubdomain } from "../worker/subdomain.ts";
import { DOStateStoreClient, upsertStateStoreWorker } from "./internal.ts";

export interface DOStateStoreOptions extends CloudflareApiOptions {
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

export class DOStateStore implements StateStore {
  private prefix: string;
  private client?: Promise<DOStateStoreClient>;

  constructor(
    private readonly scope: Scope,
    private readonly options: DOStateStoreOptions = {},
  ) {
    this.prefix = [options.prefix ?? "alchemy", ...scope.chain, ""].join("/");
  }

  private async createClient() {
    const token =
      this.options.worker?.token ??
      (await alchemy.secret.env.ALCHEMY_STATE_TOKEN).unencrypted;
    if (this.options.worker && "url" in this.options.worker) {
      const client = new DOStateStoreClient({
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
          "A worker URL was provided to DOStateStore, but the token is incorrect. Correct the token or remove the worker URL to create a new worker.",
        );
      }
      throw new Error(
        `A worker URL was provided to DOStateStore, but the worker status is ${res.status} ${res.statusText}.`,
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
    const client = new DOStateStoreClient({
      app: this.scope.appName ?? "alchemy",
      stage: this.scope.stage,
      url: `https://${workerName}.${subdomain}.workers.dev`,
      token,
    });
    // This ensures the token is correct and the worker is ready to use.
    let last: Response | undefined;
    let delay = 1000;
    for (let i = 0; i < 20; i++) {
      const res = await client.validate();
      if (res.ok) {
        return client;
      }
      if (!last) {
        console.log("Waiting for state store deployment...");
      }
      last = res;
      // Exponential backoff with jitter
      const jitter = Math.random() * 0.1 * delay;
      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
      delay *= 1.5; // Increase the delay for next attempt
      delay = Math.min(delay, 10000); // Cap at 10 seconds
    }
    throw new Error(
      `Failed to access state store: ${last?.status} ${last?.statusText}`,
    );
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
    await client.rpc("set", { key: this.serializeKey(key), value });
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
    const state = await deserializeState(this.scope, input);
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

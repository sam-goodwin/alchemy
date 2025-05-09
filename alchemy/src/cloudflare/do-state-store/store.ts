import type { Scope } from "../../scope.js";
import { serialize } from "../../serde.js";
import type { State, StateStore } from "../../state.js";

/**
 * Options for DOStateStore
 */
export interface DOStateStoreOptions {
  /**
   * The URL of the Durable Object Worker
   */
  url: string;

  /**
   * Optional authentication token for requests
   */
  token?: string;
}

/**
 * State store implementation using Cloudflare Durable Objects with SQLite storage
 */
export class DOStateStore implements StateStore {
  private readonly cache: Map<string, State>;

  /**
   * Create a new DOStateStore
   *
   * @param scope The scope this store belongs to
   * @param options Options for the state store
   */
  constructor(
    public readonly scope: Scope,
    private readonly options: DOStateStoreOptions,
  ) {
    this.cache = new Map<string, State>();
  }

  async init(): Promise<void> {
    // TODO(sam): create worker if it doesn't exist
  }

  async deinit(): Promise<void> {}

  async fetch(url: string, init?: RequestInit): Promise<Response> {
    const maxRetries = 10;
    let retries = 0;
    let delay = 30;
    let response: Response;
    while (retries < maxRetries) {
      response = await fetch(
        `${this.options.url}/${this.scope.chain.join("/")}/${url}`,
        {
          ...init,
          headers: {
            ...init?.headers,
            "Content-Type": "application/json",
            // TODO: some auth header
          },
        },
      );
      if (response.ok) {
        return response;
      }
      if (
        response.status === 429 ||
        response.status === 500 ||
        response.status === 503
      ) {
        delay *= 2;
        retries += 1;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error(`Failed to fetch ${url}: ${response!.statusText}`);
  }

  async all(): Promise<Record<string, State>> {
    return this.getBatch(await this.list());
  }

  async list(): Promise<string[]> {
    const keys: string[] = await this.fetch("?operation=list").then((res) =>
      res.json(),
    );
    return keys.map(deserializeKey);
  }

  async count(): Promise<number> {
    return (await this.list()).length;
  }

  async get(key: string): Promise<State | undefined> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const res = await this.fetch(serializeKey(key));
    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  }

  async getBatch(ids: string[]): Promise<Record<string, State>> {
    return Object.fromEntries(
      (
        await Promise.all(
          ids.map(async (id) => {
            const state = await this.get(id);
            if (state) {
              return [id, state];
            }
          }),
        )
      ).filter((s) => s !== undefined),
    );
  }

  async set(key: string, value: State): Promise<void> {
    await this.fetch(serializeKey(key), {
      method: "PUT",
      body: JSON.stringify(await serialize(this.scope, value)),
    });
    this.cache.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.fetch(serializeKey(key), {
      method: "DELETE",
    });
    this.cache.delete(key);
  }
}

function serializeKey(key: string): string {
  return key.replaceAll("/", ":");
}

function deserializeKey(key: string): string {
  return key.replaceAll(":", "/");
}

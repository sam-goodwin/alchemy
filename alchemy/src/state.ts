import fs from "node:fs";
import path from "node:path";
import type { Resource, ResourceProps } from "./resource";
import type { Scope } from "./scope";
import { ignore } from "./util/ignore";
import { deserialize, serialize } from "./util/serde";

export interface State<
  Kind extends string = string,
  Props extends ResourceProps | undefined = ResourceProps | undefined,
  Out extends Resource = Resource,
> {
  status:
    | `creating`
    | `created`
    | `updating`
    | `updated`
    | `deleting`
    | `deleted`;
  kind: Kind;
  id: string;
  fqn: string;
  seq: number;
  data: Record<string, any>;
  // deps: string[];
  props: Props;
  oldProps?: Props;
  output: Out;
}

export type StateStoreType = new (scope: Scope) => StateStore;

export interface StateStore {
  /** Initialize the state container if one is required */
  init?(): Promise<void>;
  /** Delete the state container if one exists */
  deinit?(): Promise<void>;
  /** List all resources in the given stage. */
  list(): Promise<string[]>;
  /** Return the number of items let in this store */
  count(): Promise<number>;
  get(key: string): Promise<State | undefined>;
  getBatch(ids: string[]): Promise<Record<string, State>>;
  all(): Promise<Record<string, State>>;
  set(key: string, value: State): Promise<void>;
  delete(key: string): Promise<void>;
}

const stateRootDir = path.join(process.cwd(), ".alchemy");

export class FileSystemStateStore implements StateStore {
  public readonly dir: string;
  constructor(public readonly scope: Scope) {
    this.dir = path.join(stateRootDir, ...scope.chain);
  }

  async init(): Promise<void> {
    await fs.promises.mkdir(stateRootDir, { recursive: true });
    await fs.promises.mkdir(this.dir, { recursive: true });
  }

  async deinit(): Promise<void> {
    await ignore("ENOENT", () => fs.promises.rmdir(this.dir));
  }

  async count(): Promise<number> {
    return Object.keys(await this.list()).length;
  }

  async list(): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(this.dir, {
        withFileTypes: true,
      });
      return files
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json"))
        .map((dirent) => dirent.name.replace(/\.json$/, ""));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async get(key: string): Promise<State | undefined> {
    try {
      const content = await fs.promises.readFile(
        await this.getPath(key),
        "utf8",
      );
      const state = (await deserialize(
        this.scope,
        JSON.parse(content),
      )) as State;
      if (state.output === undefined) {
        state.output = {} as any;
      }
      state.output.Scope = this.scope;
      return state;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return undefined;
      }
      throw error;
    }
  }

  async set(key: string, value: State): Promise<void> {
    return fs.promises.writeFile(
      await this.getPath(key),
      JSON.stringify(await serialize(this.scope, value), null, 2),
    );
  }

  async delete(key: string): Promise<void> {
    return fs.promises.unlink(await this.getPath(key));
  }

  async all(): Promise<Record<string, State>> {
    return this.getBatch(await this.list());
  }

  async getBatch(ids: string[]): Promise<Record<string, State>> {
    return Object.fromEntries(
      (
        await Promise.all(
          Array.from(ids).flatMap(async (id) => {
            const s = await this.get(id);
            if (s === undefined) {
              return [] as const;
            }
            return [[id, s]] as const;
          }),
        )
      ).flat(),
    );
  }

  private async getPath(key: string): Promise<string> {
    const file = path.join(this.dir, `${key}.json`);
    const dir = path.dirname(file);
    await fs.promises.mkdir(dir, { recursive: true });
    return file;
  }
}

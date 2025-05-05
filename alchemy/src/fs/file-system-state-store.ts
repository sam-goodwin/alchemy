import fs from "node:fs";
import path from "node:path";
import type { Scope } from "../scope.js";
import { deserialize, serialize } from "../serde.js";
import type { State, StateStore } from "../state.js";
import { ignore } from "../util/ignore.js";

const stateRootDir = path.join(process.cwd(), ".alchemy");

export class FileSystemStateStore implements StateStore {
  public readonly dir: string;
  private initialized = false;
  constructor(public readonly scope: Scope) {
    this.dir = path.join(stateRootDir, ...scope.chain);
  }

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
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
        .map((dirent) => dirent.name.replace(/\.json$/, ""))
        .map((key) => key.replaceAll(":", "/"));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async get(key: string): Promise<State | undefined> {
    try {
      const content = await fs.promises.readFile(this.getPath(key), "utf8");
      const state = (await deserialize(
        this.scope,
        JSON.parse(content),
      )) as State;
      if (state.output === undefined) {
        state.output = {} as any;
      }
      return state;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return undefined;
      }
      throw error;
    }
  }

  async set(key: string, value: State): Promise<void> {
    await this.init();
    await fs.promises.writeFile(
      this.getPath(key),
      JSON.stringify(await serialize(this.scope, value), null, 2),
    );
  }

  async delete(key: string): Promise<void> {
    try {
      return await fs.promises.unlink(this.getPath(key));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return;
      }
      throw error;
    }
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

  private getPath(key: string): string {
    if (key.includes(":")) {
      throw new Error(`ID cannot include colons: ${key}`);
    }
    if (key.includes("/")) {
      key = key.replaceAll("/", ":");
    }
    return path.join(this.dir, `${key}.json`);
  }
}

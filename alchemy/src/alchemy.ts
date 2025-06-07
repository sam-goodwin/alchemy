import fs from "node:fs/promises";
import path from "node:path";

import { DestroyedSignal, destroy } from "./destroy.ts";
import { env } from "./env.ts";
import {
  type PendingResource,
  ResourceFQN,
  ResourceID,
  ResourceKind,
  ResourceScope,
  ResourceSeq,
} from "./resource.ts";
import { isRuntime } from "./runtime/global.ts";
import { Scope } from "./scope.ts";
import { secret } from "./secret.ts";
import type { StateStoreType } from "./state.ts";

/**
 * Type alias for semantic highlighting of `alchemy` as a type keyword
 */
export type alchemy = Alchemy;

export const alchemy: Alchemy = _alchemy as any;

/**
 * The Alchemy interface provides core functionality and is augmented by providers.
 * Supports both application scoping with secrets and template string interpolation.
 *
 * @example
 * // Create an application scope with stage and secret handling
 * const app = await alchemy("github:alchemy", {
 *   stage: "prod",
 *   phase: "up",
 *   // Required for encrypting/decrypting secrets
 *   password: process.env.SECRET_PASSPHRASE
 * });
 *
 * // Create a resource with encrypted secrets
 * const resource = await Resource("my-resource", {
 *   apiKey: alchemy.secret(process.env.API_KEY)
 * });
 *
 * await app.finalize();
 */
export interface Alchemy {
  run: typeof run;
  destroy: typeof destroy;

  /**
   * Get an environment variable and error if it's not set.
   */
  env: typeof env;

  /**
   * Creates an encrypted secret that can be safely stored in state files.
   * Requires a password to be set either globally in the application options
   * or locally in the current scope.
   */
  secret: typeof secret;
  /**
   * Whether the current runtime is the Cloudflare Workers runtime.
   */
  isRuntime: boolean;

  /**
   * Creates a new application scope with the given name and options.
   * Used to create and manage resources with proper secret handling.
   *
   * @example
   * const app = await alchemy("my-app", {
   *   stage: "prod",
   *   // Required for encrypting/decrypting secrets
   *   password: process.env.SECRET_PASSPHRASE
   * });
   */
  (appName: string, options?: Omit<AlchemyOptions, "appName">): Promise<Scope>;
  /**
   * Template literal tag that supports file interpolation for documentation.
   * Automatically formats the content and appends file contents as code blocks.
   *
   * @example
   * // Generate documentation using file contents
   * await Document("api-docs", {
   *   prompt: await alchemy`
   *     Generate docs using the contents of:
   *     ${alchemy.file("README.md")}
   *     ${alchemy.file("./.cursorrules")}
   *
   *     And here are the source files:
   *     ${alchemy.files(files)}
   *   `
   * });
   */
  (template: TemplateStringsArray, ...values: any[]): Promise<string>;
}

_alchemy.destroy = destroy;
_alchemy.run = run;
_alchemy.secret = secret;
_alchemy.env = env;
_alchemy.isRuntime = isRuntime;

/**
 * Implementation of the alchemy function that handles both application scoping
 * and template string interpolation.
 */
async function _alchemy(
  ...args:
    | [template: TemplateStringsArray, ...values: any[]]
    | [appName: string, options?: Omit<AlchemyOptions, "appName">]
): Promise<Scope | string | never> {
  if (typeof args[0] === "string") {
    const [appName, options] = args as [string, AlchemyOptions?];
    const phase = options?.phase ?? "up";
    const root = new Scope({
      ...options,
      appName,
      stage: options?.stage ?? process.env.ALCHEMY_STAGE,
      phase: isRuntime ? "read" : phase,
      password: options?.password ?? process.env.ALCHEMY_PASSWORD,
    });
    try {
      Scope.storage.enterWith(root);
    } catch {
      // we are in Cloudflare Workers, we will emulate the enterWith behavior
      // see Scope.finalize for where we pop the global scope
      Scope.globals.push(root);
    }
    if (options?.phase === "destroy") {
      await destroy(root);
      return process.exit(0);
    }
    return root;
  }
  const [template, ...values] = args;
  const [, secondLine] = template[0].split("\n");
  const leadingSpaces = secondLine
    ? secondLine.match(/^(\s*)/)?.[1]?.length || 0
    : 0;
  const indent = " ".repeat(leadingSpaces);

  const [{ isFileRef }, { isFileCollection }] = await Promise.all([
    import("./fs/file-ref.js"),
    import("./fs/file-collection.js"),
  ]);

  const appendices: Record<string, string> = {};

  const stringValues = await Promise.all(
    values.map(async function resolve(value): Promise<string> {
      if (typeof value === "string") {
        return indent + value;
      }
      if (value === null) {
        return "null";
      }
      if (value === undefined) {
        return "undefined";
      }
      if (
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "bigint"
      ) {
        return value.toString();
      }
      if (value instanceof Promise) {
        return resolve(await value);
      }
      if (isFileRef(value)) {
        if (!(value.path in appendices)) {
          appendices[value.path] = await fs.readFile(value.path, "utf-8");
        }
        return `[${path.basename(value.path)}](${value.path})`;
      }
      if (isFileCollection(value)) {
        return Object.entries(value.files)
          .map(([filePath, content]) => {
            appendices[filePath] = content;
            return `[${path.basename(filePath)}](${filePath})`;
          })
          .join("\n\n");
      }
      if (Array.isArray(value)) {
        return (
          await Promise.all(
            value.map(async (value, i) => `${i}. ${await resolve(value)}`),
          )
        ).join("\n");
      }
      if (typeof value === "object" && typeof value.path === "string") {
        if (typeof value.content === "string") {
          appendices[value.path] = value.content;
          return `[${path.basename(value.path)}](${value.path})`;
        }
        appendices[value.path] = await fs.readFile(value.path, "utf-8");
        return `[${path.basename(value.path)}](${value.path})`;
      }
      if (typeof value === "object") {
        return (
          await Promise.all(
            Object.entries(value).map(async ([key, value]) => {
              return `* ${key}: ${await resolve(value)}`;
            }),
          )
        ).join("\n");
      }
      // TODO: support other types
      console.log(value);
      throw new Error(`Unsupported value type: ${value}`);
    }),
  );

  // Construct the string template by joining template parts with interpolated values
  const lines = template
    .map((part) =>
      part
        .split("\n")
        .map((line) =>
          line.startsWith(indent) ? line.slice(indent.length) : line,
        )
        .join("\n"),
    )
    .flatMap((part, i) =>
      i < stringValues.length ? [part, stringValues[i] ?? ""] : [part],
    )
    .join("")
    .split("\n");

  // Collect and sort appendices by file path
  return [
    // format the user prompt and trim the first line if it's empty
    lines.length > 1 && lines[0].replaceAll(" ", "").length === 0
      ? lines.slice(1).join("\n")
      : lines.join("\n"),

    // sort appendices by path and include at the end of the prompt
    Object.entries(appendices)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([filePath, content]) => {
        const extension = path.extname(filePath).slice(1);
        const codeTag = extension ? extension : "";
        return `// ${filePath}\n\`\`\`${codeTag}\n${content}\n\`\`\``;
      })
      .join("\n\n"),
  ].join("\n");
}

export type Phase = "up" | "destroy" | "read";

export interface AlchemyOptions {
  /**
   * The name of the application.
   */
  appName?: string;
  /**
   * Determines whether the resources will be created/updated or deleted.
   *
   * @default "up"
   */
  phase?: Phase;
  /**
   * Name to scope the resource state under (e.g. `.alchemy/{stage}/..`).
   *
   * @default - your POSIX username
   */
  stage?: string;
  /**
   * If true, will not prune resources that were dropped from the root stack.
   *
   * @default true
   */
  destroyOrphans?: boolean;
  /**
   * A custom state store to use instead of the default file system store.
   */
  stateStore?: StateStoreType;
  /**
   * A custom scope to use as a parent.
   */
  parent?: Scope;
  /**
   * If true, will not print any Create/Update/Delete messages.
   *
   * @default false
   */
  quiet?: boolean;
  /**
   * A passphrase to use to encrypt/decrypt secrets.
   * Required if using alchemy.secret() in this scope.
   */
  password?: string;

  /**
   * If true, some resources will switch their behavior to a local dev-friendly mode.
   *
   * @default false
   */
  dev?: boolean;
}

export interface ScopeOptions extends AlchemyOptions {
  enter: boolean;
}

export interface RunOptions extends AlchemyOptions {
  /**
   * @default false
   */
  // TODO(sam): this is an awful hack to differentiate between naked scopes and resources
  isResource?: boolean;
}

/**
 * Run a function in a new scope asynchronously.
 * Useful for isolating secret handling with a specific password.
 *
 * @example
 * // Run operations in a scope with its own password
 * await alchemy.run("secure-scope", {
 *   password: process.env.SCOPE_PASSWORD
 * }, async () => {
 *   // Secrets in this scope will use this password
 *   const resource = await Resource("my-resource", {
 *     apiKey: alchemy.secret(process.env.API_KEY)
 *   });
 * });
 */
async function run<T>(
  ...args:
    | [id: string, fn: (this: Scope, scope: Scope) => Promise<T>]
    | [
        id: string,
        options: RunOptions,
        fn: (this: Scope, scope: Scope) => Promise<T>,
      ]
): Promise<T> {
  const [id, options, fn] =
    typeof args[1] === "function"
      ? [args[0], undefined, args[1]]
      : (args as [
          string,
          RunOptions,
          (this: Scope, scope: Scope) => Promise<T>,
        ]);
  const _scope = new Scope({
    ...options,
    scopeName: id,
  });
  try {
    if (options?.isResource !== true && _scope.parent) {
      // TODO(sam): this is an awful hack to differentiate between naked scopes and resources
      const seq = _scope.parent.seq();
      const output = {
        [ResourceID]: id,
        [ResourceFQN]: "",
        [ResourceKind]: Scope.KIND,
        [ResourceScope]: _scope,
        [ResourceSeq]: seq,
      } as const;
      const resource = {
        kind: Scope.KIND,
        id,
        seq,
        data: {},
        fqn: "",
        props: {},
        status: "created",
        output,
      } as const;
      const prev = await _scope.parent!.state.get(id);
      if (!prev) {
        await _scope.parent!.state.set(id, resource);
      } else if (prev.kind !== Scope.KIND) {
        throw new Error(
          `Tried to create a Scope that conflicts with a Resource (${prev.kind}): ${id}`,
        );
      }
      _scope.parent!.resources.set(
        id,
        Object.assign(Promise.resolve(resource), output) as PendingResource,
      );
    }
    return await _scope.run(async () => fn.bind(_scope)(_scope));
  } catch (error) {
    if (!(error instanceof DestroyedSignal)) {
      _scope.fail();
    }
    throw error;
  } finally {
    await _scope.finalize();
  }
}

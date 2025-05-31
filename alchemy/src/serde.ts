import { decryptWithKey, encryptSecure } from "./encrypt.ts";
import {
  InnerResourceScope,
  ResourceFQN,
  ResourceKind,
  type Resource,
} from "./resource.ts";
import { Scope } from "./scope.ts";
import { Secret } from "./secret.ts";

import type { Type } from "arktype";

// zero-dependency type guard for ArkType
function isType(value: any): value is Type<any, any> {
  return (
    value &&
    typeof value === "object" &&
    typeof value.toJsonSchema === "function"
  );
}

export type Serialized<T> = T extends
  | undefined
  | null
  | boolean
  | number
  | string
  | bigint
  ? T
  : T extends Type<any, any>
    ? {
        "@schema": string;
      }
    : T extends Secret
      ? {
          "@secret": string;
        }
      : T extends Date
        ? {
            "@date": string;
          }
        : T extends Symbol
          ? {
              "@symbol": string;
            }
          : T extends Scope
            ? {
                "@scope": null;
              }
            : T extends Function
              ? undefined
              : T extends Array<infer U>
                ? Array<Serialized<U>>
                : T extends object
                  ? {
                      [K in keyof T as K extends symbol
                        ? string
                        : K]: Serialized<T[K]>;
                    }
                  : T;

export type SerializedScope = {
  [fqn: ResourceFQN]: Serialized<Resource>;
};

export async function serializeScope(scope: Scope): Promise<SerializedScope> {
  const map: SerializedScope = {};

  return serializeScope(scope);

  async function serializeScope(scope: Scope): Promise<SerializedScope> {
    await Promise.all(
      Array.from(scope.resources.values()).map(async (resource) => {
        if (resource[ResourceKind] === Scope.KIND) {
          return;
        }
        map[resource[ResourceFQN]] = await serialize(scope, await resource, {
          transform: (value) => {
            if (value instanceof Secret) {
              return {
                "@secret-env": value.name,
              };
            }
            return value;
          },
        });
        const innerScope = await resource[InnerResourceScope];
        if (innerScope) {
          await serializeScope(innerScope);
        }
      }),
    );
    await Promise.all(
      Array.from(scope.children.values()).map((scope) => serializeScope(scope)),
    );
    return map;
  }
}

export async function serialize(
  scope: Scope,
  value: any,
  options?: {
    encrypt?: boolean;
    transform?: (value: any) => any;
  },
): Promise<any> {
  if (options?.transform) {
    value = options.transform(value);
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((value) => serialize(scope, value, options)));
  } else if (value instanceof Secret) {
    if (!scope.password) {
      throw new Error(
        "Cannot serialize secret without password, did you forget to set password when initializing your alchemy app?\n" +
          "See: https://alchemy.run/docs/concepts/secret.html#encryption-password",
      );
    }
    return {
      "@secret":
        options?.encrypt !== false
          ? await encryptSecure(value.unencrypted, scope.password)
          : value.unencrypted,
    };
  } else if (isType(value)) {
    return {
      "@schema": value.toJSON(),
    };
  } else if (value instanceof Date) {
    return {
      "@date": value.toISOString(),
    };
  } else if (typeof value === "symbol") {
    assertNotUniqueSymbol(value);
    return {
      "@symbol": value.toString(),
    };
  } else if (value instanceof Scope) {
    return {
      "@scope": null,
    };
  } else if (isImportMeta(value)) {
    // ImportMeta serialized as {}, so we are mapping it
    // TODO(sam):
    return Object.fromEntries(
      Object.keys(Object.getPrototypeOf(value))
        // exlcude import.meta.env
        .filter((prop) => prop === "env")
        .map((prop) => [prop, (value as any)[prop]]),
    );
  } else if (value && typeof value === "object") {
    for (const symbol of Object.getOwnPropertySymbols(value)) {
      assertNotUniqueSymbol(symbol);
    }
    return Object.fromEntries(
      await Promise.all(
        [...Object.getOwnPropertySymbols(value), ...Object.keys(value)].map(
          async (key) => [
            key.toString(),
            await serialize(scope, value[key], options),
          ],
        ),
      ),
    );
  } else if (typeof value === "function") {
    // can't serialize functions
    return undefined;
  }
  return value;
}

function isImportMeta(value: any): value is ImportMeta {
  return (
    value &&
    typeof value === "object" &&
    typeof value.dirname === "string" &&
    typeof value.filename === "string" &&
    typeof value.url === "string"
  );
}

export async function deserialize(
  scope: Scope,
  value: any,
  options?: {
    transform?: (value: any) =>
      | undefined
      | {
          value: any;
        };
  },
): Promise<any> {
  const replacement = options?.transform?.(value);
  if (replacement) {
    return replacement.value;
  }

  if (Array.isArray(value)) {
    return await Promise.all(
      value.map(async (item) => await deserialize(scope, item, options)),
    );
  }
  if (value && typeof value === "object") {
    if (typeof value["@secret"] === "string") {
      if (!scope.password) {
        throw new Error(
          "Cannot deserialize secret without password, did you forget to set password when initializing your alchemy app?\n" +
            "See: https://alchemy.run/docs/concepts/secret.html#encryption-password",
        );
      }
      return new Secret(await decryptWithKey(value["@secret"], scope.password));
    } else if ("@schema" in value) {
      return value["@schema"];
    } else if ("@date" in value) {
      return new Date(value["@date"]);
    } else if ("@symbol" in value) {
      return parseSymbol(value["@symbol"]);
    } else if ("@scope" in value) {
      return scope;
    }

    return Object.fromEntries(
      await Promise.all(
        Object.entries(value).map(async ([key, value]) => [
          parseSymbol(key) ?? key,
          await deserialize(scope, value, options),
        ]),
      ),
    );
  }
  return value;
}

const symbolPattern = /^Symbol\((.*)\)$/;

function parseSymbol(value: string) {
  const match = value.match(symbolPattern);
  if (!match) {
    return undefined;
  }
  return Symbol.for(match[1]);
}

function assertNotUniqueSymbol(symbol: Symbol) {
  if (
    symbol.description === undefined ||
    symbol !== Symbol.for(symbol.description)
  ) {
    throw new Error(`Cannot serialize unique symbol: ${symbol.description}`);
  }
}

import { decryptWithKey, encrypt } from "./encrypt.js";
import { Scope } from "./scope.js";
import { Secret } from "./secret.js";

import type { Type } from "arktype";

// zero-dependency type guard for ArkType
function isType(value: any): value is Type<any, any> {
  return (
    value &&
    typeof value === "object" &&
    typeof value.toJsonSchema === "function"
  );
}

export async function serialize(
  scope: Scope,
  value: any,
  options?: {
    encrypt?: boolean;
  },
): Promise<any> {
  if (Array.isArray(value)) {
    return Promise.all(value.map((value) => serialize(scope, value, options)));
  } else if (value instanceof Secret) {
    if (!scope.password) {
      throw new Error("Cannot serialize secret without password");
    }
    return {
      "@secret":
        options?.encrypt !== false
          ? await encrypt(value.unencrypted, scope.password)
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
  } else if (value && typeof value === "object") {
    for (const symbol of Object.getOwnPropertySymbols(value)) {
      assertNotUniqueSymbol(symbol);
    }
    for (const key of Object.keys(value)) {
      if (parseSymbol(key)) {
        throw new Error(
          `Cannot serialize property '${key}' because it looks like a stringified symbol.`,
        );
      }
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

export async function deserialize(scope: Scope, value: any): Promise<any> {
  if (Array.isArray(value)) {
    return await Promise.all(
      value.map(async (item) => await deserialize(scope, item)),
    );
  }
  if (value && typeof value === "object") {
    if (typeof value["@secret"] === "string") {
      if (!scope.password) {
        throw new Error("Cannot deserialize secret without password");
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
          await deserialize(scope, value),
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

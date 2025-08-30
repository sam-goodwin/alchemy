import { detailedDiff } from "deep-object-diff";

const debug = false;

class UnexpectedTokenError extends Error {
  constructor(token: string | undefined, expected: string) {
    super(
      `Unexpected token ${token ? JSON.stringify(token) : "EOF"}, expected ${expected}`,
    );
    this.name = "UnexpectedTokenError";
  }
}

export function exists<O extends { returnValue?: boolean } = {}>(
  obj: any,
  path: string,
  options: O = {
    returnValue: false,
  } as O,
): O extends { returnValue: true }
  ? {
      exists: boolean;
      value?: any;
    }
  : boolean {
  if (obj === null || obj === undefined) {
    return returnValue(false);
  }

  type ParsingContext =
    | "identifier"
    | "brackets"
    | "number-index"
    | "string-index"
    | "chain-access";

  /**
   * This defines what we expect the next character to be.
   * - true: we expect that kind of token next.
   * - false: token not allowed next.
   * - a given token | array of tokens: we expect a specific token next.
   */
  let ctx = {
    property: "",
    target: obj,
    in: "identifier" as ParsingContext,
    quote: null as string | null,
    switch(opts: { context: ParsingContext }) {
      if (debug) {
        console.log("setting context to", opts.context);
      }

      ctx.in = opts.context;
    },
    push(opts: { char: string; context?: ParsingContext }) {
      ctx.property += opts.char;
      if (debug) {
        console.log("pushing", opts.char, "now becoming", ctx.property);
      }

      if (opts.context) {
        if (debug) {
          console.log("setting context to", opts.context);
        }

        ctx.switch({ context: opts.context });
      }
    },
    access(opts: { context?: ParsingContext } = {}) {
      ctx.target = ctx.target[ctx.property];
      if (debug) {
        console.log("accessing", ctx.property, "now targetting", ctx.target);
      }

      ctx.property = "";
      if (opts.context) {
        ctx.switch({ context: opts.context });
      }
    },
  };

  for (let i = 0; i < path.length; i++) {
    const char = path[i];
    switch (ctx.in) {
      case "identifier": {
        if (char === ".") {
          if (!canContinuePath()) return returnValue(false);
          ctx.access({ context: "identifier" });
        } else if (char === "[") {
          if (ctx.property === "") {
            ctx.switch({ context: "brackets" });
            break;
          }

          if (!canContinuePath()) return returnValue(false);
          ctx.access({ context: "brackets" });
        } else if (/[a-zA-Z0-9_$]/i.test(char)) {
          ctx.push({ char });
        } else {
          throw new UnexpectedTokenError(char, "dot, bracket, or identifier");
        }
        break;
      }
      case "brackets": {
        if (/\d/.test(char)) {
          ctx.push({ char, context: "number-index" });
        } else if (char === "'" || char === '"') {
          ctx.in = "string-index";
          ctx.quote = char;
        } else if (char === "]") {
          ctx.access({ context: "chain-access" });
        } else {
          throw new UnexpectedTokenError(char, "number or quote");
        }
        break;
      }
      case "number-index": {
        if (/\d/.test(char)) {
          ctx.push({ char });
        } else if (char === "]") {
          ctx.property = Number(ctx.property).toString();
          ctx.in = "chain-access";
        } else {
          throw new UnexpectedTokenError(char, "number or closing bracket");
        }
        break;
      }
      case "string-index": {
        if (ctx.quote === null) {
          if (char === "]") {
            ctx.in = "chain-access";
          } else {
            throw new UnexpectedTokenError(char, "closing bracket");
          }
        } else if (char === ctx.quote) {
          ctx.quote = null;
        } else {
          ctx.push({ char });
        }
        break;
      }
      case "chain-access": {
        if (char === "[") {
          ctx.access({ context: "brackets" });
        } else if (char === ".") {
          ctx.access({ context: "identifier" });
        } else {
          throw new UnexpectedTokenError(
            char,
            "dot or bracket notation accessor",
          );
        }
        break;
      }
    }
  }

  if (debug) {
    console.log("finished parsing", ctx);
  }

  if (ctx.in === "identifier" && ctx.property === "") {
    throw new UnexpectedTokenError(undefined, "identifier");
  } else if (ctx.in === "brackets" && ctx.property === "") {
    throw new UnexpectedTokenError(undefined, "property index");
  } else if (ctx.in === "number-index") {
    throw new UnexpectedTokenError(undefined, "closing bracket");
  } else if (ctx.in === "string-index") {
    if (ctx.quote === null) {
      throw new UnexpectedTokenError(undefined, "closing bracket");
    } else if (ctx.quote !== null) {
      throw new UnexpectedTokenError(undefined, "quote");
    }
  }

  if (canContinuePath()) {
    return returnValue(true, ctx.target[ctx.property]);
  }

  return returnValue(false);

  // --- End of main logic ---

  // --- Helper functions ---

  function returnValue(exists: boolean, value?: any): any {
    if (options.returnValue) {
      return {
        exists,
        value,
      };
    }

    return exists;
  }

  function canContinuePath() {
    const can =
      ctx.target &&
      typeof ctx.target === "object" &&
      ctx.property in ctx.target;

    if (!can && debug) {
      console.log("cant continue path");
    }

    return can;
  }
}

export function diff<T extends Record<string, any>>(original: T, changed: any) {
  const changes = detailedDiff(original, changed);

  return {
    changes,
    /**
     * Check if any of the given paths have been added, deleted, or updated.
     * TODO: Make this type-safe without burning the CPU.
     */
    any(
      path: string[],
      options: {
        added?: boolean;
        deleted?: boolean;
        updated?: boolean;
      } = {},
    ) {
      for (const p of path) {
        if (
          (exists(changes, `added.${p}`) && options.added !== false) ||
          (exists(changes, `deleted.${p}`) && options.deleted !== false) ||
          (exists(changes, `updated.${p}`) && options.updated !== false)
        ) {
          return true;
        }
      }
      return false;
    },

    /**
     * Check if the given path has been added, deleted, or updated.
     * TODO: Make this type-safe without burning the CPU.
     * @param path
     * @param options
     */
    check<
      O extends { added?: boolean; deleted?: boolean; updated?: boolean } = {},
    >(
      path: string,
      options: O = {} as O,
    ): O extends { added: false }
      ? never
      : "added" | O extends { deleted: false }
        ? never
        : "deleted" | O extends { updated: false }
          ? never
          : "updated" | false {
      if (exists(changes, `added.${path}`) && options.added !== false) {
        return "added" as any;
      }
      if (exists(changes, `deleted.${path}`) && options.deleted !== false) {
        return "deleted" as any;
      }
      if (exists(changes, `updated.${path}`) && options.updated !== false) {
        return "updated" as any;
      }
      return false as any;
    },
  };
}

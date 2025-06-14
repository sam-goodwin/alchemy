import path from "node:path";
import { afterAll, beforeAll, it } from "vitest";
import { alchemy } from "../alchemy.ts";
import { DOStateStore } from "../cloudflare/index.ts";
import { Scope } from "../scope.ts";
import type { StateStoreType } from "../state.ts";
import { NoopTelemetryClient } from "../util/telemetry/client.ts";

/**
 * Extend the Alchemy interface to include test functionality
 */
declare module "../alchemy.ts" {
  interface Alchemy {
    test: typeof test;
  }
}

/**
 * Add test functionality to alchemy instance
 */
alchemy.test = test;

/**
 * Options for configuring test behavior
 */
export interface TestOptions {
  /**
   * Whether to suppress logging output.
   * @default false.
   */
  quiet?: boolean;

  /**
   * Password to use for test resources.
   * @default "test-password".
   */
  password?: string;

  /**
   * Override the default state store for the test.
   */
  stateStore?: StateStoreType;

  /**
   * Prefix to use for the scope to isolate tests and environments.
   */
  prefix?: string;
}

/**
 * Test function type definition with overloads
 */
type test = {
  /**
   * Create a test with default options
   * @param name Test name
   * @param fn Test function
   * @param timeout Optional timeout in milliseconds
   */
  (name: string, fn: (scope: Scope) => Promise<any>, timeout?: number): void;

  /**
   * Create a test with custom options
   * @param name Test name
   * @param options Test configuration options
   * @param fn Test function
   * @param timeout Optional timeout in milliseconds
   */
  (
    name: string,
    options: TestOptions,
    fn: (scope: Scope) => Promise<any>,
    timeout?: number,
  ): void;

  /**
   * Skip test conditionally
   * @param condition If true, test will be skipped
   */
  skipIf(condition: boolean): test;

  /**
   * Run the same test for multiple variants
   * @param variants Array of variant values to test
   * @param testName Base name for the test (will be suffixed with variant for non-first items)
   * @param testHandler Function that receives scope and variant value
   * @returns Array of test functions that can be called
   */
  variant<const T extends readonly string[]>(
    variants: T,
    testName: string,
    testHandler: (scope: Scope, variant: T[number]) => Promise<void>,
  ): Array<{ name: string; handler: (scope: Scope) => Promise<void> }>;

  beforeAll(fn: (scope: Scope) => Promise<void>): void;

  afterAll(fn: (scope: Scope) => Promise<void>): void;

  /**
   * Current test scope
   */
  scope: Scope;
};

/**
 * Creates a test helper function that provides scoped resource management
 *
 * @param meta Import meta object from the test file
 * @param defaultOptions Default options to apply to all tests
 * @returns Test function with scope management
 *
 * @example
 * ```typescript
 * const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX
});
 *
 * describe("My Resource", () => {
 *   test("create and delete", async (scope) => {
 *     try {
 *       const resource = await MyResource("test", { ... });
 *       expect(resource.id).toBeTruthy();
 *     } finally {
 *       await alchemy.destroy(scope);
 *     }
 *   });
 * });
 * ```
 */
export function test(
  meta: ImportMeta,
  defaultOptions: TestOptions = {
    quiet: true,
  },
): test {
  if (!("quiet" in defaultOptions)) {
    defaultOptions.quiet = true;
  }

  if (
    defaultOptions.stateStore === undefined &&
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
  ) {
    defaultOptions.stateStore = (scope) => new DOStateStore(scope);
  }

  test.skipIf = (condition: boolean) => {
    if (condition) {
      return (..._args: any[]) => {};
    }
    return test;
  };

  test.variant = <const T extends readonly string[]>(
    variants: T,
    testName: string,
    testHandler: (scope: Scope, variant: T[number]) => Promise<void>,
  ): Array<{ name: string; handler: (scope: Scope) => Promise<void> }> => {
    return variants.map((variant, index) => ({
      name: index === 0 ? testName : `${testName} (${variant})`,
      handler: async (scope: Scope) => {
        return testHandler(scope, variant);
      },
    }));
  };

  const scope = new Scope({
    scopeName: `${defaultOptions.prefix ? `${defaultOptions.prefix}-` : ""}${path.basename(meta.filename)}`,
    stateStore: defaultOptions?.stateStore,
    phase: "up",
    telemetryClient: new NoopTelemetryClient(),
    quiet: defaultOptions.quiet,
  });

  test.beforeAll = (fn: (scope: Scope) => Promise<void>) => {
    return beforeAll(() => scope.run(() => fn(scope)));
  };

  test.afterAll = (fn: (scope: Scope) => Promise<void>) => {
    return afterAll(() => scope.run(() => fn(scope)));
  };

  return test as test;

  function test(
    ...args:
      | [
          name: string,
          options: TestOptions,
          fn: (scope: Scope) => Promise<void>,
        ]
      | [name: string, fn: (scope: Scope) => Promise<void>]
  ) {
    const testName = args[0];
    const _options = typeof args[1] === "object" ? args[1] : undefined;
    const timeout =
      typeof args[args.length - 1] === "number"
        ? (args[args.length - 1] as number)
        : 120000;
    const spread = (obj: any) =>
      obj && typeof obj === "object"
        ? Object.fromEntries(
            Object.entries(obj).flatMap(([k, v]) =>
              v !== undefined ? [[k, v]] : [],
            ),
          )
        : {};

    const options: TestOptions = {
      quiet: defaultOptions?.quiet ?? false,
      password: "test-password",
      ...spread(defaultOptions),
      ...spread(_options),
    };

    const fn = typeof args[1] === "function" ? args[1] : args[2]!;

    return it(
      testName,
      (ctx) => {
        // Get the current describe block name from the test context
        let describeBlockName = "";
        if (ctx?.task?.suite?.name) {
          describeBlockName = `${ctx.task.suite.name}/`;
        }

        return alchemy.run(
          `${describeBlockName}${testName}`,
          {
            ...options,
            parent: scope,
          },
          async (scope) => {
            await scope.run(() => fn(scope));
          },
        );
      },
      timeout,
    );
  }
}

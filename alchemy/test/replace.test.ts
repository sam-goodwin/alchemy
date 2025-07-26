import { describe, expect, test as vitestTest } from "vitest";
import { alchemy } from "../src/alchemy.ts";
import type { Context } from "../src/context.ts";
import { destroy } from "../src/destroy.ts";
import { Resource, ResourceID } from "../src/resource.ts";
import type { Scope } from "../src/scope.ts";
import "../src/test/vitest.ts";
import { BRANCH_PREFIX, createTestOptions, STATE_STORE_TYPES } from "./util.ts";

describe.sequential("Replace-Sequential", () => {
  for (const storeType of STATE_STORE_TYPES) {
    describe.sequential(storeType, () => {
      const options = createTestOptions(storeType, "replace");
      const deleted: string[] = [];
      const failed = new Set();

      interface Replacable extends Resource<`Replacable-sequential-${string}`> {
        name: string;
      }

      const Replacable = Resource(
        `Replacable-sequential-${storeType}`,
        async function (
          this: Context<Replacable>,
          _id: string,
          props: {
            name: string;
            fail?: boolean;
            child?: boolean;
            replaceOnCreate?: boolean;
          },
        ) {
          if (props.replaceOnCreate && this.phase === "create") {
            this.replace();
          }
          if (this.phase === "delete") {
            if (props.fail) {
              if (!failed.has(props.name)) {
                failed.add(props.name);
                throw new Error(`Failed to delete ${props.name}`);
              }
            }
            deleted.push(props.name);
            return this.destroy();
          }
          if (this.phase === "update") {
            if (props.name !== this.output.name) {
              await this.replace();
            }
          }
          if (props.child) {
            await Replacable("child", {
              name: "child",
            });
          }
          return this({
            name: props.name,
          });
        },
      );

      vitestTest.sequential(
        "replace should not trigger deletion of entire stage scope",
        async () => {
          let app: Scope;
          try {
            app = await alchemy(
              "replace should not trigger deletion of entire stage scope",
              {
                ...options,
                quiet: true,
              },
            );

            await Replacable("foo-6", {
              name: "foo-6",
            });
            await Replacable("bar-6", {
              name: "bar-6",
            });
            await Replacable("bar-6", {
              name: "baz-6",
            });

            expect(deleted).not.toContain("foo-6");
            expect(deleted).not.toContain("bar-6");
            expect(deleted).not.toContain("baz-6");

            await app.finalize();

            expect(deleted).not.toContain("foo-6");
            expect(deleted).toContain("bar-6");
            expect(deleted).not.toContain("baz-6");
          } finally {
            await destroy(app!);

            expect(deleted).toContain("foo-6");
            expect(deleted).toContain("bar-6");
            expect(deleted).toContain("baz-6");

            globalThis.__ALCHEMY_STORAGE__?.disable();
          }
        },
      );
    });
  }
});

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe.concurrent("Replace", () => {
  for (const storeType of STATE_STORE_TYPES) {
    describe(storeType, () => {
      const options = createTestOptions(storeType, "replace");
      const deleted: string[] = [];
      const failed = new Set();

      interface Replacable extends Resource<`Replacable-${string}`> {
        name: string;
      }

      const Replacable = Resource(
        `Replacable-${storeType}`,
        async function (
          this: Context<Replacable>,
          _id: string,
          props: {
            name: string;
            fail?: boolean;
            child?: boolean;
            replaceOnCreate?: boolean;
            force?: boolean;
          },
        ) {
          if (props.replaceOnCreate && this.phase === "create") {
            this.replace(props.force);
          }
          if (this.phase === "delete") {
            if (props.fail) {
              if (!failed.has(props.name)) {
                failed.add(props.name);
                throw new Error(`Failed to delete ${props.name}`);
              }
            }
            deleted.push(props.name);
            return this.destroy();
          }
          if (this.phase === "update") {
            if (props.name !== this.output.name) {
              this.replace(props.force);
            }
          }
          if (props.child) {
            await Replacable("child", {
              name: "child",
            });
          }
          return this({
            name: props.name,
          });
        },
      );

      test(
        "replace should flush through to downstream resources",
        options,
        async (scope) => {
          try {
            let resource = await Replacable("replaceable", {
              name: "foo-0",
            });
            expect(deleted).not.toContain("foo-0");
            expect(resource.name).toBe("foo-0");
            resource = await Replacable("replaceable", {
              name: "bar-0",
            });
            // the output should have changed
            expect(resource.name).toBe("bar-0");
            // but the resource should not have been deleted
            expect(deleted).not.toContain("foo-0");
            expect(deleted).not.toContain("bar-0");
            // the state should contain a record of the replaced resource
            expect(await scope.get("pendingDeletions")).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  resource: expect.objectContaining({
                    [ResourceID]: "replaceable",
                    name: "foo-0",
                  }),
                }),
              ]),
            );

            await scope.finalize();

            expect(await scope.get("pendingDeletions")).not.toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  resource: expect.objectContaining({
                    [ResourceID]: "replaceable",
                  }),
                }),
              ]),
            );

            expect(deleted).toContain("foo-0");
            expect(deleted).not.toContain("bar-0");
          } finally {
            await destroy(scope);
            expect(deleted).toContain("bar-0");
          }
        },
      );

      test("replace in subsequent scopes", options, async (scope) => {
        try {
          let resource = await alchemy.run("foo", () =>
            Replacable("replaceable", {
              name: "foo-1",
            }),
          );
          expect(deleted).not.toContain("foo-1");
          expect(resource.name).toBe("foo-1");
          let foo: Scope;
          resource = await alchemy.run("foo", (scope) => {
            foo = scope;
            return Replacable("replaceable", {
              name: "bar-1",
            });
          });
          // the output should have changed
          expect(resource.name).toBe("bar-1");
          // but the resource should not have been deleted
          expect(deleted).not.toContain("foo-1");
          expect(deleted).not.toContain("bar-1");
          // the state should contain a record of the replaced resource
          expect(await foo!.get("pendingDeletions")).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                resource: expect.objectContaining({
                  [ResourceID]: "replaceable",
                  name: "foo-1",
                }),
              }),
            ]),
          );
          // now, we finalize the scope
          await scope.finalize();
          // the state should no longer contain the replaced record
          expect(await foo!.get("pendingDeletions")).not.toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                resource: expect.objectContaining({
                  [ResourceID]: "replaceable",
                }),
              }),
            ]),
          );
          // the delete of the replaced resource should have been flushed through
          expect(deleted).toContain("foo-1");
          expect(deleted).not.toContain("bar-1");
        } finally {
          await destroy(scope);
          expect(deleted).toContain("bar-1");
        }
      });

      test("replace and destroy simultaneously", options, async (scope) => {
        try {
          let resource = await alchemy.run("foo", () =>
            Replacable("replaceable", {
              name: "foo-2",
            }),
          );
          expect(deleted).not.toContain("foo-2");
          expect(resource.name).toBe("foo-2");
          resource = await alchemy.run("foo", () =>
            Replacable("replaceable", {
              name: "bar-2",
            }),
          );
          // the output should have changed
          expect(resource.name).toBe("bar-2");
          // but the resource should not have been deleted
          expect(deleted).not.toContain("foo-2");
          expect(deleted).not.toContain("bar-2");
          // now, we destroy the scope that contains both replaced and replacement resources
          // both must be deleted
          await destroy(scope);
          // the delete of the replaced resource should have been flushed through
          expect(deleted).toContain("foo-2");
          expect(deleted).toContain("bar-2");
          // replaced resource should be deleted first
          expect(deleted.indexOf("foo-2") < deleted.indexOf("bar-2"));
        } finally {
          await destroy(scope);
        }
      });

      test(
        "replaced resource should be deleted on second try if it fails the first time",
        options,
        async (scope) => {
          try {
            let resource = await alchemy.run("foo", () =>
              Replacable("replaceable", {
                name: "foo-3",
                fail: true,
              }),
            );
            expect(deleted).not.toContain("foo-3");
            expect(resource.name).toBe("foo-3");
            resource = await alchemy.run("foo", () =>
              Replacable("replaceable", {
                name: "bar-3",
              }),
            );
            // the output should have changed
            expect(resource.name).toBe("bar-3");
            // but the resource should not have been deleted
            expect(deleted).not.toContain("foo-3");
            expect(deleted).not.toContain("bar-3");
            // first deletion of replaced resource will fail
            try {
              await scope!.finalize();
            } catch (e: any) {
              expect(e.message).toBe("Failed to delete foo-3");
            }
            // none of the resource are deleted
            expect(deleted).not.toContain("foo-3");
            expect(deleted).not.toContain("bar-3");
            // then deletion succeeds on a re-run
            await scope!.finalize();
            // foo-3 should be deleted
            expect(deleted).toContain("foo-3");
            expect(deleted).not.toContain("bar-3");

            await destroy(scope);
            // replaced resource should be deleted first
            expect(deleted.indexOf("foo-3") < deleted.indexOf("bar-3"));
          } finally {
            await destroy(scope);
          }
        },
      );

      test(
        "when replacing a resource multiple times, all replacements should be deleted",
        options,
        async (scope) => {
          try {
            let _resource = await Replacable("replaceable", {
              name: "foo-4",
            });
            _resource = await Replacable("replaceable", {
              name: "bar-4",
            });
            _resource = await Replacable("replaceable", {
              name: "baz-4",
            });
            expect(await scope.get("pendingDeletions")).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  resource: expect.objectContaining({
                    [ResourceID]: "replaceable",
                    name: "foo-4",
                  }),
                }),
                expect.objectContaining({
                  resource: expect.objectContaining({
                    [ResourceID]: "replaceable",
                    name: "bar-4",
                  }),
                }),
              ]),
            );
            await scope.finalize();
            expect(deleted).toContain("foo-4");
            expect(deleted).toContain("bar-4");
          } finally {
            await destroy(scope);
          }
        },
      );

      test(
        "cannot replace a resource that has child resources",
        options,
        async (scope) => {
          try {
            await alchemy.run("foo", () =>
              Replacable("replaceable", {
                name: "foo-4",
                child: true,
              }),
            );
            await expect(
              alchemy.run("foo", () =>
                Replacable("replaceable", {
                  name: "baz-4",
                }),
              ),
            ).rejects.toThrow("has children and cannot be replaced.");
          } finally {
            await destroy(scope);
          }
        },
      );

      test(
        "cannot replace a resource in create phase",
        options,
        async (scope) => {
          try {
            await expect(
              alchemy.run("test", () =>
                Replacable("replaceable", {
                  name: "foo-5",
                  replaceOnCreate: true,
                }),
              ),
            ).rejects.toThrow("cannot be replaced in create phase.");
          } finally {
            await destroy(scope);
          }
        },
      );

      test(
        "replace is able to recover from corrupted DoStateStore",
        options,
        async (scope) => {
          try {
            let resource = await Replacable("replaceable", {
              name: "foo-7",
            });
            expect(deleted).not.toContain("foo-7");
            expect(resource.name).toBe("foo-7");
            resource = await Replacable("replaceable", {
              name: "bar-7",
            });
            // the output should have changed
            expect(resource.name).toBe("bar-7");
            // but the resource should not have been deleted
            expect(deleted).not.toContain("foo-7");
            expect(deleted).not.toContain("bar-7");
            // the state should contain a record of the replaced resource
            expect(await scope.get("pendingDeletions")).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  resource: expect.objectContaining({
                    [ResourceID]: "replaceable",
                    name: "foo-7",
                  }),
                }),
              ]),
            );

            //* force pending deletions to be the corrupted state that occurred when
            //* DOSS wasn't serializing
            await scope.set("pendingDeletions", [
              { resource: { name: "foo-7" }, oldProps: { name: "foo-7" } },
            ]);

            await scope.finalize();

            expect(await scope.get("pendingDeletions")).toHaveLength(0);

            expect(deleted).not.toContain("bar-7");
          } finally {
            await destroy(scope);
            expect(deleted).toContain("bar-7");
          }
        },
      );

      test(
        "replace should be able to force a deletion immediately",
        options,
        async (scope) => {
          try {
            let resource = await Replacable("replaceable", {
              name: "foo-8",
            });
            expect(deleted).not.toContain("foo-8");
            expect(resource.name).toBe("foo-8");
            resource = await Replacable("replaceable", {
              name: "bar-8",
              force: true,
            });
            // the output should have changed
            expect(resource.name).toBe("bar-8");
            // but the resource should not have been deleted
            expect(deleted).toContain("foo-8");
            expect(deleted).not.toContain("bar-8");
          } finally {
            await destroy(scope);
            expect(deleted).toContain("bar-8");
          }
        },
      );

      test(
        "replace should use the old props and output of the replaced resource",
        options,
        async (scope) => {
          const deleted: { input: string; output: string }[] = [];
          type MyResource = Resource<`MyResource-${string}`> & {
            name: string;
          };
          const MyResource = Resource(
            `MyResource-${storeType}`,
            async function (
              this: Context<MyResource>,
              _id: string,
              props: {
                name: string;
              },
            ) {
              if (this.phase === "delete") {
                deleted.push({ input: props.name, output: this.output.name });
                return this.destroy();
              }
              if (this.phase === "update") {
                this.replace();
              }
              return this({ name: `output-${props.name}` });
            },
          );
          try {
            await MyResource("foo", { name: "foo" });
            expect(deleted).toEqual([]);
            await MyResource("foo", { name: "bar" });
            await scope.finalize();
            expect(deleted).toEqual([{ input: "foo", output: "output-foo" }]);
          } finally {
            await destroy(scope);
            expect(deleted).toEqual([
              { input: "foo", output: "output-foo" },
              { input: "bar", output: "output-bar" },
            ]);
          }
        },
      );
      test(
        "this.output should not be undefined on this.replace(true)",
        options,
        async (scope) => {
          const deleted: string[] = [];
          interface Replacable extends Resource<`Replacable-${string}`> {
            name: string;
          }
          const Replacable = Resource(
            `Replacable-${storeType}-eager`,
            async function (
              this: Context<Replacable>,
              _id: string,
              props: {
                name: string;
              },
            ): Promise<Replacable> {
              if (this.phase === "delete") {
                deleted.push(this.output.name);
                return this.destroy();
              } else if (this.phase === "update") {
                this.replace(true);
              }
              return this({ name: props.name });
            },
          );
          try {
            await Replacable("replaceable", {
              name: "foo-9",
            });
            expect(deleted).toEqual([]);
            await Replacable("replaceable", {
              name: "bar-9",
            });
            expect(deleted).toEqual(["foo-9"]);
          } finally {
            await destroy(scope);
            expect(deleted).toEqual(["foo-9", "bar-9"]);
          }
        },
      );
    });
  }
});

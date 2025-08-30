import * as Effect from "effect/Effect";
import type { Binding } from "./cloudflare/bindings.ts";
import type { Resource } from "./resource.ts";
import type { type } from "./type.ts";

export interface Rune<T> extends PromiseLike<T>, Effect.Effect<T> {}

export function Rune<T>(effect: Effect.Effect<T, any, never>): Rune.of<T> {
  let cache: Promise<T> | undefined;
  const rune = Effect.promise(() => (cache ??= Effect.runPromise(effect)));
  return new Proxy(() => {}, {
    apply: (_, _this, args) =>
      Rune(Effect.map(rune, (value: any) => value(...args))),
    get(_: any, prop: any) {
      if (prop in rune) {
        return bind(rune, prop);
      } else if (["then", "catch", "finally"].includes(prop as any)) {
        return (...args: any[]) =>
          (Effect.runPromise(rune) as any)[prop](...args);
      } else {
        return Rune(rune.pipe(Effect.map((x) => bind(x, prop))));
      }
      function bind(self: any, prop: any) {
        const member = self[prop];
        return typeof member === "function" ? member.bind(self) : member;
      }
    },
  }) as Rune.of<T>;
}

export declare namespace Rune {
  export type of<T> = T extends (...args: infer Args) => infer U
    ? (...args: array<Args>) => of<Awaited<U>>
    : T extends any[]
      ? array<T>
      : T extends object
        ? Rune<T> & {
            [k in keyof T]: of<Awaited<T[k]>>;
          }
        : Rune<T>;

  type array<T extends any[]> = number extends T["length"]
    ? Rune.of<T[number]>[]
    : T extends [infer Head, ...infer Tail]
      ? [Head | Rune.of<Head>, ...array<Tail>]
      : [];

  export type await<T> = T extends type<any>
    ? T
    : T extends Resource
      ? T
      : T extends Rune<infer U>
        ? U
        : T extends Effect.Effect<T>
          ? T
          : T extends Binding
            ? T
            : T extends PromiseLike<infer U> | Effect.Effect<infer U>
              ? await<U>
              : T extends any[]
                ? awaitArray<T>
                : T extends object
                  ? {
                      [k in keyof T]: await<T[k]>;
                    }
                  : T;

  type awaitArray<T extends any[]> = number extends T["length"]
    ? await<T[number]>[]
    : T extends [infer Head, ...infer Tail]
      ? [await<Head>, ...awaitArray<Tail>]
      : [];
}

const myEffect = Effect.gen(function* () {
  console.log("Hello via Effect!");
  yield* Effect.sleep(1);
  return {
    nested: {
      number: Math.floor(Math.random() * 100),
      fn: () => 1,
    },
  };
});
const myRune = Rune(myEffect);

const res1 = await myRune;
const val1 = await myRune.nested.number;
const val2 = await myRune.pipe(
  Effect.map((e) => e.nested.number),
  Effect.runPromise,
);

class Counter {
  count = 0;
  increment() {
    return this.count++;
  }
}
const g = Rune(Effect.succeed(new Counter()));

console.log({
  res1,
  val1,
  val2,
  fn: await myRune.nested.fn(),
  inc: await g.increment(),
});

// const counter = new Counter();
// const counterRune = Rune(Effect.gen(function* () {
//   yield* Effect.sleep(1);
//   counter.increment();
// }));

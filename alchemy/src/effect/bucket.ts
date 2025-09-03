import type * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type { Allow, Policy } from "./policy.ts";

export type Bucket<Self = any, ID extends string = any> = {
  id: ID;
  new (_: never): any;
  get<const Key extends string = string>(
    this: Self,
    key: Key,
  ): Effect.Effect<string | undefined, never, Policy<Bucket.Get<Self, Key>>>;
  put<const Key extends string = string>(
    this: Self,
    key: Key,
    value: string,
  ): Effect.Effect<void, never, Policy<Bucket.Put<Self, Key>>>;
};

export declare function Bucket<ID extends string>(
  id: ID,
): <Self>() => Bucket<Self, ID>;

export declare namespace Bucket {
  export type Get<B, Key extends string> = Allow<
    B,
    "Bucket::Get",
    { key: Key }
  >;
  export function Get<B, const Key extends string>(
    bucket: Bucket<B>,
    key?: Key,
  ): Policy<Get<B, Key>>;
  export function Get<B, const Key extends string>(
    bucket: B,
    key?: Key,
  ): Policy<Get<B, Key>>;
  export function get<B, Key extends string>(
    bucket: B,
    key?: Key,
  ): Layer.Layer<Get<B, Key>>;

  export type Put<B, Key extends string> = Allow<
    B,
    "Bucket::Put",
    { key: Key }
  >;
  export function Put<B, const Key extends string = string>(
    bucket: B,
    key?: Key,
  ): Policy<Put<B, Key>>;
  export function put<B, Key extends string>(
    bucket: B,
    key?: Key,
  ): Layer.Layer<Put<B, Key>>;
}

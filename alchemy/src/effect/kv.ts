import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type { Allow, Policy } from "./policy.ts";

export type KVNamespace<
  ID extends string,
  Key extends string,
  Value extends string,
> = {
  id: ID;
  get(
    key: Key,
  ): Effect.Effect<
    Value | undefined,
    never,
    Policy<KVNamespace.Get<ID, Key, Value>>
  >;
  put(
    key: Key,
    value: Value,
  ): Effect.Effect<void, never, Policy<KVNamespace.Put<ID, Key, Value>>>;
};
export function KVNamespace<ID extends string>(id: ID) {
  return <
    Key extends string = string,
    Value extends string = string,
  >(): KVNamespace<ID, Key, Value> => ({
    id,
    get: (_key: Key) => Effect.succeed(undefined),
    put: (_key: Key, _value: Value) => Effect.succeed(void 0),
  });
}
export declare namespace KVNamespace {
  export type Get<
    ID extends string,
    Key extends string,
    Value extends string,
  > = Allow<ID, "KV::Get", { key: Key; value: Value }>;
  export function Get<
    ID extends string,
    Key extends string,
    Value extends string,
  >(_kv: KVNamespace<ID, Key, Value>): Policy<Get<ID, Key, Value>>;
  export function get<
    ID extends string,
    Key extends string,
    Value extends string,
  >(kv: KVNamespace<ID, Key, Value>): Layer.Layer<Get<ID, Key, Value>>;

  export type Put<
    ID extends string,
    Key extends string,
    Value extends string,
  > = Allow<ID, "KV::Put", { key: Key; value: Value }>;
  export function Put<
    ID extends string,
    Key extends string,
    Value extends string,
  >(kv: KVNamespace<ID, Key, Value>): Policy<Put<ID, Key, Value>>;
  export function put<
    ID extends string,
    Key extends string,
    Value extends string,
  >(kv: KVNamespace<ID, Key, Value>): Layer.Layer<Put<ID, Key, Value>>;
}

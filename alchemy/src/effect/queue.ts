import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type { Allow, Policy } from "./policy.ts";

// TODO(sam): are there errors?
export type SendMessageError = never;

// a declared Queue at runtime
export type Queue<ID extends string = string, Msg = any> = {
  id: ID;
  send(
    message: Msg,
  ): Effect.Effect<void, SendMessageError, Queue.Send<ID, Msg>>;
  sendBatch(
    ...message: Msg[]
  ): Effect.Effect<void, SendMessageError, Queue.SendBatch<ID, Msg>>;
  /** @internal */
  Batch: Queue.Batch<Msg>;
  forBatch<Req = never>(
    fn: (batch: Queue.Batch<Msg>) => Effect.Effect<void, never, Req>,
  ): <Exports, Err, R>(
    effect: Effect.Effect<Exports, Err, R>,
  ) => Export<
    Exports,
    {
      queue(batch: Queue.Batch<Msg>): Effect.Effect<void, never, never>;
    },
    Req | Policy<Queue.Consume<ID>>
  >;
  new (_: never): Queue<ID, Msg>;
};

type Export<Exports, Export, Req> = Effect.Effect<
  Exports & Export,
  never,
  Policy<Extract<Req, Policy>["statements"]> | Exclude<Req, Policy>
>;

export function Queue<ID extends string>(id: ID) {
  return <T>() =>
    ({
      id,
      // TODO
      send: (_message: T) => Effect.succeed(void 0),
      // TODO
      sendBatch: (..._message: T[]) => Effect.succeed(void 0),
      get Batch(): never {
        throw new Error("Cannot access phantom property, Batch");
      },
      // TODO
      forBatch: <Req = never>(
        _fn: (batch: Queue.Batch<T>) => Effect.Effect<void, never, Req>,
      ) => Effect.succeed(void 0) as any,
    }) as any as Queue<ID, T>;
}

export declare namespace Queue {
  // type of a batch of messages at runtime
  export type Batch<Msg> = {
    messages: Msg[];
    ackAll: () => Effect.Effect<void, never, never>;
  };

  export type Consume<ID extends string> = Allow<ID, "Queue::Consume", {}>;
  export function Consume<ID extends string, Msg>(
    queue: Queue<ID, Msg>,
  ): Policy<Consume<ID>>;

  // policy specification
  export type Send<ID extends string, Msg> = Allow<
    ID,
    "Queue::Send",
    { message: Msg }
  >;
  // provide Infrastructure policy
  export function Send<ID extends string, Msg>(
    queue: Queue<ID, Msg>,
  ): Policy<Send<ID, Msg>>;
  // provide Runtime client
  export function send<ID extends string, Msg>(
    queue: Queue<ID, Msg>,
  ): Layer.Layer<Send<ID, Msg>>;

  // policy specification
  export type SendBatch<ID extends string, Msg> = Allow<
    ID,
    "Queue::SendBatch",
    { message: Msg[] }
  >;
  // provide Infrastructure policy
  export function SendBatch<ID extends string, Msg>(
    queue: Queue<ID, Msg>,
  ): Policy<SendBatch<ID, Msg>>;

  // provide Runtime client
  export function sendBatch<ID extends string, Msg>(
    queue: Queue<ID, Msg>,
  ): Layer.Layer<SendBatch<ID, Msg>>;
}

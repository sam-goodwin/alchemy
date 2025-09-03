import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { Queue } from "../queue.ts";

export class Messages extends Queue("queue")<{
  key: string;
  value: string;
}>() {}

export const messageProcessor = Messages.forBatch(
  Effect.fn(function* (batch) {
    for (const message of batch.messages) {
      yield* Console.log(message);
    }
  }),
);

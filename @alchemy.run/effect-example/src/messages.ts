import * as Alchemy from "@alchemy.run/effect";
import * as AWS from "@alchemy.run/effect-aws";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";

// schema
export const Message = S.Struct({
  id: S.Int,
  value: S.String,
});

// resource declaration
export class Messages extends AWS.SQS.Queue("messages", {
  fifo: true,
  message: Message,
}) {}

// business logic
export const consumer = Messages.consume(
  Effect.fn(function* (batch) {
    for (const record of batch.Records) {
      console.log(record);
    }
  }),
);

// runtime handler
export default consumer.pipe(
  Effect.provide(AWS.SQS.clientFromEnv),
  AWS.Lambda.toHandler,
);

// infrastructure
export class Consumer extends AWS.Lambda.make(consumer, {
  main: import.meta.file,
  policy: Alchemy.bound(AWS.SQS.Consume(Messages)),
}) {}

import * as Alchemy from "@alchemy.run/effect";
import * as AWS from "@alchemy.run/effect-aws";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import { Message, Messages } from "./messages.ts";

// resource declarations (stateless)
export class Api extends AWS.Lambda.Function("api", {
  url: true,
}) {}

// biz logic declaration
export const api = Api.serve(
  Effect.fn(function* (req) {
    const msg = yield* S.validate(Message)(req.body);
    yield* AWS.SQS.sendMessage(Messages, msg).pipe(
      Effect.catchAll(() => Effect.void),
    );
    return {
      statusCode: 200,
      body: JSON.stringify(null),
    };
  }),
);

// runtime handler
export default api.pipe(
  Effect.provide(AWS.SQS.clientFromEnv),
  AWS.Lambda.toHandler,
);

// infrastructure (as effect)
export class ApiFunction extends AWS.Lambda.make(api, {
  main: import.meta.path,
  policy: Alchemy.bound(AWS.SQS.SendMessage(Messages)),
}) {}

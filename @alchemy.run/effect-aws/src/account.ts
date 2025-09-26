import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as STS from "./sts.ts";

export class FailedToGetAccount extends Data.TaggedError(
  "AWS::Account::FailedToGetAccount",
)<{
  message: string;
  cause: Error;
}> {}

export class AccountID extends Context.Tag("AWS::AccountID")<
  AccountID,
  string
>() {}

export const fromIdentity = Layer.effect(
  AccountID,
  Effect.gen(function* () {
    const sts = yield* STS.STSClient;
    const identity = yield* sts.getCallerIdentity({}).pipe(
      Effect.catchAll(
        (err) =>
          new FailedToGetAccount({
            message: "Failed to look up account ID",
            cause: err,
          }),
      ),
    );
    return identity.Account!;
  }),
);

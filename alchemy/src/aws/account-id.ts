import { Effect } from "effect";
import { createAwsClient, type AwsError } from "./client.ts";

export type AccountId = string & {
  readonly __brand: "AccountId";
};

/**
 * Helper to get the current AWS account ID using Effect-based API
 */
export function AccountId(): Effect.Effect<AccountId, AwsError> {
  return Effect.gen(function* () {
    const client = yield* createAwsClient({ service: "sts" });
    const identity = yield* client.postJson<{
      GetCallerIdentityResult: { Account: string };
    }>("/", {
      Action: "GetCallerIdentity",
      Version: "2011-06-15",
    });
    return identity.GetCallerIdentityResult.Account as AccountId;
  });
}

/**
 * Helper to get the current AWS account ID as a Promise (for backwards compatibility)
 */
export async function getAccountId(): Promise<AccountId> {
  return Effect.runPromise(AccountId());
}

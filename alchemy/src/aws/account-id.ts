import { GetCallerIdentityCommand, STSClient } from "@aws-sdk/client-sts";

const sts = new STSClient({
  endpoint: process.env.AWS_ENDPOINT,
});

export type AccountId = string & {
  readonly __brand: "AccountId";
};

/**
 * Helper to get the current AWS account ID
 */
export async function AccountId(): Promise<AccountId> {
  const identity = await sts.send(new GetCallerIdentityCommand({}));
  return identity.Account! as AccountId;
}

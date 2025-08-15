import { importPeer } from "../util/peer.ts";

export type AccountId = string & {
  readonly __brand: "AccountId";
};

/**
 * Helper to get the current AWS account ID
 */
export async function AccountId(): Promise<AccountId> {
  const { GetCallerIdentityCommand, STSClient } = await importPeer(
    "@aws-sdk/client-sts",
    import("@aws-sdk/client-sts"),
    "aws::AccountId",
  );
  const sts = new STSClient({});
  const identity = await sts.send(new GetCallerIdentityCommand({}));
  return identity.Account! as AccountId;
}

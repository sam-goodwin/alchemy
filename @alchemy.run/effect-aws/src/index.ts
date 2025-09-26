export * as Account from "./account.ts";
export * as Credentials from "./credentials.ts";
export * as IAM from "./iam.ts";
export * as Lambda from "./lambda.ts";
export * as Region from "./region.ts";
export * as S3 from "./s3.ts";
export * as SQS from "./sqs.ts";
export * as STS from "./sts.ts";

import * as Layer from "effect/Layer";
import * as Account from "./account.ts";
import * as Credentials from "./credentials.ts";
import * as IAM from "./iam.ts";
import * as Lambda from "./lambda.ts";
import * as Region from "./region.ts";
import * as S3 from "./s3.ts";
import * as SQS from "./sqs.ts";
import * as STS from "./sts.ts";

export const providers = Layer.merge(
  Layer.provide(Lambda.provider, Lambda.client),
  Layer.provide(SQS.provider, SQS.client),
);

export const clients = Layer.mergeAll(
  STS.client,
  IAM.client,
  S3.client,
  SQS.client,
  Lambda.client,
);

export const defaultProviders = providers.pipe(
  Layer.provideMerge(Account.fromIdentity),
  Layer.provide(clients),
);

export const layer = defaultProviders.pipe(
  Layer.provide(Region.fromEnv),
  Layer.provide(Credentials.fromChain),
);

import * as Context from "effect/Context";
import { STS } from "itty-aws/sts";
import { createAWSServiceClientLayer } from "./client.ts";

export class STSClient extends Context.Tag("AWS::STS::Client")<
  STSClient,
  STS
>() {}

export const client = createAWSServiceClientLayer<typeof STSClient, STS>(
  STSClient,
  STS,
);

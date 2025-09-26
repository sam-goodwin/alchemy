import * as Context from "effect/Context";
import { S3 } from "itty-aws/s3";
import { createAWSServiceClientLayer } from "./client.ts";

export class S3Client extends Context.Tag("AWS::S3::Client")<S3Client, S3>() {}

export const client = createAWSServiceClientLayer<typeof S3Client, S3>(
  S3Client,
  S3,
);

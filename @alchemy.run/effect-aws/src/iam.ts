import * as Context from "effect/Context";
import { IAM } from "itty-aws/iam";
import { createAWSServiceClientLayer } from "./client.ts";

export class IAMClient extends Context.Tag("AWS::IAM::Client")<
  IAMClient,
  IAM
>() {}

export const client = createAWSServiceClientLayer<typeof IAMClient, IAM>(
  IAMClient,
  IAM,
);

export interface PolicyDocument {
  Version: "2012-10-17";
  Statement: PolicyStatement[];
}

export interface PolicyStatement {
  Effect: "Allow" | "Deny";
  Sid?: string;
  Action: string[];
  Resource: string | string[];
  Condition?: Record<string, Record<string, string | string[]>>;
  Principal?: Record<string, string | string[]>;
  NotPrincipal?: Record<string, string | string[]>;
  NotAction?: string[];
  NotResource?: string[];
}

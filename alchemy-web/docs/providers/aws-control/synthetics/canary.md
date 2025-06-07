---
title: Managing AWS Synthetics Canarys with Alchemy
description: Learn how to create, update, and manage AWS Synthetics Canarys using Alchemy Cloud Control.
---

# Canary

The Canary resource allows you to create and manage [AWS Synthetics Canarys](https://docs.aws.amazon.com/synthetics/latest/userguide/) which help you monitor your endpoints and APIs by running scripts that simulate user interactions.

## Minimal Example

Create a basic Canary with the required properties and a common optional property for scheduling.

```ts
import AWS from "alchemy/aws/control";

const BasicCanary = await AWS.Synthetics.Canary("BasicCanary", {
  Name: "MyFirstCanary",
  RuntimeVersion: "syn-nodejs-2.0",
  Code: {
    Handler: "index.handler",
    Script: "exports.handler = async (event) => { return 'Hello from MyFirstCanary!'; };"
  },
  Schedule: {
    Expression: "rate(5 minutes)"
  },
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/myCanaryExecutionRole",
  ArtifactS3Location: "s3://my-canary-artifacts/",
});
```

## Advanced Configuration

Configure a Canary with VPC settings, success and failure retention periods, and artifact configuration.

```ts
const VPCConfiguredCanary = await AWS.Synthetics.Canary("VPCConfiguredCanary", {
  Name: "MyVPCCanary",
  RuntimeVersion: "syn-nodejs-2.0",
  Code: {
    Handler: "index.handler",
    Script: "exports.handler = async (event) => { return 'Hello from MyVPCCanary!'; };"
  },
  Schedule: {
    Expression: "rate(10 minutes)"
  },
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/myCanaryExecutionRole",
  ArtifactS3Location: "s3://my-vpc-canary-artifacts/",
  VPCConfig: {
    VpcId: "vpc-abcdef123",
    SubnetIds: ["subnet-abc123", "subnet-def456"],
    SecurityGroupIds: ["sg-abc123"]
  },
  SuccessRetentionPeriod: 30,
  FailureRetentionPeriod: 14,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Synthetics" }
  ]
});
```

## Run Configuration Example

Set up a Canary with custom run settings to control its execution behavior.

```ts
const CustomRunConfigCanary = await AWS.Synthetics.Canary("CustomRunConfigCanary", {
  Name: "MyCustomRunConfigCanary",
  RuntimeVersion: "syn-nodejs-2.0",
  Code: {
    Handler: "index.handler",
    Script: "exports.handler = async (event) => { return 'Hello from MyCustomRunConfigCanary!'; };"
  },
  Schedule: {
    Expression: "rate(15 minutes)"
  },
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/myCanaryExecutionRole",
  ArtifactS3Location: "s3://my-custom-canary-artifacts/",
  RunConfig: {
    TimeoutInSeconds: 60,
    MemoryInMB: 128
  }
});
```
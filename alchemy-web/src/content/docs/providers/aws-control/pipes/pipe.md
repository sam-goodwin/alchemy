---
title: Pipe
description: Learn how to create, update, and manage AWS Pipes Pipes using Alchemy Cloud Control.
---


The Pipe resource lets you create and manage [AWS Pipes](https://docs.aws.amazon.com/pipes/latest/userguide/) for orchestrating data flows between AWS services.

## Minimal Example

Create a basic pipe that connects an event source to a target with a simple enrichment.

```ts
import AWS from "alchemy/aws/control";

const basicPipe = await AWS.Pipes.Pipe("basicPipe", {
  source: "aws:events:source",
  target: "aws:lambda:targetFunction",
  roleArn: "arn:aws:iam::123456789012:role/service-role/my-pipe-role",
  enrichment: "aws:events:enrichmentFunction",
  description: "A basic pipe connecting event sources to a Lambda function."
});
```

## Advanced Configuration

Configure a pipe with detailed target parameters and logging options.

```ts
const advancedPipe = await AWS.Pipes.Pipe("advancedPipe", {
  source: "aws:sqs:myQueue",
  target: "aws:lambda:myFunction",
  roleArn: "arn:aws:iam::123456789012:role/service-role/my-pipe-role",
  targetParameters: {
    functionName: "myFunction",
    payload: {
      key1: "value1",
      key2: "value2"
    }
  },
  logConfiguration: {
    logDriver: "awslogs",
    options: {
      "awslogs-group": "/aws/pipes/advancedPipe",
      "awslogs-region": "us-east-1",
      "awslogs-stream-prefix": "pipe"
    }
  },
  description: "An advanced pipe with additional target parameters and logging."
});
```

## Using KMS for Encryption

Create a pipe that uses a KMS key for data encryption.

```ts
const encryptedPipe = await AWS.Pipes.Pipe("encryptedPipe", {
  source: "aws:s3:myBucket",
  target: "aws:sqs:myQueue",
  roleArn: "arn:aws:iam::123456789012:role/service-role/my-pipe-role",
  kmsKeyIdentifier: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-a1b2-3c4d-5e6f-7g8h9i0j1k2l",
  description: "A pipe that encrypts data using a specified KMS key."
});
```

## Handling Errors with Retry Policy

Configure a pipe with a retry policy to handle errors when connecting to the target.

```ts
const retryPipe = await AWS.Pipes.Pipe("retryPipe", {
  source: "aws:events:source",
  target: "aws:lambda:retryFunction",
  roleArn: "arn:aws:iam::123456789012:role/service-role/my-pipe-role",
  desiredState: "ACTIVE",
  targetParameters: {
    maxRetries: 5,
    retryInterval: 10 // seconds
  },
  description: "A pipe with a retry policy for error handling."
});
```

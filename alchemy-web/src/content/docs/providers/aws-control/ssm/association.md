---
title: Association
description: Learn how to create, update, and manage AWS SSM Associations using Alchemy Cloud Control.
---


The Association resource lets you create, update, and manage [AWS SSM Associations](https://docs.aws.amazon.com/ssm/latest/userguide/) which define a set of actions to be performed on specified managed instances.

## Minimal Example

Create a basic SSM Association that specifies a document to be executed on a single instance.

```ts
import AWS from "alchemy/aws/control";

const association = await AWS.SSM.Association("basicAssociation", {
  name: "AWS-RunShellScript",
  instanceId: "i-0abcd1234efgh5678",
  parameters: {
    commands: ["echo 'Hello, World!'"]
  }
});
```

## Advanced Configuration

Configure an SSM Association with a schedule expression and additional parameters for enhanced functionality.

```ts
const scheduledAssociation = await AWS.SSM.Association("scheduledAssociation", {
  name: "AWS-RunShellScript",
  instanceId: "i-0abcd1234efgh5678",
  parameters: {
    commands: ["echo 'Scheduled Task Executed'"]
  },
  scheduleExpression: "cron(0 12 * * ? *)", // Every day at 12 PM UTC
  complianceSeverity: "CRITICAL",
  maxErrors: "1",
  maxConcurrency: "50%"
});
```

## Using Targets

Create an SSM Association that targets multiple instances based on specified criteria.

```ts
const targetAssociation = await AWS.SSM.Association("targetAssociation", {
  name: "AWS-RunShellScript",
  targets: [
    {
      key: "tag:Environment",
      values: ["Production"]
    }
  ],
  parameters: {
    commands: ["echo 'Executed on Production Instances'"]
  }
});
```

## Output Location Configuration

Set up an SSM Association with an output location to store results of the command execution.

```ts
const outputLocationAssociation = await AWS.SSM.Association("outputLocationAssociation", {
  name: "AWS-RunShellScript",
  instanceId: "i-0abcd1234efgh5678",
  parameters: {
    commands: ["echo 'Output is being stored'"]
  },
  outputLocation: {
    S3Location: {
      outputS3BucketName: "my-ssm-output-bucket",
      outputS3KeyPrefix: "ssm-output/"
    }
  }
});
```

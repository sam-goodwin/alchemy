---
title: LogGroup
description: Learn how to create, update, and manage AWS Logs LogGroups using Alchemy Cloud Control.
---


The LogGroup resource lets you manage [AWS Logs LogGroups](https://docs.aws.amazon.com/logs/latest/userguide/) which act as containers for log streams that share the same retention, monitoring, and access control settings.

## Minimal Example

Create a basic LogGroup with a retention policy and a tag.

```ts
import AWS from "alchemy/aws/control";

const logGroup = await AWS.Logs.LogGroup("myLogGroup", {
  logGroupName: "MyApplicationLogs",
  retentionInDays: 14,
  tags: [{
    key: "Environment",
    value: "Production"
  }]
});
```

## Advanced Configuration

Configure a LogGroup with a custom KMS key and field index policies.

```ts
const secureLogGroup = await AWS.Logs.LogGroup("secureLogGroup", {
  logGroupName: "SecureApplicationLogs",
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  fieldIndexPolicies: [{
    field: "userId",
    index: "true"
  }],
  retentionInDays: 30,
  tags: [{
    key: "Application",
    value: "MySecureApp"
  }]
});
```

## Adoption of Existing LogGroup

Adopt an existing LogGroup instead of failing if it already exists.

```ts
const existingLogGroup = await AWS.Logs.LogGroup("existingLogGroup", {
  logGroupName: "ExistingApplicationLogs",
  adopt: true
});
```

## Data Protection Policy

Create a LogGroup with a data protection policy for enhanced security.

```ts
const protectedLogGroup = await AWS.Logs.LogGroup("protectedLogGroup", {
  logGroupName: "ProtectedApplicationLogs",
  dataProtectionPolicy: {
    version: "2012-10-17",
    statement: [{
      effect: "Allow",
      action: "logs:PutLogEvents",
      resource: "arn:aws:logs:us-west-2:123456789012:log-group:ProtectedApplicationLogs:*",
      condition: {
        test: "StringEquals",
        variable: "aws:username",
        values: ["admin"]
      }
    }]
  },
  retentionInDays: 365
});
```

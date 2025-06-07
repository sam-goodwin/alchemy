---
title: Managing AWS Logs LogGroups with Alchemy
description: Learn how to create, update, and manage AWS Logs LogGroups using Alchemy Cloud Control.
---

# LogGroup

The LogGroup resource allows you to manage [AWS Logs LogGroups](https://docs.aws.amazon.com/logs/latest/userguide/) for aggregating and monitoring logs from various AWS services.

## Minimal Example

Create a basic LogGroup with a retention policy of 14 days.

```ts
import AWS from "alchemy/aws/control";

const BasicLogGroup = await AWS.Logs.LogGroup("BasicLogGroup", {
  LogGroupName: "MyBasicLogGroup",
  RetentionInDays: 14
});
```

## Advanced Configuration

Configure a LogGroup with additional settings, including a custom KMS key for encryption and a data protection policy.

```ts
import AWS from "alchemy/aws/control";

const AdvancedLogGroup = await AWS.Logs.LogGroup("AdvancedLogGroup", {
  LogGroupName: "MyAdvancedLogGroup",
  RetentionInDays: 30,
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  DataProtectionPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "logs.amazonaws.com"
        },
        Action: "kms:Decrypt",
        Resource: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
      }
    ]
  })
});
```

## Custom Indexing Policies

Define a LogGroup with custom field indexing policies for enhanced search capabilities.

```ts
import AWS from "alchemy/aws/control";

const IndexedLogGroup = await AWS.Logs.LogGroup("IndexedLogGroup", {
  LogGroupName: "MyIndexedLogGroup",
  FieldIndexPolicies: [{
    Field: "userId",
    Index: true
  }, {
    Field: "eventType",
    Index: true
  }],
  RetentionInDays: 90
});
```

## Tagging for Resource Management

Create a LogGroup with tags for better resource management and categorization.

```ts
import AWS from "alchemy/aws/control";

const TaggedLogGroup = await AWS.Logs.LogGroup("TaggedLogGroup", {
  LogGroupName: "MyTaggedLogGroup",
  RetentionInDays: 60,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```
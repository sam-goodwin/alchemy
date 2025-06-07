---
title: Managing AWS Athena WorkGroups with Alchemy
description: Learn how to create, update, and manage AWS Athena WorkGroups using Alchemy Cloud Control.
---

# WorkGroup

The WorkGroup resource lets you manage [AWS Athena WorkGroups](https://docs.aws.amazon.com/athena/latest/userguide/) which allow you to configure query execution and resource management for your Athena queries.

## Minimal Example

Create a basic Athena WorkGroup with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const DefaultWorkGroup = await AWS.Athena.WorkGroup("DefaultWorkGroup", {
  Name: "DefaultWorkGroup",
  State: "ENABLED",
  Description: "This is the default workgroup for Athena queries.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure an Athena WorkGroup with a recursive delete option and custom workgroup configuration.

```ts
const CustomWorkGroup = await AWS.Athena.WorkGroup("CustomWorkGroup", {
  Name: "CustomWorkGroup",
  State: "ENABLED",
  RecursiveDeleteOption: true,
  WorkGroupConfiguration: {
    ResultConfiguration: {
      OutputLocation: "s3://my-athena-results/",
      EncryptionConfiguration: {
        EncryptionOption: "SSE_S3"
      }
    },
    EnforceWorkGroupConfiguration: true,
    PublishCloudWatchMetricsEnabled: true
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "Analytics" }
  ]
});
```

## Query Execution Settings

Create a WorkGroup that uses specific query execution settings.

```ts
const QueryExecutionWorkGroup = await AWS.Athena.WorkGroup("QueryExecutionWorkGroup", {
  Name: "QueryExecutionWorkGroup",
  State: "ENABLED",
  WorkGroupConfiguration: {
    ResultConfiguration: {
      OutputLocation: "s3://my-athena-query-results/",
      EncryptionConfiguration: {
        EncryptionOption: "SSE_KMS",
        KmsKey: "arn:aws:kms:us-west-2:123456789012:key/abcde123-4567-890a-bcde-fghijklmno"
      }
    },
    EnforceWorkGroupConfiguration: true,
    PublishCloudWatchMetricsEnabled: true,
    RequesterPaysEnabled: false
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DataScience" }
  ]
});
```
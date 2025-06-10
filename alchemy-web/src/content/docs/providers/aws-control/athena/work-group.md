---
title: WorkGroup
description: Learn how to create, update, and manage AWS Athena WorkGroups using Alchemy Cloud Control.
---


The WorkGroup resource lets you manage [AWS Athena WorkGroups](https://docs.aws.amazon.com/athena/latest/userguide/) and their configurations for query execution and resource management.

## Minimal Example

Create a basic Athena WorkGroup with required properties and a common optional setting.

```ts
import AWS from "alchemy/aws/control";

const workGroup = await AWS.Athena.WorkGroup("primaryWorkGroup", {
  name: "primary-workgroup",
  description: "Primary WorkGroup for standard query executions",
  recursiveDeleteOption: false
});
```

## Advanced Configuration

Configure a WorkGroup with advanced settings including custom WorkGroup configuration options.

```ts
const advancedWorkGroup = await AWS.Athena.WorkGroup("advancedWorkGroup", {
  name: "advanced-workgroup",
  description: "Advanced WorkGroup with specific configurations",
  recursiveDeleteOption: true,
  workGroupConfiguration: {
    resultConfiguration: {
      outputLocation: "s3://my-athena-results-bucket/",
      encryptionConfiguration: {
        encryptionOption: "SSE_S3"
      }
    },
    enforceWorkGroupConfiguration: true,
    requesterPays: false
  }
});
```

## Using Tags for Organization

Create a WorkGroup that includes tags for better organization and management.

```ts
const taggedWorkGroup = await AWS.Athena.WorkGroup("taggedWorkGroup", {
  name: "tagged-workgroup",
  description: "WorkGroup with tagging for cost allocation",
  tags: [
    {
      key: "Project",
      value: "DataAnalytics"
    },
    {
      key: "Environment",
      value: "Production"
    }
  ]
});
```

## Setting WorkGroup State

Create a WorkGroup with a specified state to manage its availability.

```ts
const stateWorkGroup = await AWS.Athena.WorkGroup("stateWorkGroup", {
  name: "state-workgroup",
  description: "WorkGroup with set state",
  state: "ENABLED" // Options are ENABLED or DISABLED
});
```

---
title: Managing AWS Omics SequenceStores with Alchemy
description: Learn how to create, update, and manage AWS Omics SequenceStores using Alchemy Cloud Control.
---

# SequenceStore

The SequenceStore resource lets you create and manage [AWS Omics SequenceStores](https://docs.aws.amazon.com/omics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-omics-sequencestore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const sequencestore = await AWS.Omics.SequenceStore("sequencestore-example", {
  Name: "sequencestore-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A sequencestore resource managed by Alchemy",
});
```

## Advanced Configuration

Create a sequencestore with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSequenceStore = await AWS.Omics.SequenceStore("advanced-sequencestore", {
  Name: "sequencestore-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A sequencestore resource managed by Alchemy",
});
```


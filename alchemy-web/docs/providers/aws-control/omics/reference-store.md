---
title: Managing AWS Omics ReferenceStores with Alchemy
description: Learn how to create, update, and manage AWS Omics ReferenceStores using Alchemy Cloud Control.
---

# ReferenceStore

The ReferenceStore resource lets you create and manage [AWS Omics ReferenceStores](https://docs.aws.amazon.com/omics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-omics-referencestore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const referencestore = await AWS.Omics.ReferenceStore("referencestore-example", {
  Name: "referencestore-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A referencestore resource managed by Alchemy",
});
```

## Advanced Configuration

Create a referencestore with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedReferenceStore = await AWS.Omics.ReferenceStore("advanced-referencestore", {
  Name: "referencestore-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A referencestore resource managed by Alchemy",
});
```


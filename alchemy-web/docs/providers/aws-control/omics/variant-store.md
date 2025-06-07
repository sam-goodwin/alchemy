---
title: Managing AWS Omics VariantStores with Alchemy
description: Learn how to create, update, and manage AWS Omics VariantStores using Alchemy Cloud Control.
---

# VariantStore

The VariantStore resource lets you create and manage [AWS Omics VariantStores](https://docs.aws.amazon.com/omics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-omics-variantstore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const variantstore = await AWS.Omics.VariantStore("variantstore-example", {
  Reference: "example-reference",
  Name: "variantstore-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A variantstore resource managed by Alchemy",
});
```

## Advanced Configuration

Create a variantstore with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVariantStore = await AWS.Omics.VariantStore("advanced-variantstore", {
  Reference: "example-reference",
  Name: "variantstore-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A variantstore resource managed by Alchemy",
});
```


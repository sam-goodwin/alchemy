---
title: Managing AWS Evidently Features with Alchemy
description: Learn how to create, update, and manage AWS Evidently Features using Alchemy Cloud Control.
---

# Feature

The Feature resource lets you create and manage [AWS Evidently Features](https://docs.aws.amazon.com/evidently/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const feature = await AWS.Evidently.Feature("feature-example", {
  Project: "example-project",
  Variations: [],
  Name: "feature-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A feature resource managed by Alchemy",
});
```

## Advanced Configuration

Create a feature with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFeature = await AWS.Evidently.Feature("advanced-feature", {
  Project: "example-project",
  Variations: [],
  Name: "feature-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A feature resource managed by Alchemy",
});
```


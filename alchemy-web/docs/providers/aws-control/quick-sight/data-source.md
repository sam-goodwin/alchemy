---
title: Managing AWS QuickSight DataSources with Alchemy
description: Learn how to create, update, and manage AWS QuickSight DataSources using Alchemy Cloud Control.
---

# DataSource

The DataSource resource lets you create and manage [AWS QuickSight DataSources](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-datasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datasource = await AWS.QuickSight.DataSource("datasource-example", {
  Name: "datasource-",
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a datasource with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataSource = await AWS.QuickSight.DataSource("advanced-datasource", {
  Name: "datasource-",
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


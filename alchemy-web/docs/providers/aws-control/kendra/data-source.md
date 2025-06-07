---
title: Managing AWS Kendra DataSources with Alchemy
description: Learn how to create, update, and manage AWS Kendra DataSources using Alchemy Cloud Control.
---

# DataSource

The DataSource resource lets you create and manage [AWS Kendra DataSources](https://docs.aws.amazon.com/kendra/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datasource = await AWS.Kendra.DataSource("datasource-example", {
  IndexId: "example-indexid",
  Type: "example-type",
  Name: "datasource-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A datasource resource managed by Alchemy",
});
```

## Advanced Configuration

Create a datasource with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataSource = await AWS.Kendra.DataSource("advanced-datasource", {
  IndexId: "example-indexid",
  Type: "example-type",
  Name: "datasource-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A datasource resource managed by Alchemy",
});
```


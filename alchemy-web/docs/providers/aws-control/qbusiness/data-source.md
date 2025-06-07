---
title: Managing AWS QBusiness DataSources with Alchemy
description: Learn how to create, update, and manage AWS QBusiness DataSources using Alchemy Cloud Control.
---

# DataSource

The DataSource resource lets you create and manage [AWS QBusiness DataSources](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-datasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datasource = await AWS.QBusiness.DataSource("datasource-example", {
  IndexId: "example-indexid",
  Configuration: {},
  DisplayName: "datasource-display",
  ApplicationId: "example-applicationid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A datasource resource managed by Alchemy",
});
```

## Advanced Configuration

Create a datasource with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataSource = await AWS.QBusiness.DataSource("advanced-datasource", {
  IndexId: "example-indexid",
  Configuration: {},
  DisplayName: "datasource-display",
  ApplicationId: "example-applicationid",
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


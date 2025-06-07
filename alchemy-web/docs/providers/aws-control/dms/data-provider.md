---
title: Managing AWS DMS DataProviders with Alchemy
description: Learn how to create, update, and manage AWS DMS DataProviders using Alchemy Cloud Control.
---

# DataProvider

The DataProvider resource lets you create and manage [AWS DMS DataProviders](https://docs.aws.amazon.com/dms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-dataprovider.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataprovider = await AWS.DMS.DataProvider("dataprovider-example", {
  Engine: "example-engine",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A dataprovider resource managed by Alchemy",
});
```

## Advanced Configuration

Create a dataprovider with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataProvider = await AWS.DMS.DataProvider("advanced-dataprovider", {
  Engine: "example-engine",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A dataprovider resource managed by Alchemy",
  Settings: "example-settings",
});
```


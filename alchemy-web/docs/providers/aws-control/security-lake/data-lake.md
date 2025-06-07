---
title: Managing AWS SecurityLake DataLakes with Alchemy
description: Learn how to create, update, and manage AWS SecurityLake DataLakes using Alchemy Cloud Control.
---

# DataLake

The DataLake resource lets you create and manage [AWS SecurityLake DataLakes](https://docs.aws.amazon.com/securitylake/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securitylake-datalake.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datalake = await AWS.SecurityLake.DataLake("datalake-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a datalake with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataLake = await AWS.SecurityLake.DataLake("advanced-datalake", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


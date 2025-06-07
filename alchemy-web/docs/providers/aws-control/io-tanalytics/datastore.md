---
title: Managing AWS IoTAnalytics Datastores with Alchemy
description: Learn how to create, update, and manage AWS IoTAnalytics Datastores using Alchemy Cloud Control.
---

# Datastore

The Datastore resource lets you create and manage [AWS IoTAnalytics Datastores](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotanalytics-datastore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datastore = await AWS.IoTAnalytics.Datastore("datastore-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a datastore with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDatastore = await AWS.IoTAnalytics.Datastore("advanced-datastore", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


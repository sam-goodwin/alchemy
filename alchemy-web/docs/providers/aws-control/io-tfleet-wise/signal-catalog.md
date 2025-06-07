---
title: Managing AWS IoTFleetWise SignalCatalogs with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetWise SignalCatalogs using Alchemy Cloud Control.
---

# SignalCatalog

The SignalCatalog resource lets you create and manage [AWS IoTFleetWise SignalCatalogs](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotfleetwise-signalcatalog.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const signalcatalog = await AWS.IoTFleetWise.SignalCatalog("signalcatalog-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A signalcatalog resource managed by Alchemy",
});
```

## Advanced Configuration

Create a signalcatalog with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSignalCatalog = await AWS.IoTFleetWise.SignalCatalog("advanced-signalcatalog", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A signalcatalog resource managed by Alchemy",
});
```


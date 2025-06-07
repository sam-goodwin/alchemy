---
title: Managing AWS FSx Volumes with Alchemy
description: Learn how to create, update, and manage AWS FSx Volumes using Alchemy Cloud Control.
---

# Volume

The Volume resource lets you create and manage [AWS FSx Volumes](https://docs.aws.amazon.com/fsx/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-volume.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const volume = await AWS.FSx.Volume("volume-example", {
  Name: "volume-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a volume with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVolume = await AWS.FSx.Volume("advanced-volume", {
  Name: "volume-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


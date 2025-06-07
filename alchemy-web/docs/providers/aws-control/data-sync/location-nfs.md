---
title: Managing AWS DataSync LocationNFSs with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationNFSs using Alchemy Cloud Control.
---

# LocationNFS

The LocationNFS resource lets you create and manage [AWS DataSync LocationNFSs](https://docs.aws.amazon.com/datasync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datasync-locationnfs.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const locationnfs = await AWS.DataSync.LocationNFS("locationnfs-example", {
  OnPremConfig: "example-onpremconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a locationnfs with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLocationNFS = await AWS.DataSync.LocationNFS("advanced-locationnfs", {
  OnPremConfig: "example-onpremconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


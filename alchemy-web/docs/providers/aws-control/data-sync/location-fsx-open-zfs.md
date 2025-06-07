---
title: Managing AWS DataSync LocationFSxOpenZFSs with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationFSxOpenZFSs using Alchemy Cloud Control.
---

# LocationFSxOpenZFS

The LocationFSxOpenZFS resource lets you create and manage [AWS DataSync LocationFSxOpenZFSs](https://docs.aws.amazon.com/datasync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datasync-locationfsxopenzfs.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const locationfsxopenzfs = await AWS.DataSync.LocationFSxOpenZFS("locationfsxopenzfs-example", {
  Protocol: "example-protocol",
  SecurityGroupArns: ["example-securitygrouparns-1"],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a locationfsxopenzfs with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLocationFSxOpenZFS = await AWS.DataSync.LocationFSxOpenZFS(
  "advanced-locationfsxopenzfs",
  {
    Protocol: "example-protocol",
    SecurityGroupArns: ["example-securitygrouparns-1"],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


---
title: Managing AWS Lightsail Disks with Alchemy
description: Learn how to create, update, and manage AWS Lightsail Disks using Alchemy Cloud Control.
---

# Disk

The Disk resource lets you create and manage [AWS Lightsail Disks](https://docs.aws.amazon.com/lightsail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lightsail-disk.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const disk = await AWS.Lightsail.Disk("disk-example", {
  SizeInGb: 1,
  DiskName: "disk-disk",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a disk with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDisk = await AWS.Lightsail.Disk("advanced-disk", {
  SizeInGb: 1,
  DiskName: "disk-disk",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


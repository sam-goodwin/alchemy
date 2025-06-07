---
title: Managing AWS DataSync LocationObjectStorages with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationObjectStorages using Alchemy Cloud Control.
---

# LocationObjectStorage

The LocationObjectStorage resource lets you create and manage [AWS DataSync LocationObjectStorages](https://docs.aws.amazon.com/datasync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datasync-locationobjectstorage.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const locationobjectstorage = await AWS.DataSync.LocationObjectStorage(
  "locationobjectstorage-example",
  { Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a locationobjectstorage with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLocationObjectStorage = await AWS.DataSync.LocationObjectStorage(
  "advanced-locationobjectstorage",
  {
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


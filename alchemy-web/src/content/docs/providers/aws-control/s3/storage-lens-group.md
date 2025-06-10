---
title: StorageLensGroup
description: Learn how to create, update, and manage AWS S3 StorageLensGroups using Alchemy Cloud Control.
---


The `StorageLensGroup` resource lets you manage [AWS S3 StorageLensGroups](https://docs.aws.amazon.com/s3/latest/userguide/) for monitoring storage usage and activity across multiple S3 buckets.

## Minimal Example

Create a basic StorageLensGroup with a filter and name:

```ts
import AWS from "alchemy/aws/control";

const basicStorageLensGroup = await AWS.S3.StorageLensGroup("basicStorageLensGroup", {
  Filter: {
    Prefix: "logs/"
  },
  Name: "LogsStorageLensGroup"
});
```

This example demonstrates the creation of a minimal `StorageLensGroup` that filters for objects with the prefix `logs/`.

## Advanced Configuration

Configure a StorageLensGroup with tags for better organization and management:

```ts
const advancedStorageLensGroup = await AWS.S3.StorageLensGroup("advancedStorageLensGroup", {
  Filter: {
    Prefix: "images/"
  },
  Name: "ImagesStorageLensGroup",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Marketing"
    }
  ]
});
```

In this example, we create a `StorageLensGroup` that filters for objects with the prefix `images/` and adds tags for categorization.

## Adoption of Existing Resources

Create a StorageLensGroup that adopts an existing resource instead of failing if it already exists:

```ts
const adoptedStorageLensGroup = await AWS.S3.StorageLensGroup("adoptedStorageLensGroup", {
  Filter: {
    Prefix: "archive/"
  },
  Name: "ArchivedStorageLensGroup",
  adopt: true // Adopt existing resource if it already exists
});
```

This example illustrates how to set the `adopt` property to `true`, allowing the creation of a `StorageLensGroup` that can take over an existing one.

## Comprehensive Usage with Custom Filters

Create a StorageLensGroup with a more complex filter setup:

```ts
const comprehensiveStorageLensGroup = await AWS.S3.StorageLensGroup("comprehensiveStorageLensGroup", {
  Filter: {
    Prefix: "data/",
    Tag: {
      Key: "Project",
      Value: "Alpha"
    }
  },
  Name: "DataStorageLensGroup",
  Tags: [
    {
      Key: "Owner",
      Value: "DataTeam"
    }
  ]
});
```

In this example, we define a `StorageLensGroup` that filters for objects with the prefix `data/` and a specific tag, while also adding an ownership tag for better tracking.

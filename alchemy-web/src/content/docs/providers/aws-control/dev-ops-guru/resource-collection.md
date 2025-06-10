---
title: ResourceCollection
description: Learn how to create, update, and manage AWS DevOpsGuru ResourceCollections using Alchemy Cloud Control.
---


The ResourceCollection resource allows you to manage [AWS DevOpsGuru ResourceCollections](https://docs.aws.amazon.com/devopsguru/latest/userguide/) that help in identifying and organizing AWS resources for monitoring and automated insights.

## Minimal Example

Create a basic ResourceCollection with the required resource collection filter.

```ts
import AWS from "alchemy/aws/control";

const basicResourceCollection = await AWS.DevOpsGuru.ResourceCollection("basicResourceCollection", {
  ResourceCollectionFilter: {
    TagFilters: [
      {
        Key: "Environment",
        Values: ["Production"]
      }
    ]
  },
  adopt: true // Adopt existing resources if they already exist
});
```

## Advanced Configuration

Configure a ResourceCollection with multiple tag filters for more granular resource selection.

```ts
const advancedResourceCollection = await AWS.DevOpsGuru.ResourceCollection("advancedResourceCollection", {
  ResourceCollectionFilter: {
    TagFilters: [
      {
        Key: "Project",
        Values: ["WebApp"]
      },
      {
        Key: "Department",
        Values: ["Engineering"]
      }
    ]
  },
  adopt: false // Do not adopt existing resources
});
```

## Using Resource IDs

Create a ResourceCollection by specifying particular resource IDs for targeted monitoring.

```ts
const specificResourceCollection = await AWS.DevOpsGuru.ResourceCollection("specificResourceCollection", {
  ResourceCollectionFilter: {
    ResourceIds: [
      "arn:aws:ec2:us-west-2:123456789012:instance/i-0123456789abcdef0",
      "arn:aws:s3:::my-bucket"
    ]
  },
  adopt: true // Adopt existing resources if they already exist
});
```

## Combining Filters

Demonstrate how to combine tag filters and specific resource IDs in a single ResourceCollection.

```ts
const combinedResourceCollection = await AWS.DevOpsGuru.ResourceCollection("combinedResourceCollection", {
  ResourceCollectionFilter: {
    TagFilters: [
      {
        Key: "Application",
        Values: ["FinanceApp"]
      }
    ],
    ResourceIds: [
      "arn:aws:ecs:us-east-1:123456789012:cluster/my-cluster"
    ]
  },
  adopt: true // Adopt existing resources if they already exist
});
```

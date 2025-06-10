---
title: View
description: Learn how to create, update, and manage AWS ResourceExplorer2 Views using Alchemy Cloud Control.
---


The View resource allows you to manage [AWS ResourceExplorer2 Views](https://docs.aws.amazon.com/resourceexplorer2/latest/userguide/) for searching and filtering resources in your AWS account.

## Minimal Example

Create a basic view with a name and a filter to include only EC2 instances.

```ts
import AWS from "alchemy/aws/control";

const ec2View = await AWS.ResourceExplorer2.View("ec2-view", {
  ViewName: "EC2 Instances View",
  Filters: {
    ResourceType: "AWS::EC2::Instance"
  }
});
```

## Advanced Configuration

Configure a view with additional properties, including specific scopes and included properties.

```ts
const advancedView = await AWS.ResourceExplorer2.View("advanced-view", {
  ViewName: "Advanced Resource View",
  Filters: {
    ResourceType: "AWS::S3::Bucket"
  },
  Scope: "region",
  IncludedProperties: ["Name", "CreationTime", "Tags"]
});
```

## Tag-Based Filtering

Create a view that filters resources based on specific tags.

```ts
const taggedView = await AWS.ResourceExplorer2.View("tagged-view", {
  ViewName: "Tagged Resources View",
  Filters: {
    TagFilters: [
      {
        Key: "Environment",
        Values: ["Production"]
      }
    ]
  },
  Tags: {
    Team: "DevOps"
  }
});
```

## Resource Adoption

Create a view while enabling resource adoption if a view with the same name already exists.

```ts
const adoptExistingView = await AWS.ResourceExplorer2.View("adopt-existing-view", {
  ViewName: "Adopt Existing View",
  Filters: {
    ResourceType: "AWS::Lambda::Function"
  },
  adopt: true
});
```

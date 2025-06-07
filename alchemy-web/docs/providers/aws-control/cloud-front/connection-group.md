---
title: Managing AWS CloudFront ConnectionGroups with Alchemy
description: Learn how to create, update, and manage AWS CloudFront ConnectionGroups using Alchemy Cloud Control.
---

# ConnectionGroup

The ConnectionGroup resource lets you create and manage [AWS CloudFront ConnectionGroups](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-connectiongroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connectiongroup = await AWS.CloudFront.ConnectionGroup("connectiongroup-example", {
  Name: "connectiongroup-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a connectiongroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnectionGroup = await AWS.CloudFront.ConnectionGroup("advanced-connectiongroup", {
  Name: "connectiongroup-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


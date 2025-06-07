---
title: Managing AWS EC2 NetworkInsightsAccessScopes with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsAccessScopes using Alchemy Cloud Control.
---

# NetworkInsightsAccessScope

The NetworkInsightsAccessScope resource lets you create and manage [AWS EC2 NetworkInsightsAccessScopes](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightsaccessscope.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkinsightsaccessscope = await AWS.EC2.NetworkInsightsAccessScope(
  "networkinsightsaccessscope-example",
  { Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a networkinsightsaccessscope with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNetworkInsightsAccessScope = await AWS.EC2.NetworkInsightsAccessScope(
  "advanced-networkinsightsaccessscope",
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


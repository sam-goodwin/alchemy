---
title: Managing AWS EC2 NetworkInsightsPaths with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsPaths using Alchemy Cloud Control.
---

# NetworkInsightsPath

The NetworkInsightsPath resource lets you create and manage [AWS EC2 NetworkInsightsPaths](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightspath.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkinsightspath = await AWS.EC2.NetworkInsightsPath("networkinsightspath-example", {
  Protocol: "example-protocol",
  Source: "example-source",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a networkinsightspath with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNetworkInsightsPath = await AWS.EC2.NetworkInsightsPath(
  "advanced-networkinsightspath",
  {
    Protocol: "example-protocol",
    Source: "example-source",
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


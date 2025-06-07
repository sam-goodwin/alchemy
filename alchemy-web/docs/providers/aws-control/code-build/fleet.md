---
title: Managing AWS CodeBuild Fleets with Alchemy
description: Learn how to create, update, and manage AWS CodeBuild Fleets using Alchemy Cloud Control.
---

# Fleet

The Fleet resource lets you create and manage [AWS CodeBuild Fleets](https://docs.aws.amazon.com/codebuild/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codebuild-fleet.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const fleet = await AWS.CodeBuild.Fleet("fleet-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a fleet with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFleet = await AWS.CodeBuild.Fleet("advanced-fleet", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


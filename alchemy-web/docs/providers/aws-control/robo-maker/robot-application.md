---
title: Managing AWS RoboMaker RobotApplications with Alchemy
description: Learn how to create, update, and manage AWS RoboMaker RobotApplications using Alchemy Cloud Control.
---

# RobotApplication

The RobotApplication resource lets you create and manage [AWS RoboMaker RobotApplications](https://docs.aws.amazon.com/robomaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-robomaker-robotapplication.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const robotapplication = await AWS.RoboMaker.RobotApplication("robotapplication-example", {
  RobotSoftwareSuite: "example-robotsoftwaresuite",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a robotapplication with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRobotApplication = await AWS.RoboMaker.RobotApplication("advanced-robotapplication", {
  RobotSoftwareSuite: "example-robotsoftwaresuite",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


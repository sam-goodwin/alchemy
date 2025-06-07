---
title: Managing AWS StepFunctions Activitys with Alchemy
description: Learn how to create, update, and manage AWS StepFunctions Activitys using Alchemy Cloud Control.
---

# Activity

The Activity resource lets you create and manage [AWS StepFunctions Activitys](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-stepfunctions-activity.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const activity = await AWS.StepFunctions.Activity("activity-example", {
  Name: "activity-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a activity with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedActivity = await AWS.StepFunctions.Activity("advanced-activity", {
  Name: "activity-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


---
title: Managing AWS Redshift ScheduledActions with Alchemy
description: Learn how to create, update, and manage AWS Redshift ScheduledActions using Alchemy Cloud Control.
---

# ScheduledAction

The ScheduledAction resource lets you create and manage [AWS Redshift ScheduledActions](https://docs.aws.amazon.com/redshift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scheduledaction = await AWS.Redshift.ScheduledAction("scheduledaction-example", {
  ScheduledActionName: "scheduledaction-scheduledaction",
});
```


---
title: Managing AWS DataZone EnvironmentActionss with Alchemy
description: Learn how to create, update, and manage AWS DataZone EnvironmentActionss using Alchemy Cloud Control.
---

# EnvironmentActions

The EnvironmentActions resource lets you create and manage [AWS DataZone EnvironmentActionss](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-environmentactions.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environmentactions = await AWS.DataZone.EnvironmentActions("environmentactions-example", {
  Name: "environmentactions-",
  Description: "A environmentactions resource managed by Alchemy",
});
```

## Advanced Configuration

Create a environmentactions with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnvironmentActions = await AWS.DataZone.EnvironmentActions(
  "advanced-environmentactions",
  { Name: "environmentactions-", Description: "A environmentactions resource managed by Alchemy" }
);
```


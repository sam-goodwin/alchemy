---
title: Managing AWS Connect TaskTemplates with Alchemy
description: Learn how to create, update, and manage AWS Connect TaskTemplates using Alchemy Cloud Control.
---

# TaskTemplate

The TaskTemplate resource lets you create and manage [AWS Connect TaskTemplates](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-tasktemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const tasktemplate = await AWS.Connect.TaskTemplate("tasktemplate-example", {
  InstanceArn: "example-instancearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A tasktemplate resource managed by Alchemy",
});
```

## Advanced Configuration

Create a tasktemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTaskTemplate = await AWS.Connect.TaskTemplate("advanced-tasktemplate", {
  InstanceArn: "example-instancearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A tasktemplate resource managed by Alchemy",
});
```


---
title: Managing AWS Pinpoint PushTemplates with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint PushTemplates using Alchemy Cloud Control.
---

# PushTemplate

The PushTemplate resource lets you create and manage [AWS Pinpoint PushTemplates](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-pushtemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const pushtemplate = await AWS.Pinpoint.PushTemplate("pushtemplate-example", {
  TemplateName: "pushtemplate-template",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a pushtemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPushTemplate = await AWS.Pinpoint.PushTemplate("advanced-pushtemplate", {
  TemplateName: "pushtemplate-template",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


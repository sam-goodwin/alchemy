---
title: Managing AWS Pinpoint InAppTemplates with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint InAppTemplates using Alchemy Cloud Control.
---

# InAppTemplate

The InAppTemplate resource lets you create and manage [AWS Pinpoint InAppTemplates](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-inapptemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const inapptemplate = await AWS.Pinpoint.InAppTemplate("inapptemplate-example", {
  TemplateName: "inapptemplate-template",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a inapptemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInAppTemplate = await AWS.Pinpoint.InAppTemplate("advanced-inapptemplate", {
  TemplateName: "inapptemplate-template",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


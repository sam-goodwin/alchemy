---
title: Managing AWS IoT ProvisioningTemplates with Alchemy
description: Learn how to create, update, and manage AWS IoT ProvisioningTemplates using Alchemy Cloud Control.
---

# ProvisioningTemplate

The ProvisioningTemplate resource lets you create and manage [AWS IoT ProvisioningTemplates](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const provisioningtemplate = await AWS.IoT.ProvisioningTemplate("provisioningtemplate-example", {
  ProvisioningRoleArn: "example-provisioningrolearn",
  TemplateBody: "example-templatebody",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A provisioningtemplate resource managed by Alchemy",
});
```

## Advanced Configuration

Create a provisioningtemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProvisioningTemplate = await AWS.IoT.ProvisioningTemplate(
  "advanced-provisioningtemplate",
  {
    ProvisioningRoleArn: "example-provisioningrolearn",
    TemplateBody: "example-templatebody",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A provisioningtemplate resource managed by Alchemy",
  }
);
```


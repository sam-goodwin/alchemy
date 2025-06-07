---
title: Managing AWS IoT JobTemplates with Alchemy
description: Learn how to create, update, and manage AWS IoT JobTemplates using Alchemy Cloud Control.
---

# JobTemplate

The JobTemplate resource lets you create and manage [AWS IoT JobTemplates](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const jobtemplate = await AWS.IoT.JobTemplate("jobtemplate-example", {
  Description: "A jobtemplate resource managed by Alchemy",
  JobTemplateId: "example-jobtemplateid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a jobtemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedJobTemplate = await AWS.IoT.JobTemplate("advanced-jobtemplate", {
  Description: "A jobtemplate resource managed by Alchemy",
  JobTemplateId: "example-jobtemplateid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


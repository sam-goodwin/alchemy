---
title: Managing AWS FIS ExperimentTemplates with Alchemy
description: Learn how to create, update, and manage AWS FIS ExperimentTemplates using Alchemy Cloud Control.
---

# ExperimentTemplate

The ExperimentTemplate resource lets you create and manage [AWS FIS ExperimentTemplates](https://docs.aws.amazon.com/fis/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fis-experimenttemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const experimenttemplate = await AWS.FIS.ExperimentTemplate("experimenttemplate-example", {
  Description: "A experimenttemplate resource managed by Alchemy",
  StopConditions: [],
  Targets: {},
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```


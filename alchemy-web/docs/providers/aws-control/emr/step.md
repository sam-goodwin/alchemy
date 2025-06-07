---
title: Managing AWS EMR Steps with Alchemy
description: Learn how to create, update, and manage AWS EMR Steps using Alchemy Cloud Control.
---

# Step

The Step resource lets you create and manage [AWS EMR Steps](https://docs.aws.amazon.com/emr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-emr-step.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const step = await AWS.EMR.Step("step-example", {
  JobFlowId: "example-jobflowid",
  ActionOnFailure: "example-actiononfailure",
  HadoopJarStep: "example-hadoopjarstep",
  Name: "step-",
});
```


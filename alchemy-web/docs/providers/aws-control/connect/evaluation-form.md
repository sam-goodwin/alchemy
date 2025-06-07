---
title: Managing AWS Connect EvaluationForms with Alchemy
description: Learn how to create, update, and manage AWS Connect EvaluationForms using Alchemy Cloud Control.
---

# EvaluationForm

The EvaluationForm resource lets you create and manage [AWS Connect EvaluationForms](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-evaluationform.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const evaluationform = await AWS.Connect.EvaluationForm("evaluationform-example", {
  Status: "example-status",
  InstanceArn: "example-instancearn",
  Title: "example-title",
  Items: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A evaluationform resource managed by Alchemy",
});
```

## Advanced Configuration

Create a evaluationform with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEvaluationForm = await AWS.Connect.EvaluationForm("advanced-evaluationform", {
  Status: "example-status",
  InstanceArn: "example-instancearn",
  Title: "example-title",
  Items: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A evaluationform resource managed by Alchemy",
});
```


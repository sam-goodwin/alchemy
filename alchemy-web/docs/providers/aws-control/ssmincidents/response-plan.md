---
title: Managing AWS SSMIncidents ResponsePlans with Alchemy
description: Learn how to create, update, and manage AWS SSMIncidents ResponsePlans using Alchemy Cloud Control.
---

# ResponsePlan

The ResponsePlan resource lets you create and manage [AWS SSMIncidents ResponsePlans](https://docs.aws.amazon.com/ssmincidents/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmincidents-responseplan.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const responseplan = await AWS.SSMIncidents.ResponsePlan("responseplan-example", {
  IncidentTemplate: "example-incidenttemplate",
  Name: "responseplan-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a responseplan with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResponsePlan = await AWS.SSMIncidents.ResponsePlan("advanced-responseplan", {
  IncidentTemplate: "example-incidenttemplate",
  Name: "responseplan-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


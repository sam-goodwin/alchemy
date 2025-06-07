---
title: Managing AWS AuditManager Assessments with Alchemy
description: Learn how to create, update, and manage AWS AuditManager Assessments using Alchemy Cloud Control.
---

# Assessment

The Assessment resource lets you create and manage [AWS AuditManager Assessments](https://docs.aws.amazon.com/auditmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-auditmanager-assessment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const assessment = await AWS.AuditManager.Assessment("assessment-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A assessment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a assessment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAssessment = await AWS.AuditManager.Assessment("advanced-assessment", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A assessment resource managed by Alchemy",
});
```


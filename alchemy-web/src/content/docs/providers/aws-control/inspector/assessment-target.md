---
title: AssessmentTarget
description: Learn how to create, update, and manage AWS Inspector AssessmentTargets using Alchemy Cloud Control.
---


The AssessmentTarget resource lets you manage [AWS Inspector AssessmentTargets](https://docs.aws.amazon.com/inspector/latest/userguide/) which define the resources to be assessed for security vulnerabilities.

## Minimal Example

Create a basic AssessmentTarget with a name and a resource group ARN.

```ts
import AWS from "alchemy/aws/control";

const assessmentTarget = await AWS.Inspector.AssessmentTarget("basicAssessmentTarget", {
  assessmentTargetName: "MyAssessmentTarget",
  resourceGroupArn: "arn:aws:resource-groups:us-west-2:123456789012:resourcegroup:my-resource-group"
});
```

## Advanced Configuration

Configure an AssessmentTarget to adopt an existing resource if it already exists.

```ts
const advancedAssessmentTarget = await AWS.Inspector.AssessmentTarget("advancedAssessmentTarget", {
  assessmentTargetName: "MyAdvancedAssessmentTarget",
  resourceGroupArn: "arn:aws:resource-groups:us-west-2:123456789012:resourcegroup:my-advanced-resource-group",
  adopt: true
});
```

## Resource Group Example

Define an AssessmentTarget that includes a specific resource group for assessment.

```ts
const resourceGroupAssessmentTarget = await AWS.Inspector.AssessmentTarget("resourceGroupAssessmentTarget", {
  assessmentTargetName: "ResourceGroupAssessmentTarget",
  resourceGroupArn: "arn:aws:resource-groups:us-west-2:123456789012:resourcegroup:my-specific-resource-group"
});
```

## Multiple AssessmentTargets

Create multiple AssessmentTargets for different resource groups.

```ts
const assessmentTarget1 = await AWS.Inspector.AssessmentTarget("target1", {
  assessmentTargetName: "TargetOne",
  resourceGroupArn: "arn:aws:resource-groups:us-west-2:123456789012:resourcegroup:resource-group-one"
});

const assessmentTarget2 = await AWS.Inspector.AssessmentTarget("target2", {
  assessmentTargetName: "TargetTwo",
  resourceGroupArn: "arn:aws:resource-groups:us-west-2:123456789012:resourcegroup:resource-group-two"
});
```

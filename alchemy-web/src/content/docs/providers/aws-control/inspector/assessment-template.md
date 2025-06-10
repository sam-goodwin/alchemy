---
title: AssessmentTemplate
description: Learn how to create, update, and manage AWS Inspector AssessmentTemplates using Alchemy Cloud Control.
---


The AssessmentTemplate resource allows you to create and manage [AWS Inspector AssessmentTemplates](https://docs.aws.amazon.com/inspector/latest/userguide/) for automated security assessments of your AWS resources.

## Minimal Example

Create a basic assessment template with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAssessmentTemplate = await AWS.Inspector.AssessmentTemplate("basicAssessmentTemplate", {
  AssessmentTargetArn: "arn:aws:inspector:us-west-2:123456789012:target/0-abc12345",
  DurationInSeconds: 3600,
  AssessmentTemplateName: "Basic Assessment Template",
  RulesPackageArns: [
    "arn:aws:inspector:us-west-2:123456789012:rulespackage/0-abc12345"
  ]
});
```

## Advanced Configuration

Configure an assessment template with additional options, including user attributes for findings.

```ts
import AWS from "alchemy/aws/control";

const advancedAssessmentTemplate = await AWS.Inspector.AssessmentTemplate("advancedAssessmentTemplate", {
  AssessmentTargetArn: "arn:aws:inspector:us-west-2:123456789012:target/0-def67890",
  DurationInSeconds: 7200,
  AssessmentTemplateName: "Advanced Assessment",
  RulesPackageArns: [
    "arn:aws:inspector:us-west-2:123456789012:rulespackage/0-def67890"
  ],
  UserAttributesForFindings: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Scheduled Assessments

Create an assessment template that can be scheduled to run at regular intervals.

```ts
import AWS from "alchemy/aws/control";

const scheduledAssessmentTemplate = await AWS.Inspector.AssessmentTemplate("scheduledAssessmentTemplate", {
  AssessmentTargetArn: "arn:aws:inspector:us-west-2:123456789012:target/0-ghi12345",
  DurationInSeconds: 1800,
  AssessmentTemplateName: "Scheduled Assessment",
  RulesPackageArns: [
    "arn:aws:inspector:us-west-2:123456789012:rulespackage/0-ghi12345"
  ],
  UserAttributesForFindings: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

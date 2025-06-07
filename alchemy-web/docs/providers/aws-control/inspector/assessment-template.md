---
title: Managing AWS Inspector AssessmentTemplates with Alchemy
description: Learn how to create, update, and manage AWS Inspector AssessmentTemplates using Alchemy Cloud Control.
---

# AssessmentTemplate

The AssessmentTemplate resource lets you create and manage [AWS Inspector AssessmentTemplates](https://docs.aws.amazon.com/inspector/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-inspector-assessmenttemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const assessmenttemplate = await AWS.Inspector.AssessmentTemplate("assessmenttemplate-example", {
  AssessmentTargetArn: "example-assessmenttargetarn",
  DurationInSeconds: 1,
  RulesPackageArns: ["example-rulespackagearns-1"],
});
```


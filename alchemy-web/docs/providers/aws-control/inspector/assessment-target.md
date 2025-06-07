---
title: Managing AWS Inspector AssessmentTargets with Alchemy
description: Learn how to create, update, and manage AWS Inspector AssessmentTargets using Alchemy Cloud Control.
---

# AssessmentTarget

The AssessmentTarget resource lets you create and manage [AWS Inspector AssessmentTargets](https://docs.aws.amazon.com/inspector/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-inspector-assessmenttarget.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const assessmenttarget = await AWS.Inspector.AssessmentTarget("assessmenttarget-example", {});
```


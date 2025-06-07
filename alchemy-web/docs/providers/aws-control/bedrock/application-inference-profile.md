---
title: Managing AWS Bedrock ApplicationInferenceProfiles with Alchemy
description: Learn how to create, update, and manage AWS Bedrock ApplicationInferenceProfiles using Alchemy Cloud Control.
---

# ApplicationInferenceProfile

The ApplicationInferenceProfile resource lets you create and manage [AWS Bedrock ApplicationInferenceProfiles](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-applicationinferenceprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationinferenceprofile = await AWS.Bedrock.ApplicationInferenceProfile(
  "applicationinferenceprofile-example",
  {
    InferenceProfileName: "applicationinferenceprofile-inferenceprofile",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A applicationinferenceprofile resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a applicationinferenceprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplicationInferenceProfile = await AWS.Bedrock.ApplicationInferenceProfile(
  "advanced-applicationinferenceprofile",
  {
    InferenceProfileName: "applicationinferenceprofile-inferenceprofile",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A applicationinferenceprofile resource managed by Alchemy",
  }
);
```


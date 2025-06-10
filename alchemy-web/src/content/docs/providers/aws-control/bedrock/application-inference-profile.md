---
title: ApplicationInferenceProfile
description: Learn how to create, update, and manage AWS Bedrock ApplicationInferenceProfiles using Alchemy Cloud Control.
---


The ApplicationInferenceProfile resource allows you to manage [AWS Bedrock Application Inference Profiles](https://docs.aws.amazon.com/bedrock/latest/userguide/) that define how models are used for inference in your applications.

## Minimal Example

Create a basic ApplicationInferenceProfile with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicInferenceProfile = await AWS.Bedrock.ApplicationInferenceProfile("basicInferenceProfile", {
  InferenceProfileName: "BasicInferenceProfile",
  Description: "A simple inference profile for basic model usage"
});
```

## Advanced Configuration

Configure an ApplicationInferenceProfile with a model source and tags for better organization.

```ts
const advancedInferenceProfile = await AWS.Bedrock.ApplicationInferenceProfile("advancedInferenceProfile", {
  InferenceProfileName: "AdvancedInferenceProfile",
  Description: "An advanced inference profile with model source",
  ModelSource: {
    ModelId: "model-12345",
    ModelType: "text"
  },
  Tags: [
    { Key: "Project", Value: "AIResearch" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing ApplicationInferenceProfile instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptExistingProfile = await AWS.Bedrock.ApplicationInferenceProfile("adoptExistingProfile", {
  InferenceProfileName: "ExistingInferenceProfile",
  adopt: true
});
```

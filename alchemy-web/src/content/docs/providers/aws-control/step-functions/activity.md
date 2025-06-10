---
title: Activity
description: Learn how to create, update, and manage AWS StepFunctions Activitys using Alchemy Cloud Control.
---


The Activity resource lets you manage [AWS StepFunctions Activities](https://docs.aws.amazon.com/stepfunctions/latest/userguide/) which are used to perform work within a Step Functions state machine.

## Minimal Example

Create a basic Step Functions Activity with a name and optional tags:

```ts
import AWS from "alchemy/aws/control";

const stepFunctionActivity = await AWS.StepFunctions.Activity("myActivity", {
  name: "DataProcessingActivity",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Department", value: "DataScience" }
  ]
});
```

## Advanced Configuration

Configure a Step Functions Activity with encryption settings for enhanced security:

```ts
import AWS from "alchemy/aws/control";

const secureStepFunctionActivity = await AWS.StepFunctions.Activity("secureActivity", {
  name: "SecureDataProcessingActivity",
  encryptionConfiguration: {
    keyId: "alias/myKmsKey",
    type: "AWS_KMS"
  }
});
```

## Adoption of Existing Resources

If you want to adopt an existing Step Functions Activity instead of failing when it already exists, you can set the `adopt` property to true:

```ts
import AWS from "alchemy/aws/control";

const adoptedActivity = await AWS.StepFunctions.Activity("existingActivity", {
  name: "ExistingDataProcessingActivity",
  adopt: true
});
```

## Using Tags for Resource Management

Create a Step Functions Activity that utilizes tags for better resource management:

```ts
import AWS from "alchemy/aws/control";

const taggedActivity = await AWS.StepFunctions.Activity("taggedActivity", {
  name: "TaggedDataProcessingActivity",
  tags: [
    { key: "Project", value: "AIResearch" },
    { key: "Owner", value: "TeamB" }
  ]
});
```

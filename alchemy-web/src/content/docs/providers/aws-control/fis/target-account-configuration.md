---
title: TargetAccountConfiguration
description: Learn how to create, update, and manage AWS FIS TargetAccountConfigurations using Alchemy Cloud Control.
---


The `TargetAccountConfiguration` resource allows you to define and manage target accounts for AWS Fault Injection Simulator (FIS) experiments. You can specify various parameters, such as the account ID and IAM role required for executing the experiments. For more details, refer to the [AWS FIS TargetAccountConfigurations documentation](https://docs.aws.amazon.com/fis/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic `TargetAccountConfiguration` with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const targetAccountConfig = await AWS.FIS.TargetAccountConfiguration("myTargetAccountConfig", {
  AccountId: "123456789012",
  Description: "Configuration for target account in FIS experiments",
  ExperimentTemplateId: "myExperimentTemplateId",
  RoleArn: "arn:aws:iam::123456789012:role/myFISRole",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

In this example, we show how to create a `TargetAccountConfiguration` with enhanced settings, including a detailed description and a specified role ARN.

```ts
const advancedTargetAccountConfig = await AWS.FIS.TargetAccountConfiguration("advancedTargetAccountConfig", {
  AccountId: "987654321098",
  Description: "Advanced configuration for target account in FIS experiments with specific IAM role.",
  ExperimentTemplateId: "advancedExperimentTemplateId",
  RoleArn: "arn:aws:iam::987654321098:role/advancedFISRole",
  adopt: false // Fail if resource already exists
});
```

## Using in FIS Experiments

This example demonstrates how to use the `TargetAccountConfiguration` in conjunction with an FIS experiment template.

```ts
import AWS from "alchemy/aws/control";

const experimentTemplate = await AWS.FIS.ExperimentTemplate("myExperimentTemplate", {
  Name: "myExperiment",
  TargetAccountConfigurations: [
    {
      AccountId: "123456789012",
      RoleArn: "arn:aws:iam::123456789012:role/myFISRole"
    }
  ],
  Actions: {
    myAction: {
      ActionId: "aws:ec2:stop-instances",
      Parameters: {
        InstanceIds: ["i-0abcd1234efgh5678"]
      },
      Target: "myTargetAccountConfig"
    }
  }
});
```

## Updating TargetAccountConfiguration

This example shows how to update an existing `TargetAccountConfiguration` resource.

```ts
const updatedTargetAccountConfig = await AWS.FIS.TargetAccountConfiguration("myTargetAccountConfig", {
  AccountId: "123456789012",
  Description: "Updated configuration for target account in FIS experiments",
  ExperimentTemplateId: "myUpdatedExperimentTemplateId",
  RoleArn: "arn:aws:iam::123456789012:role/myUpdatedFISRole",
  adopt: true // Adopt existing resource if it already exists
});
```

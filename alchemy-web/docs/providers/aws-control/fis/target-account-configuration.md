---
title: Managing AWS FIS TargetAccountConfigurations with Alchemy
description: Learn how to create, update, and manage AWS FIS TargetAccountConfigurations using Alchemy Cloud Control.
---

# TargetAccountConfiguration

The TargetAccountConfiguration resource allows you to manage AWS Fault Injection Simulator (FIS) target account configurations. This resource is essential for defining the accounts that FIS can target during experiments. For more information, refer to the [AWS FIS TargetAccountConfigurations](https://docs.aws.amazon.com/fis/latest/userguide/).

## Minimal Example

Create a basic target account configuration with the required properties.

```ts
import AWS from "alchemy/aws/control";

const TargetAccountConfig = await AWS.FIS.TargetAccountConfiguration("BasicTargetAccountConfig", {
  AccountId: "123456789012",
  ExperimentTemplateId: "MyExperimentTemplate",
  RoleArn: "arn:aws:iam::123456789012:role/FISRole"
});
```

## Advanced Configuration

Configure a target account with an optional description and enable resource adoption.

```ts
const AdvancedTargetAccountConfig = await AWS.FIS.TargetAccountConfiguration("AdvancedTargetAccountConfig", {
  AccountId: "123456789012",
  Description: "This configuration is for my production environment.",
  ExperimentTemplateId: "MyAdvancedExperimentTemplate",
  RoleArn: "arn:aws:iam::123456789012:role/FISAdvancedRole",
  adopt: true
});
```

## Use Case: Experiment with Multiple Accounts

Demonstrate how to set up multiple target accounts for experiments.

```ts
const TargetAccountConfig1 = await AWS.FIS.TargetAccountConfiguration("TargetAccount1", {
  AccountId: "123456789012",
  ExperimentTemplateId: "ExperimentTemplateA",
  RoleArn: "arn:aws:iam::123456789012:role/FISRoleA"
});

const TargetAccountConfig2 = await AWS.FIS.TargetAccountConfiguration("TargetAccount2", {
  AccountId: "098765432109",
  ExperimentTemplateId: "ExperimentTemplateB",
  RoleArn: "arn:aws:iam::098765432109:role/FISRoleB",
  Description: "Secondary account for FIS experiments."
});
```

## Use Case: Detailed Role Configuration

Illustrate the use of a specific IAM role for the target account configuration.

```ts
const DetailedRoleTargetAccountConfig = await AWS.FIS.TargetAccountConfiguration("DetailedRoleTargetAccountConfig", {
  AccountId: "123456789012",
  ExperimentTemplateId: "DetailedRoleExperimentTemplate",
  RoleArn: "arn:aws:iam::123456789012:role/FISDetailedRole",
  Description: "Using a detailed IAM role for specific permissions."
});
```
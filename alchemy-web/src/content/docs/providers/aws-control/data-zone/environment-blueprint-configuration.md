---
title: EnvironmentBlueprintConfiguration
description: Learn how to create, update, and manage AWS DataZone EnvironmentBlueprintConfigurations using Alchemy Cloud Control.
---


The EnvironmentBlueprintConfiguration resource lets you manage [AWS DataZone Environment Blueprint Configurations](https://docs.aws.amazon.com/datazone/latest/userguide/) for configuring environments in your DataZone. 

## Minimal Example

Create a basic environment blueprint configuration with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const environmentBlueprintConfig = await AWS.DataZone.EnvironmentBlueprintConfiguration("default-environment-blueprint", {
  EnvironmentBlueprintIdentifier: "my-blueprint-identifier",
  DomainIdentifier: "my-domain-identifier",
  EnabledRegions: ["us-east-1"],
  ProvisioningRoleArn: "arn:aws:iam::123456789012:role/my-provisioning-role"
});
```

## Advanced Configuration

Configure an environment blueprint with additional parameters, including regional parameters and access management roles.

```ts
const advancedEnvironmentBlueprintConfig = await AWS.DataZone.EnvironmentBlueprintConfiguration("advanced-environment-blueprint", {
  EnvironmentBlueprintIdentifier: "my-advanced-blueprint-identifier",
  DomainIdentifier: "my-domain-identifier",
  EnabledRegions: ["us-east-1", "us-west-2"],
  RegionalParameters: [
    {
      ParameterKey: "InstanceType",
      ParameterValue: "t2.micro"
    },
    {
      ParameterKey: "KeyName",
      ParameterValue: "my-key-pair"
    }
  ],
  ManageAccessRoleArn: "arn:aws:iam::123456789012:role/my-manage-access-role"
});
```

## Adoption of Existing Resources

Use the adopt feature to manage existing resources without failures if they are already created.

```ts
const adoptExistingEnvironmentBlueprint = await AWS.DataZone.EnvironmentBlueprintConfiguration("existing-environment-blueprint", {
  EnvironmentBlueprintIdentifier: "my-existing-blueprint-identifier",
  DomainIdentifier: "my-domain-identifier",
  EnabledRegions: ["us-east-1"],
  adopt: true
});
```

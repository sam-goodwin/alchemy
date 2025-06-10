---
title: Environment
description: Learn how to create, update, and manage AWS RefactorSpaces Environments using Alchemy Cloud Control.
---


The Environment resource lets you manage [AWS RefactorSpaces Environments](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) that facilitate the migration of applications to the cloud by providing a secure and isolated environment for your services.

## Minimal Example

Create a basic RefactorSpaces Environment with a name and description:

```ts
import AWS from "alchemy/aws/control";

const refactorEnvironment = await AWS.RefactorSpaces.Environment("myRefactorEnvironment", {
  name: "MyRefactorEnvironment",
  description: "An environment for migrating my application",
  tags: [
    { key: "Project", value: "Migration" },
    { key: "Owner", value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure an environment with a specific network fabric type and additional tags:

```ts
const advancedEnvironment = await AWS.RefactorSpaces.Environment("advancedRefactorEnvironment", {
  name: "AdvancedRefactorEnvironment",
  description: "An advanced environment with specific networking",
  networkFabricType: "VPC", // Options include 'VPC', 'TransitGateway', etc.
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Owner", value: "OpsTeam" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing environment instead of failing when it already exists, you can set the `adopt` property to `true`:

```ts
const adoptedEnvironment = await AWS.RefactorSpaces.Environment("adoptedRefactorEnvironment", {
  name: "AdoptedRefactorEnvironment",
  description: "Adopting an existing RefactorSpaces environment",
  adopt: true
});
```

## Custom Network Configuration

Create an environment with specific network configurations using a custom CIDR block:

```ts
const customNetworkEnvironment = await AWS.RefactorSpaces.Environment("customNetworkRefactorEnvironment", {
  name: "CustomNetworkRefactorEnvironment",
  description: "Environment with custom network settings",
  networkFabricType: "VPC",
  tags: [
    { key: "NetworkType", value: "Custom" }
  ]
});
```

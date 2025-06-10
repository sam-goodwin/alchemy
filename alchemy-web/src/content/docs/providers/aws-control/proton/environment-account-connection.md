---
title: EnvironmentAccountConnection
description: Learn how to create, update, and manage AWS Proton EnvironmentAccountConnections using Alchemy Cloud Control.
---


The EnvironmentAccountConnection resource lets you manage [AWS Proton EnvironmentAccountConnections](https://docs.aws.amazon.com/proton/latest/userguide/) that facilitate the connection between a management account and an environment account.

## Minimal Example

Create a basic EnvironmentAccountConnection with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicConnection = await AWS.Proton.EnvironmentAccountConnection("basicConnection", {
  EnvironmentName: "ProductionEnvironment",
  ComponentRoleArn: "arn:aws:iam::123456789012:role/ProtonComponentRole",
  ManagementAccountId: "123456789012",
  CodebuildRoleArn: "arn:aws:iam::123456789012:role/ProtonCodeBuildRole",
  EnvironmentAccountId: "098765432109"
});
```

## Advanced Configuration

Configure an EnvironmentAccountConnection with additional tags for better management and identification.

```ts
const advancedConnection = await AWS.Proton.EnvironmentAccountConnection("advancedConnection", {
  EnvironmentName: "StagingEnvironment",
  ComponentRoleArn: "arn:aws:iam::123456789012:role/ProtonComponentRole",
  ManagementAccountId: "123456789012",
  CodebuildRoleArn: "arn:aws:iam::123456789012:role/ProtonCodeBuildRole",
  EnvironmentAccountId: "098765432109",
  RoleArn: "arn:aws:iam::123456789012:role/ProtonRole",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing EnvironmentAccountConnection instead of failing if it already exists.

```ts
const adoptConnection = await AWS.Proton.EnvironmentAccountConnection("adoptConnection", {
  EnvironmentName: "ExistingEnvironment",
  ComponentRoleArn: "arn:aws:iam::123456789012:role/ProtonComponentRole",
  ManagementAccountId: "123456789012",
  CodebuildRoleArn: "arn:aws:iam::123456789012:role/ProtonCodeBuildRole",
  EnvironmentAccountId: "098765432109",
  adopt: true
});
```

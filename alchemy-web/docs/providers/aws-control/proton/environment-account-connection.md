---
title: Managing AWS Proton EnvironmentAccountConnections with Alchemy
description: Learn how to create, update, and manage AWS Proton EnvironmentAccountConnections using Alchemy Cloud Control.
---

# EnvironmentAccountConnection

The EnvironmentAccountConnection resource allows you to manage connections between AWS Proton environments and accounts. This resource is essential for establishing the necessary permissions and configurations for environments in AWS Proton. For more details, visit the [AWS Proton EnvironmentAccountConnections documentation](https://docs.aws.amazon.com/proton/latest/userguide/).

## Minimal Example

Create a basic EnvironmentAccountConnection with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const environmentAccountConnection = await AWS.Proton.EnvironmentAccountConnection("MyEnvironmentConnection", {
  EnvironmentName: "MyEnvironment",
  ManagementAccountId: "123456789012",
  ComponentRoleArn: "arn:aws:iam::123456789012:role/MyComponentRole"
});
```

## Advanced Configuration

Configure an EnvironmentAccountConnection with additional properties such as CodeBuild role and tags.

```ts
const advancedEnvironmentAccountConnection = await AWS.Proton.EnvironmentAccountConnection("AdvancedEnvironmentConnection", {
  EnvironmentName: "AdvancedEnvironment",
  ManagementAccountId: "123456789012",
  ComponentRoleArn: "arn:aws:iam::123456789012:role/MyComponentRole",
  CodebuildRoleArn: "arn:aws:iam::123456789012:role/MyCodeBuildRole",
  EnvironmentAccountId: "987654321098",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing EnvironmentAccountConnection, you can set the `adopt` property to true.

```ts
const adoptedEnvironmentAccountConnection = await AWS.Proton.EnvironmentAccountConnection("AdoptedEnvironmentConnection", {
  EnvironmentName: "ExistingEnvironment",
  ManagementAccountId: "123456789012",
  adopt: true
});
```

## Role Associations

Define role associations for the EnvironmentAccountConnection, allowing for specific permissions to be set.

```ts
const roleAssociatedEnvironmentAccountConnection = await AWS.Proton.EnvironmentAccountConnection("RoleAssociatedConnection", {
  EnvironmentName: "RoleAssociatedEnvironment",
  ManagementAccountId: "123456789012",
  RoleArn: "arn:aws:iam::123456789012:role/MyRole",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```
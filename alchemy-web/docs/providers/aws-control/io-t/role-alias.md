---
title: Managing AWS IoT RoleAliases with Alchemy
description: Learn how to create, update, and manage AWS IoT RoleAliases using Alchemy Cloud Control.
---

# RoleAlias

The RoleAlias resource allows you to manage [AWS IoT RoleAliases](https://docs.aws.amazon.com/iot/latest/userguide/) that provide a way to reference IAM roles for your AWS IoT services.

## Minimal Example

Create a basic RoleAlias with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicRoleAlias = await AWS.IoT.RoleAlias("BasicRoleAlias", {
  RoleAlias: "MyIoTRoleAlias",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTRole",
  CredentialDurationSeconds: 3600,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Advanced Configuration

Configure a RoleAlias with a longer credential duration and additional tags.

```ts
const advancedRoleAlias = await AWS.IoT.RoleAlias("AdvancedRoleAlias", {
  RoleAlias: "AdvancedIoTRoleAlias",
  RoleArn: "arn:aws:iam::123456789012:role/AdvancedIoTRole",
  CredentialDurationSeconds: 7200,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoT" },
    { Key: "Project", Value: "SmartHome" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing RoleAlias instead of creating a new one, set the `adopt` property to true.

```ts
const adoptedRoleAlias = await AWS.IoT.RoleAlias("AdoptedRoleAlias", {
  RoleAlias: "ExistingIoTRoleAlias",
  RoleArn: "arn:aws:iam::123456789012:role/ExistingIoTRole",
  CredentialDurationSeconds: 3600,
  adopt: true // Adopts existing resource
});
```

## Updating a RoleAlias

You can also update an existing RoleAlias by specifying the same RoleAlias name with new properties.

```ts
const updatedRoleAlias = await AWS.IoT.RoleAlias("UpdateRoleAlias", {
  RoleAlias: "MyIoTRoleAlias",
  RoleArn: "arn:aws:iam::123456789012:role/MyUpdatedIoTRole",
  CredentialDurationSeconds: 4800,
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```
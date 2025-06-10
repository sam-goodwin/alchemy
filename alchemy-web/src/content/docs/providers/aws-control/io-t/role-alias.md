---
title: RoleAlias
description: Learn how to create, update, and manage AWS IoT RoleAliases using Alchemy Cloud Control.
---


The RoleAlias resource lets you manage [AWS IoT RoleAliases](https://docs.aws.amazon.com/iot/latest/userguide/) and their configurations. RoleAliases are used to simplify the management of AWS IoT policies and permissions for devices.

## Minimal Example

Create a basic RoleAlias with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicRoleAlias = await AWS.IoT.RoleAlias("basicRoleAlias", {
  RoleAlias: "MyDeviceRoleAlias",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTRole",
  CredentialDurationSeconds: 3600 // Optional: Duration in seconds
});
```

## Advanced Configuration

Configure a RoleAlias with tags for better organization and management:

```ts
const advancedRoleAlias = await AWS.IoT.RoleAlias("advancedRoleAlias", {
  RoleAlias: "MyAdvancedDeviceRoleAlias",
  RoleArn: "arn:aws:iam::123456789012:role/MyAdvancedIoTRole",
  CredentialDurationSeconds: 7200, // Optional: Extended duration
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoT Development" }
  ]
});
```

## Adoption of Existing RoleAlias

Handle the case where you want to adopt an existing RoleAlias instead of failing:

```ts
const adoptedRoleAlias = await AWS.IoT.RoleAlias("adoptedRoleAlias", {
  RoleAlias: "ExistingDeviceRoleAlias",
  RoleArn: "arn:aws:iam::123456789012:role/ExistingIoTRole",
  adopt: true // Enables adoption of existing RoleAlias
});
```

---
title: Group
description: Learn how to create, update, and manage AWS IdentityStore Groups using Alchemy Cloud Control.
---


The Group resource lets you manage [AWS IdentityStore Groups](https://docs.aws.amazon.com/identitystore/latest/userguide/) for organizing users and managing their permissions within your AWS environment.

## Minimal Example

Create a basic IdentityStore group with a display name and a description:

```ts
import AWS from "alchemy/aws/control";

const basicGroup = await AWS.IdentityStore.Group("basicGroup", {
  DisplayName: "Developers",
  Description: "Group for all application developers",
  IdentityStoreId: "identitystore-1234567890"
});
```

## Advanced Configuration

Configure an IdentityStore group with additional properties such as adopting an existing resource:

```ts
const advancedGroup = await AWS.IdentityStore.Group("advancedGroup", {
  DisplayName: "Admins",
  Description: "Group for administrative users",
  IdentityStoreId: "identitystore-1234567890",
  adopt: true // Adopts the existing group if it already exists
});
```

## Use Case: Group for Project Team

Create a group specifically for a project team with a detailed description:

```ts
const projectTeamGroup = await AWS.IdentityStore.Group("projectTeamGroup", {
  DisplayName: "Project Alpha Team",
  Description: "Group for the Alpha project team members",
  IdentityStoreId: "identitystore-1234567890"
});
```

## Use Case: Dynamic Group Management

Create a group and manage it dynamically through updates:

```ts
const dynamicGroup = await AWS.IdentityStore.Group("dynamicGroup", {
  DisplayName: "Dynamic Group",
  IdentityStoreId: "identitystore-1234567890"
});

// Later update the group description
await AWS.IdentityStore.Group("dynamicGroup", {
  Description: "Updated description for dynamic group",
  IdentityStoreId: "identitystore-1234567890"
});
```

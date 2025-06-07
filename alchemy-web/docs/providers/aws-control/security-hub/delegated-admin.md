---
title: Managing AWS SecurityHub DelegatedAdmins with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub DelegatedAdmins using Alchemy Cloud Control.
---

# DelegatedAdmin

The DelegatedAdmin resource allows you to manage [AWS SecurityHub DelegatedAdmins](https://docs.aws.amazon.com/securityhub/latest/userguide/) within your AWS environment. This resource is essential for setting up and managing administrative access to Security Hub across multiple accounts.

## Minimal Example

Create a basic DelegatedAdmin with the required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("BasicDelegatedAdmin", {
  AdminAccountId: "123456789012"
});
```

## Advanced Configuration

Configure a DelegatedAdmin with the option to adopt existing resources.

```ts
const AdvancedDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("AdvancedDelegatedAdmin", {
  AdminAccountId: "123456789012",
  adopt: true // Allows adoption of existing resource if it already exists
});
```

## Use Case: Updating an Existing DelegatedAdmin

If you need to update an existing DelegatedAdmin, you can specify the AdminAccountId to modify its properties.

```ts
const UpdateDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("UpdateDelegatedAdmin", {
  AdminAccountId: "098765432109",
  adopt: true
});
```

## Use Case: Managing Multiple DelegatedAdmins

Manage multiple DelegatedAdmins by creating them with unique identifiers.

```ts
const FirstDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("FirstDelegatedAdmin", {
  AdminAccountId: "123456789012"
});

const SecondDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("SecondDelegatedAdmin", {
  AdminAccountId: "234567890123"
});
```
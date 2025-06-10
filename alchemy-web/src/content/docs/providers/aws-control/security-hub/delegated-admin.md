---
title: DelegatedAdmin
description: Learn how to create, update, and manage AWS SecurityHub DelegatedAdmins using Alchemy Cloud Control.
---


The DelegatedAdmin resource allows you to manage [AWS SecurityHub DelegatedAdmins](https://docs.aws.amazon.com/securityhub/latest/userguide/) which enables account delegation of SecurityHub management.

## Minimal Example

Create a basic DelegatedAdmin with a specified admin account ID.

```ts
import AWS from "alchemy/aws/control";

const delegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("myDelegatedAdmin", {
  AdminAccountId: "123456789012",
  adopt: true // Adopts the existing resource if it already exists
});
```

## Advanced Configuration

You can create a DelegatedAdmin with additional properties to customize its behavior.

```ts
const advancedDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("advancedDelegatedAdmin", {
  AdminAccountId: "210987654321",
  adopt: false // Do not adopt an existing resource
});
```

## Use Case: Updating an Existing DelegatedAdmin

If you need to update an existing DelegatedAdmin, ensure you set the `adopt` property to true to avoid errors.

```ts
const existingDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("existingDelegatedAdmin", {
  AdminAccountId: "345678901234",
  adopt: true // Adopt the existing resource
});
```

## Use Case: Retrieving DelegatedAdmin Details

While this example demonstrates creating a resource, you can also retrieve existing details through the ARN property.

```ts
const retrievedDelegatedAdmin = await AWS.SecurityHub.DelegatedAdmin("retrieveDelegatedAdmin", {
  AdminAccountId: "456789012345",
  adopt: true // Ensure you adopt if it exists
});

// Access additional properties
console.log(`ARN: ${retrievedDelegatedAdmin.Arn}`);
console.log(`Creation Time: ${retrievedDelegatedAdmin.CreationTime}`);
```

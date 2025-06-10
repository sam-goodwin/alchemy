---
title: Account
description: Learn how to create, update, and manage AWS Organizations Accounts using Alchemy Cloud Control.
---


The Account resource lets you manage [AWS Organizations Accounts](https://docs.aws.amazon.com/organizations/latest/userguide/) and their configurations within your AWS Organization.

## Minimal Example

Create a basic AWS Organization account with required properties and an optional role name.

```ts
import AWS from "alchemy/aws/control";

const organizationAccount = await AWS.Organizations.Account("new-account", {
  Email: "new-account@example.com",
  AccountName: "NewAccount",
  RoleName: "OrganizationAccountAccessRole"
});
```

## Advanced Configuration

Configure an account with additional tags for better resource management.

```ts
const taggedAccount = await AWS.Organizations.Account("tagged-account", {
  Email: "tagged-account@example.com",
  AccountName: "TaggedAccount",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```

## Creating Account in a Specific Organizational Unit

Create an account under a specific parent organizational unit (OU).

```ts
const parentId = "ou-1234-5678"; // Replace with a valid Parent ID

const ouAccount = await AWS.Organizations.Account("ou-account", {
  Email: "ou-account@example.com",
  AccountName: "OUAccount",
  ParentIds: [parentId]
});
```

## Adoption of Existing Account

Adopt an existing AWS account without failing if it already exists.

```ts
const existingAccount = await AWS.Organizations.Account("existing-account", {
  Email: "existing-account@example.com",
  AccountName: "ExistingAccount",
  adopt: true
});
```

## Account Creation with Additional Properties

Create an account while also retrieving its ARN and timestamps for tracking.

```ts
const detailedAccount = await AWS.Organizations.Account("detailed-account", {
  Email: "detailed-account@example.com",
  AccountName: "DetailedAccount",
  RoleName: "OrganizationAccountAccessRole"
});

// Log the account ARN and creation time
console.log(`Account ARN: ${detailedAccount.Arn}`);
console.log(`Creation Time: ${detailedAccount.CreationTime}`);
```

---
title: Managing AWS Organizations Accounts with Alchemy
description: Learn how to create, update, and manage AWS Organizations Accounts using Alchemy Cloud Control.
---

# Account

The Account resource lets you manage [AWS Organizations Accounts](https://docs.aws.amazon.com/organizations/latest/userguide/) and their configurations within your AWS environment.

## Minimal Example

Create a basic AWS Organizations Account with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const NewAccount = await AWS.Organizations.Account("NewAccount", {
  Email: "user@example.com",
  AccountName: "UserAccount",
  RoleName: "OrganizationAccountAccessRole",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure an account with multiple optional properties, including parent IDs and additional tags:

```ts
const AdvancedAccount = await AWS.Organizations.Account("AdvancedAccount", {
  Email: "admin@example.com",
  AccountName: "AdminAccount",
  RoleName: "AdminRole",
  ParentIds: ["ou-abcdefgh", "ou-ijklmnop"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true
});
```

## Creating an Account Without Tags

Create an account without specifying any tags, showing another use case for the resource:

```ts
const NoTagAccount = await AWS.Organizations.Account("NoTagAccount", {
  Email: "no-tag@example.com",
  AccountName: "NoTagAccount",
  RoleName: "NoTagRole"
});
```

## Account Adoption Example

Demonstrate adopting an existing account with the `adopt` property set to true:

```ts
const AdoptedAccount = await AWS.Organizations.Account("AdoptedAccount", {
  Email: "existing@example.com",
  AccountName: "ExistingAccount",
  adopt: true
});
```
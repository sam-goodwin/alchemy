---
title: AccountAlias
description: Learn how to create, update, and manage AWS SupportApp AccountAliases using Alchemy Cloud Control.
---


The AccountAlias resource lets you manage AWS SupportApp account aliases, which are used to identify AWS accounts more easily. For more information, refer to the [AWS SupportApp AccountAliases documentation](https://docs.aws.amazon.com/supportapp/latest/userguide/).

## Minimal Example

Create a basic account alias with required properties.

```ts
import AWS from "alchemy/aws/control";

const accountAlias = await AWS.SupportApp.AccountAlias("myAccountAlias", {
  AccountAlias: "my-awesome-account",
  adopt: false // Default false: Fail if resource already exists
});
```

## Advanced Configuration

Create an account alias with the option to adopt an existing resource.

```ts
const adoptedAccountAlias = await AWS.SupportApp.AccountAlias("adoptedAccountAlias", {
  AccountAlias: "my-awesome-account",
  adopt: true // Adopt existing resource instead of failing
});
```

## Using Account Alias in AWS SupportApp

After creating an account alias, you can leverage it for support-related functionalities in your applications.

```ts
const supportAppAlias = await AWS.SupportApp.AccountAlias("supportAppAlias", {
  AccountAlias: "support-portal-account",
  adopt: false
});

// Example usage of the account alias in a support application
console.log(`Created SupportApp Account Alias: ${supportAppAlias.AccountAlias}`);
```

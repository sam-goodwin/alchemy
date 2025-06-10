---
title: Environment
description: Learn how to create, update, and manage AWS FinSpace Environments using Alchemy Cloud Control.
---


The Environment resource allows you to create and manage [AWS FinSpace Environments](https://docs.aws.amazon.com/finspace/latest/userguide/) for your financial data analysis and management needs.

## Minimal Example

Create a basic FinSpace Environment with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const finspaceEnvironment = await AWS.FinSpace.Environment("basic-environment", {
  name: "FinanceDataEnvironment",
  description: "An environment for managing financial datasets",
  kmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd1234"
});
```

## Advanced Configuration

Configure an environment with federation parameters and superuser parameters for enhanced access management.

```ts
const advancedFinspaceEnvironment = await AWS.FinSpace.Environment("advanced-environment", {
  name: "AdvancedFinanceDataEnvironment",
  description: "An advanced environment with federation and superuser settings",
  kmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd1234",
  federationMode: "SAML",
  federationParameters: {
    IdpUrl: "https://idp.example.com/saml",
    IdpCertificate: "MIIDdzCCAl+gAwIBAgIEUQ==",
    UserAttribute: "email"
  },
  superuserParameters: {
    superuserEmail: "admin@example.com"
  }
});
```

## Custom Tagging

Create an environment with custom tags for better organization and management.

```ts
const taggedFinspaceEnvironment = await AWS.FinSpace.Environment("tagged-environment", {
  name: "TaggedFinanceEnvironment",
  description: "An environment with custom tagging",
  tags: [
    { key: "Project", value: "DataAnalysis" },
    { key: "Owner", value: "DataTeam" }
  ]
});
```

## Adopting Existing Resources

Adopt an existing FinSpace Environment if it already exists to avoid errors during creation.

```ts
const adoptedFinspaceEnvironment = await AWS.FinSpace.Environment("existing-environment", {
  name: "ExistingFinanceDataEnvironment",
  description: "An environment that adopts an existing resource",
  adopt: true
});
```

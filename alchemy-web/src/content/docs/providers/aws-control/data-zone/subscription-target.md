---
title: SubscriptionTarget
description: Learn how to create, update, and manage AWS DataZone SubscriptionTargets using Alchemy Cloud Control.
---


The SubscriptionTarget resource allows you to manage [AWS DataZone SubscriptionTargets](https://docs.aws.amazon.com/datazone/latest/userguide/) which facilitate access to data assets within a defined environment.

## Minimal Example

Create a basic SubscriptionTarget with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicSubscriptionTarget = await AWS.DataZone.SubscriptionTarget("basicSubscriptionTarget", {
  Type: "DataLake",
  EnvironmentIdentifier: "env-1234",
  SubscriptionTargetConfig: [
    {
      type: "exampleConfigType",
      details: "exampleDetails"
    }
  ],
  ApplicableAssetTypes: ["Dataset", "Model"],
  AuthorizedPrincipals: ["arn:aws:iam::123456789012:role/example-role"],
  Name: "BasicSubscriptionTarget",
  DomainIdentifier: "domain-5678"
});
```

## Advanced Configuration

Configure a SubscriptionTarget with additional properties, including a management access role and provider.

```ts
const advancedSubscriptionTarget = await AWS.DataZone.SubscriptionTarget("advancedSubscriptionTarget", {
  Type: "DataLake",
  EnvironmentIdentifier: "env-5678",
  ManageAccessRole: "arn:aws:iam::123456789012:role/manage-access",
  SubscriptionTargetConfig: [
    {
      type: "advancedConfigType",
      details: "advancedDetails"
    }
  ],
  ApplicableAssetTypes: ["Dataset", "Notebook"],
  AuthorizedPrincipals: ["arn:aws:iam::123456789012:role/another-role"],
  Name: "AdvancedSubscriptionTarget",
  Provider: "example-provider",
  DomainIdentifier: "domain-9012"
});
```

## Example with Adopt Option

Create a SubscriptionTarget that adopts an existing resource if it already exists.

```ts
const adoptSubscriptionTarget = await AWS.DataZone.SubscriptionTarget("adoptSubscriptionTarget", {
  Type: "DataLake",
  EnvironmentIdentifier: "env-1357",
  SubscriptionTargetConfig: [
    {
      type: "adoptConfigType",
      details: "adoptDetails"
    }
  ],
  ApplicableAssetTypes: ["Dataset"],
  AuthorizedPrincipals: ["arn:aws:iam::123456789012:role/adopt-role"],
  Name: "AdoptSubscriptionTarget",
  DomainIdentifier: "domain-2468",
  adopt: true
});
```

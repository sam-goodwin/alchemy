---
title: Managing AWS DataZone SubscriptionTargets with Alchemy
description: Learn how to create, update, and manage AWS DataZone SubscriptionTargets using Alchemy Cloud Control.
---

# SubscriptionTarget

The SubscriptionTarget resource lets you create and manage [AWS DataZone SubscriptionTargets](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-subscriptiontarget.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const subscriptiontarget = await AWS.DataZone.SubscriptionTarget("subscriptiontarget-example", {
  Type: "example-type",
  EnvironmentIdentifier: "example-environmentidentifier",
  SubscriptionTargetConfig: [],
  ApplicableAssetTypes: ["example-applicableassettypes-1"],
  AuthorizedPrincipals: ["example-authorizedprincipals-1"],
  Name: "subscriptiontarget-",
  DomainIdentifier: "example-domainidentifier",
});
```


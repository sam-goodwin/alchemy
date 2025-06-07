---
title: Managing AWS VerifiedPermissions PolicyStores with Alchemy
description: Learn how to create, update, and manage AWS VerifiedPermissions PolicyStores using Alchemy Cloud Control.
---

# PolicyStore

The PolicyStore resource lets you create and manage [AWS VerifiedPermissions PolicyStores](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-verifiedpermissions-policystore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const policystore = await AWS.VerifiedPermissions.PolicyStore("policystore-example", {
  ValidationSettings: "example-validationsettings",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A policystore resource managed by Alchemy",
});
```

## Advanced Configuration

Create a policystore with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPolicyStore = await AWS.VerifiedPermissions.PolicyStore("advanced-policystore", {
  ValidationSettings: "example-validationsettings",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A policystore resource managed by Alchemy",
});
```


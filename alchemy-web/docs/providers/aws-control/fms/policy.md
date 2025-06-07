---
title: Managing AWS FMS Policys with Alchemy
description: Learn how to create, update, and manage AWS FMS Policys using Alchemy Cloud Control.
---

# Policy

The Policy resource lets you create and manage [AWS FMS Policys](https://docs.aws.amazon.com/fms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fms-policy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const policy = await AWS.FMS.Policy("policy-example", {
  ExcludeResourceTags: true,
  SecurityServicePolicyData: "example-securityservicepolicydata",
  RemediationEnabled: true,
  PolicyName: "policy-policy",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a policy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPolicy = await AWS.FMS.Policy("advanced-policy", {
  ExcludeResourceTags: true,
  SecurityServicePolicyData: "example-securityservicepolicydata",
  RemediationEnabled: true,
  PolicyName: "policy-policy",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


---
title: PolicyAssociation
description: Learn how to create, update, and manage AWS SecurityHub PolicyAssociations using Alchemy Cloud Control.
---


The PolicyAssociation resource lets you manage [AWS SecurityHub PolicyAssociations](https://docs.aws.amazon.com/securityhub/latest/userguide/) for associating security policies with targets like accounts or organizational units.

## Minimal Example

Create a basic PolicyAssociation that links a configuration policy to a target account.

```ts
import AWS from "alchemy/aws/control";

const policyAssociation = await AWS.SecurityHub.PolicyAssociation("myPolicyAssociation", {
  ConfigurationPolicyId: "arn:aws:securityhub:us-east-1:123456789012:config-policy/myConfigPolicy",
  TargetType: "ACCOUNT",
  TargetId: "123456789012",
  adopt: true // Adopt existing resource if it exists
});
```

## Advanced Configuration

Configure a PolicyAssociation with a different target type, associating a policy with an organizational unit.

```ts
const organizationalPolicyAssociation = await AWS.SecurityHub.PolicyAssociation("orgPolicyAssociation", {
  ConfigurationPolicyId: "arn:aws:securityhub:us-east-1:123456789012:config-policy/myOrgPolicy",
  TargetType: "ORGANIZATIONAL_UNIT",
  TargetId: "ou-xyz-123456",
  adopt: false // Do not adopt existing resource
});
```

## Using with Multiple Targets

Establish multiple associations for different accounts under a single policy.

```ts
const firstAccountAssociation = await AWS.SecurityHub.PolicyAssociation("firstAccountAssociation", {
  ConfigurationPolicyId: "arn:aws:securityhub:us-east-1:123456789012:config-policy/myConfigPolicy",
  TargetType: "ACCOUNT",
  TargetId: "111111111111"
});

const secondAccountAssociation = await AWS.SecurityHub.PolicyAssociation("secondAccountAssociation", {
  ConfigurationPolicyId: "arn:aws:securityhub:us-east-1:123456789012:config-policy/myConfigPolicy",
  TargetType: "ACCOUNT",
  TargetId: "222222222222"
});
```

## Handling Existing Resources

Demonstrate how to manage a PolicyAssociation that might already exist using the `adopt` property.

```ts
const existingPolicyAssociation = await AWS.SecurityHub.PolicyAssociation("existingPolicyAssociation", {
  ConfigurationPolicyId: "arn:aws:securityhub:us-east-1:123456789012:config-policy/myExistingPolicy",
  TargetType: "ACCOUNT",
  TargetId: "333333333333",
  adopt: true // Adopts the existing association instead of failing
});
```

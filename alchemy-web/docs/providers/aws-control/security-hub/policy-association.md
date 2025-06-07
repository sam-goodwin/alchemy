---
title: Managing AWS SecurityHub PolicyAssociations with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub PolicyAssociations using Alchemy Cloud Control.
---

# PolicyAssociation

The PolicyAssociation resource allows you to manage associations between AWS SecurityHub and configuration policies. You can create, update, and delete these associations to ensure your security policies are enforced as intended. For more details, refer to the official [AWS SecurityHub PolicyAssociations documentation](https://docs.aws.amazon.com/securityhub/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic PolicyAssociation with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPolicyAssociation = await AWS.SecurityHub.PolicyAssociation("BasicPolicyAssociation", {
  ConfigurationPolicyId: "arn:aws:config:us-west-2:123456789012:config-rule/my-config-rule",
  TargetType: "AWS::EC2::Instance",
  TargetId: "i-0abcd1234efgh5678",
  adopt: true // Optional property indicating to adopt existing resources
});
```

## Advanced Configuration

This example shows how to configure a PolicyAssociation with a specific target type and ID, including the adoption of existing resources.

```ts
const advancedPolicyAssociation = await AWS.SecurityHub.PolicyAssociation("AdvancedPolicyAssociation", {
  ConfigurationPolicyId: "arn:aws:config:us-west-2:123456789012:config-rule/another-config-rule",
  TargetType: "AWS::S3::Bucket",
  TargetId: "my-s3-bucket",
  adopt: false // Optional property indicating not to adopt existing resources
});
```

## Use Case: Associating Multiple Targets

In this scenario, we create multiple PolicyAssociations for different target types, demonstrating how to apply different policies.

```ts
const ec2PolicyAssociation = await AWS.SecurityHub.PolicyAssociation("EC2PolicyAssociation", {
  ConfigurationPolicyId: "arn:aws:config:us-west-2:123456789012:config-rule/ec2-config-rule",
  TargetType: "AWS::EC2::Instance",
  TargetId: "i-0abcd1234efgh5678"
});

const s3PolicyAssociation = await AWS.SecurityHub.PolicyAssociation("S3PolicyAssociation", {
  ConfigurationPolicyId: "arn:aws:config:us-west-2:123456789012:config-rule/s3-config-rule",
  TargetType: "AWS::S3::Bucket",
  TargetId: "my-s3-bucket"
});
```

## Use Case: Error Handling

This example demonstrates error handling when trying to create a PolicyAssociation for an existing resource, adopting it instead of failing.

```ts
try {
  const existingPolicyAssociation = await AWS.SecurityHub.PolicyAssociation("ExistingPolicyAssociation", {
    ConfigurationPolicyId: "arn:aws:config:us-west-2:123456789012:config-rule/existing-config-rule",
    TargetType: "AWS::Lambda::Function",
    TargetId: "my-lambda-function",
    adopt: true // Attempt to adopt the existing resource
  });
} catch (error) {
  console.error("Failed to create PolicyAssociation:", error);
}
```
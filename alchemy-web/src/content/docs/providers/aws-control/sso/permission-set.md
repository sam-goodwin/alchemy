---
title: PermissionSet
description: Learn how to create, update, and manage AWS SSO PermissionSets using Alchemy Cloud Control.
---


The PermissionSet resource allows you to manage [AWS SSO PermissionSets](https://docs.aws.amazon.com/sso/latest/userguide/) that define the permissions assigned to users and groups within AWS Single Sign-On.

## Minimal Example

Create a basic PermissionSet with required properties and a session duration.

```ts
import AWS from "alchemy/aws/control";

const basicPermissionSet = await AWS.SSO.PermissionSet("basicPermissionSet", {
  instanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoinst-1234567890abcdef",
  name: "BasicAccess",
  sessionDuration: "PT1H", // 1 hour
});
```

## Advanced Configuration

Configure a PermissionSet with inline policies and managed policies for more granular permissions.

```ts
const advancedPermissionSet = await AWS.SSO.PermissionSet("advancedPermissionSet", {
  instanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoinst-1234567890abcdef",
  name: "AdvancedAccess",
  sessionDuration: "PT2H", // 2 hours
  description: "Permission set for advanced access with custom policies",
  inlinePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: "arn:aws:s3:::example-bucket"
      },
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::example-bucket/*"
      }
    ]
  },
  managedPolicies: [
    "arn:aws:iam::aws:policy/ReadOnlyAccess"
  ]
});
```

## Using Customer Managed Policy References

Create a PermissionSet that utilizes customer managed policies for enhanced control.

```ts
const customerManagedPolicyPermissionSet = await AWS.SSO.PermissionSet("customerManagedPolicyPermissionSet", {
  instanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoinst-1234567890abcdef",
  name: "CustomerManagedPolicyAccess",
  description: "Permission set utilizing customer managed policies",
  customerManagedPolicyReferences: [
    {
      name: "MyCustomPolicy",
      arn: "arn:aws:iam::123456789012:policy/MyCustomPolicy"
    }
  ]
});
```

## Tagging the PermissionSet

Create a PermissionSet with tags for better resource management.

```ts
const taggedPermissionSet = await AWS.SSO.PermissionSet("taggedPermissionSet", {
  instanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoinst-1234567890abcdef",
  name: "TaggedAccess",
  tags: [
    { key: "Environment", value: "Development" },
    { key: "Department", value: "Engineering" }
  ]
});
```

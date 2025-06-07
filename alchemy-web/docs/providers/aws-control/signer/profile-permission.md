---
title: Managing AWS Signer ProfilePermissions with Alchemy
description: Learn how to create, update, and manage AWS Signer ProfilePermissions using Alchemy Cloud Control.
---

# ProfilePermission

The ProfilePermission resource allows you to manage permissions for AWS Signer profiles, enabling specific actions to be granted to designated principals. For more information, refer to the [AWS Signer ProfilePermissions](https://docs.aws.amazon.com/signer/latest/userguide/).

## Minimal Example

Create a basic ProfilePermission that allows a principal to sign using a specified profile.

```ts
import AWS from "alchemy/aws/control";

const BasicProfilePermission = await AWS.Signer.ProfilePermission("BasicProfilePermission", {
  Action: "signer:Sign",
  StatementId: "AllowSignAction",
  ProfileName: "MySigningProfile",
  Principal: "arn:aws:iam::123456789012:role/MySigningRole"
});
```

## Advanced Configuration

Configure a ProfilePermission with an optional ProfileVersion and adopt existing resource behavior.

```ts
const AdvancedProfilePermission = await AWS.Signer.ProfilePermission("AdvancedProfilePermission", {
  Action: "signer:Sign",
  StatementId: "AllowSignActionV2",
  ProfileName: "MySigningProfile",
  Principal: "arn:aws:iam::123456789012:role/MySigningRole",
  ProfileVersion: "1",
  adopt: true // Adopt the existing resource if it already exists
});
```

## Multiple Actions

You can specify multiple actions in a single ProfilePermission for greater flexibility.

```ts
const MultiActionProfilePermission = await AWS.Signer.ProfilePermission("MultiActionProfilePermission", {
  Action: JSON.stringify([
    "signer:Sign",
    "signer:DescribeProfile"
  ]),
  StatementId: "AllowMultipleActions",
  ProfileName: "MyFlexibleSigningProfile",
  Principal: "arn:aws:iam::123456789012:role/MyFlexibleSigningRole"
});
```

## Custom Principal

Grant permissions to a specific AWS account as a principal.

```ts
const CustomPrincipalProfilePermission = await AWS.Signer.ProfilePermission("CustomPrincipalProfilePermission", {
  Action: "signer:Sign",
  StatementId: "AllowSignActionForAccount",
  ProfileName: "MyAccountSigningProfile",
  Principal: "arn:aws:iam::987654321098:root" // Specific AWS account
});
```
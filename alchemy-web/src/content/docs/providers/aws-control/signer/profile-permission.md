---
title: ProfilePermission
description: Learn how to create, update, and manage AWS Signer ProfilePermissions using Alchemy Cloud Control.
---


The ProfilePermission resource allows you to manage permissions for AWS Signer profiles, enabling access controls for signing operations. For more details, refer to the [AWS Signer ProfilePermissions documentation](https://docs.aws.amazon.com/signer/latest/userguide/).

## Minimal Example

Create a basic ProfilePermission with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const profilePermission = await AWS.Signer.ProfilePermission("basicProfilePermission", {
  Action: "signer:StartSigningJob",
  StatementId: "AllowSigningJobs",
  ProfileName: "MySigningProfile",
  Principal: "arn:aws:iam::123456789012:role/MySigningRole",
  ProfileVersion: "1" // Optional
});
```

## Advanced Configuration

Configure a ProfilePermission with additional properties and a custom action.

```ts
const advancedProfilePermission = await AWS.Signer.ProfilePermission("advancedProfilePermission", {
  Action: "signer:PutSigningProfile",
  StatementId: "AllowPutSigningProfile",
  ProfileName: "AdvancedSigningProfile",
  Principal: "arn:aws:iam::123456789012:role/MyAdvancedSigningRole",
  ProfileVersion: "2", // Optional
  adopt: true // Adopt existing resource if it already exists
});
```

## Granting Permissions to Multiple Principals

You can create a ProfilePermission that grants access to multiple IAM roles or users for signing operations.

```ts
const multiPrincipalProfilePermission = await AWS.Signer.ProfilePermission("multiPrincipalProfilePermission", {
  Action: "signer:StartSigningJob",
  StatementId: "AllowMultiSigningJobs",
  ProfileName: "MultiPrincipalSigningProfile",
  Principal: "arn:aws:iam::123456789012:role/MyFirstSigningRole,arn:aws:iam::123456789012:role/MySecondSigningRole"
});
```

## Using IAM Policy Document Format

You can specify the `Action` using a more detailed IAM policy JSON structure.

```ts
const iamPolicyProfilePermission = await AWS.Signer.ProfilePermission("iamPolicyProfilePermission", {
  Action: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "signer:StartSigningJob",
          "signer:GetSigningProfile"
        ],
        Resource: "*"
      }
    ]
  }),
  StatementId: "AllowSigningActions",
  ProfileName: "IamPolicySigningProfile",
  Principal: "arn:aws:iam::123456789012:role/MyPolicySigningRole"
});
```

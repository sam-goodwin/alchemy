---
title: StudioSessionMapping
description: Learn how to create, update, and manage AWS EMR StudioSessionMappings using Alchemy Cloud Control.
---


The StudioSessionMapping resource allows you to manage [AWS EMR StudioSessionMappings](https://docs.aws.amazon.com/emr/latest/userguide/) which define the access and session policies for users in an EMR Studio.

## Minimal Example

Create a basic StudioSessionMapping with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicSessionMapping = await AWS.EMR.StudioSessionMapping("basicSessionMapping", {
  IdentityType: "USER", // Options: USER, ROLE
  SessionPolicyArn: "arn:aws:iam::123456789012:policy/EMRSessionPolicy",
  StudioId: "emr-studio-123456",
  IdentityName: "johndoe@example.com",
  adopt: true // If true, adopt existing resource instead of failing when resource already exists
});
```

## Advanced Configuration

Configure a StudioSessionMapping with a more complex session policy using IAM policy JSON.

```ts
const advancedSessionMapping = await AWS.EMR.StudioSessionMapping("advancedSessionMapping", {
  IdentityType: "USER",
  SessionPolicyArn: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "s3:ListBucket",
          "s3:GetObject"
        ],
        Resource: [
          "arn:aws:s3:::my-emr-bucket",
          "arn:aws:s3:::my-emr-bucket/*"
        ]
      }
    ]
  }),
  StudioId: "emr-studio-123456",
  IdentityName: "janedoe@example.com"
});
```

## Example with Different Identity Types

Create a StudioSessionMapping for a role identity type.

```ts
const roleSessionMapping = await AWS.EMR.StudioSessionMapping("roleSessionMapping", {
  IdentityType: "ROLE",
  SessionPolicyArn: "arn:aws:iam::123456789012:policy/EMRRoleSessionPolicy",
  StudioId: "emr-studio-123456",
  IdentityName: "EMRSessionRole"
});
```

## Example without Adopting Existing Resources

Create a StudioSessionMapping that does not adopt existing resources.

```ts
const nonAdoptingSessionMapping = await AWS.EMR.StudioSessionMapping("nonAdoptingSessionMapping", {
  IdentityType: "USER",
  SessionPolicyArn: "arn:aws:iam::123456789012:policy/EMRNonAdoptPolicy",
  StudioId: "emr-studio-123456",
  IdentityName: "user@example.com",
  adopt: false // This will fail if the resource already exists
});
```

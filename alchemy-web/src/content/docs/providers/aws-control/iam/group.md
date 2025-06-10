---
title: Group
description: Learn how to create, update, and manage AWS IAM Groups using Alchemy Cloud Control.
---


The Group resource lets you manage [AWS IAM Groups](https://docs.aws.amazon.com/iam/latest/userguide/) for organizing users and permissions within your AWS account.

## Minimal Example

Create a basic IAM group with a specified name and an optional path.

```ts
import AWS from "alchemy/aws/control";

const iamGroup = await AWS.IAM.Group("basicIamGroup", {
  GroupName: "Developers",
  Path: "/engineering/"
});
```

## Advanced Configuration

Configure an IAM group with managed policies and inline policies for more granular control.

```ts
const advancedIamGroup = await AWS.IAM.Group("advancedIamGroup", {
  GroupName: "Admins",
  ManagedPolicyArns: [
    "arn:aws:iam::aws:policy/AdministratorAccess"
  ],
  Policies: [{
    PolicyName: "CustomPolicy",
    PolicyDocument: {
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
    }
  }]
});
```

## Adding Users to the Group

Create an IAM group and add users to it.

```ts
const userGroup = await AWS.IAM.Group("userGroup", {
  GroupName: "DataScientists"
});

// Assume users are already created
await AWS.IAM.AddUserToGroup("addUserToGroup", {
  GroupName: userGroup.GroupName,
  UserName: "data-scientist-1"
});
```

## Adopting Existing Resources

Manage an existing IAM group by adopting it instead of failing if it already exists.

```ts
const adoptIamGroup = await AWS.IAM.Group("adoptIamGroup", {
  GroupName: "LegacyGroup",
  adopt: true
});
```

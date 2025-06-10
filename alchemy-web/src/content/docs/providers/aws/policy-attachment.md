---
title: PolicyAttachment
description: Learn how to attach AWS IAM Policies to Roles, Users, or Groups using Alchemy to manage permissions effectively.
---


The PolicyAttachment resource lets you attach [AWS IAM policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) to IAM roles.

## Minimal Example

Attach an AWS managed policy to a role:

```ts
import { PolicyAttachment } from "alchemy/aws";

const adminAccess = await PolicyAttachment("admin-policy", {
  policyArn: "arn:aws:iam::aws:policy/AdministratorAccess", 
  roleName: role.name
});
```

## Attach Custom Policy

Attach a custom policy created with the Policy resource:

```ts
import { PolicyAttachment } from "alchemy/aws";

const customPolicy = await PolicyAttachment("custom-policy", {
  policyArn: policy.arn,
  roleName: role.name
});
```

## Multiple Policy Attachments 

Attach multiple policies to a role:

```ts
import { PolicyAttachment } from "alchemy/aws";

const s3Access = await PolicyAttachment("s3-access", {
  policyArn: "arn:aws:iam::aws:policy/AmazonS3FullAccess",
  roleName: role.name
});

const sqsAccess = await PolicyAttachment("sqs-access", {
  policyArn: "arn:aws:iam::aws:policy/AmazonSQSFullAccess", 
  roleName: role.name
});
```

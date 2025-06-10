---
title: ServiceLinkedRole
description: Learn how to create, update, and manage AWS IAM ServiceLinkedRoles using Alchemy Cloud Control.
---


The ServiceLinkedRole resource lets you create and manage [AWS IAM ServiceLinkedRoles](https://docs.aws.amazon.com/iam/latest/userguide/) that allow AWS services to perform actions on your behalf.

## Minimal Example

Create a basic ServiceLinkedRole with required properties and a custom description.

```ts
import AWS from "alchemy/aws/control";

const myServiceLinkedRole = await AWS.IAM.ServiceLinkedRole("myServiceLinkedRole", {
  AWSServiceName: "elasticloadbalancing.amazonaws.com",
  Description: "Role for ELB to manage resources on behalf of the user"
});
```

## Advanced Configuration

Configure a ServiceLinkedRole with an optional custom suffix for the role name.

```ts
const advancedServiceLinkedRole = await AWS.IAM.ServiceLinkedRole("advancedServiceLinkedRole", {
  AWSServiceName: "ec2.amazonaws.com",
  CustomSuffix: "customsuffix",
  Description: "Role for EC2 service to manage resources"
});
```

## Adopting Existing Roles

Use the adopt option to adopt an existing service-linked role instead of failing if it already exists.

```ts
const adoptedServiceLinkedRole = await AWS.IAM.ServiceLinkedRole("adoptedServiceLinkedRole", {
  AWSServiceName: "s3.amazonaws.com",
  adopt: true,
  Description: "Adopting existing role for S3 service"
});
```

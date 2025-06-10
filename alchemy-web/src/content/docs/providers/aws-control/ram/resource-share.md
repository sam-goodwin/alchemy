---
title: ResourceShare
description: Learn how to create, update, and manage AWS RAM ResourceShares using Alchemy Cloud Control.
---


The ResourceShare resource lets you manage [AWS RAM ResourceShares](https://docs.aws.amazon.com/ram/latest/userguide/) for sharing resources across AWS accounts and within your organization.

## Minimal Example

Create a basic resource share with a name and a resource ARN.

```ts
import AWS from "alchemy/aws/control";

const basicResourceShare = await AWS.RAM.ResourceShare("basicShare", {
  Name: "MyBasicResourceShare",
  ResourceArns: [
    "arn:aws:s3:::my-example-bucket"
  ]
});
```

## Advanced Configuration

Configure a resource share with permissions, principals, and external principals allowed.

```ts
const advancedResourceShare = await AWS.RAM.ResourceShare("advancedShare", {
  Name: "MyAdvancedResourceShare",
  ResourceArns: [
    "arn:aws:s3:::my-example-bucket",
    "arn:aws:ec2:region:account-id:instance/i-1234567890abcdef0"
  ],
  PermissionArns: [
    "arn:aws:ram::aws:policy/ServicePermissionPolicy"
  ],
  Principals: [
    "arn:aws:iam::123456789012:role/MyRole"
  ],
  AllowExternalPrincipals: true
});
```

## Sharing with Specific Accounts

Share resources with specified AWS accounts by listing their ARNs.

```ts
const accountShare = await AWS.RAM.ResourceShare("accountShare", {
  Name: "MyAccountResourceShare",
  ResourceArns: [
    "arn:aws:sqs:us-east-1:123456789012:my-queue"
  ],
  Principals: [
    "arn:aws:iam::987654321098:role/AnotherRole"
  ],
  Tags: [
    { Key: "Project", Value: "ResourceSharing" }
  ]
});
```

## Allow External Principals

Create a resource share that allows external principals to access the resources.

```ts
const externalShare = await AWS.RAM.ResourceShare("externalShare", {
  Name: "MyExternalResourceShare",
  ResourceArns: [
    "arn:aws:ec2:us-west-2:123456789012:volume/vol-12345678"
  ],
  AllowExternalPrincipals: true,
  Principals: [
    "arn:aws:iam::external-account-id:role/ExternalRole"
  ]
});
```

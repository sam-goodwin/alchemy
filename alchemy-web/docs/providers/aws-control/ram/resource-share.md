---
title: Managing AWS RAM ResourceShares with Alchemy
description: Learn how to create, update, and manage AWS RAM ResourceShares using Alchemy Cloud Control.
---

# ResourceShare

The ResourceShare resource allows you to manage [AWS RAM ResourceShares](https://docs.aws.amazon.com/ram/latest/userguide/) for sharing resources across AWS accounts. This resource is essential for enabling resource sharing without the need for complex cross-account configurations.

## Minimal Example

Create a basic ResourceShare with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicResourceShare = await AWS.RAM.ResourceShare("BasicResourceShare", {
  Name: "MyResourceShare",
  ResourceArns: [
    "arn:aws:ec2:us-east-1:123456789012:volume/vol-0abcd1234efgh5678"
  ],
  Principals: [
    "arn:aws:iam::123456789012:role/MyRole"
  ],
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a ResourceShare with permissions and multiple principals.

```ts
const AdvancedResourceShare = await AWS.RAM.ResourceShare("AdvancedResourceShare", {
  Name: "AdvancedResourceShare",
  ResourceArns: [
    "arn:aws:s3:::my-shared-bucket"
  ],
  Principals: [
    "arn:aws:iam::123456789012:role/AnotherRole",
    "arn:aws:iam::987654321098:role/ThirdRole"
  ],
  PermissionArns: [
    "arn:aws:ram::aws:permission:MyPermission"
  ],
  AllowExternalPrincipals: true,
  Tags: [
    { Key: "Team", Value: "DataEngineering" },
    { Key: "Project", Value: "ResourceSharing" }
  ]
});
```

## Using External Principals

Create a ResourceShare that allows sharing with external AWS accounts.

```ts
const ExternalResourceShare = await AWS.RAM.ResourceShare("ExternalResourceShare", {
  Name: "ExternalResourceShare",
  ResourceArns: [
    "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678"
  ],
  Principals: [
    "arn:aws:iam::123456789012:role/MyRole"
  ],
  AllowExternalPrincipals: true
});
```

## Tagging Resources for Management

Create a ResourceShare with multiple tags for better resource management.

```ts
const TaggedResourceShare = await AWS.RAM.ResourceShare("TaggedResourceShare", {
  Name: "TaggedResourceShare",
  ResourceArns: [
    "arn:aws:rds:us-east-1:123456789012:db:mydatabase"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Department", Value: "Engineering" }
  ]
});
``` 

This documentation provides a foundational understanding of managing AWS RAM ResourceShares using Alchemy, facilitating efficient resource sharing across AWS accounts.
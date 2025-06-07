---
title: Managing AWS FMS ResourceSets with Alchemy
description: Learn how to create, update, and manage AWS FMS ResourceSets using Alchemy Cloud Control.
---

# ResourceSet

The ResourceSet resource lets you manage [AWS FMS ResourceSets](https://docs.aws.amazon.com/fms/latest/userguide/) that define a collection of AWS resources for applying security policies.

## Minimal Example

Create a basic ResourceSet with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicResourceSet = await AWS.FMS.ResourceSet("BasicResourceSet", {
  Name: "MyResourceSet",
  ResourceTypeList: ["AWS::EC2::Instance", "AWS::S3::Bucket"],
  Description: "A collection of EC2 instances and S3 buckets"
});
```

## Advanced Configuration

Configure a ResourceSet with additional resources and tags for better management.

```ts
const AdvancedResourceSet = await AWS.FMS.ResourceSet("AdvancedResourceSet", {
  Name: "AdvancedResourceSet",
  ResourceTypeList: ["AWS::EC2::Instance", "AWS::S3::Bucket"],
  Resources: [
    "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678",
    "arn:aws:s3:::my-example-bucket"
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Adoption of Existing Resources

Create a ResourceSet that adopts existing resources instead of failing if they already exist.

```ts
const AdoptExistingResourceSet = await AWS.FMS.ResourceSet("AdoptExistingResourceSet", {
  Name: "ExistingResourceSet",
  ResourceTypeList: ["AWS::EC2::Instance"],
  Resources: [
    "arn:aws:ec2:us-east-1:123456789012:instance/i-0123456789abcdef0"
  ],
  adopt: true
});
```

## Dynamic ResourceSet Creation

Dynamically create a ResourceSet using a list of resources fetched from your AWS environment.

```ts
const ResourceArns = [
  "arn:aws:ec2:us-east-1:123456789012:instance/i-0abcd1234efgh5678",
  "arn:aws:s3:::another-example-bucket"
];

const DynamicResourceSet = await AWS.FMS.ResourceSet("DynamicResourceSet", {
  Name: "DynamicResourceSet",
  ResourceTypeList: ["AWS::EC2::Instance", "AWS::S3::Bucket"],
  Resources: ResourceArns,
  Description: "Dynamically created ResourceSet from existing resources"
});
```
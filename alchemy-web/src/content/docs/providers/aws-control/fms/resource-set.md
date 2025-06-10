---
title: ResourceSet
description: Learn how to create, update, and manage AWS FMS ResourceSets using Alchemy Cloud Control.
---


The ResourceSet resource allows you to manage [AWS FMS ResourceSets](https://docs.aws.amazon.com/fms/latest/userguide/) that define a collection of AWS resources for AWS Firewall Manager policies.

## Minimal Example

Create a basic ResourceSet with required properties and one optional description:

```ts
import AWS from "alchemy/aws/control";

const basicResourceSet = await AWS.FMS.ResourceSet("basicResourceSet", {
  name: "BasicResourceSet",
  resourceTypeList: ["AWS::EC2::Instance"],
  description: "A basic resource set containing EC2 instances"
});
```

## Advanced Configuration

Configure a ResourceSet with multiple resource types and tags:

```ts
const advancedResourceSet = await AWS.FMS.ResourceSet("advancedResourceSet", {
  name: "AdvancedResourceSet",
  resourceTypeList: [
    "AWS::EC2::Instance",
    "AWS::S3::Bucket"
  ],
  resources: [
    "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678",
    "arn:aws:s3:::my-bucket"
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "Website" }
  ]
});
```

## Using Adopt Option

Create a ResourceSet that adopts an existing resource if it already exists:

```ts
const adoptResourceSet = await AWS.FMS.ResourceSet("adoptResourceSet", {
  name: "AdoptResourceSet",
  resourceTypeList: ["AWS::Lambda::Function"],
  adopt: true // Adopt existing resource if it already exists
});
```

## Specifying Multiple Resources

Define a ResourceSet that includes multiple specific resources:

```ts
const multiResourceSet = await AWS.FMS.ResourceSet("multiResourceSet", {
  name: "MultiResourceSet",
  resourceTypeList: ["AWS::EC2::Instance", "AWS::RDS::DBInstance"],
  resources: [
    "arn:aws:ec2:us-east-1:123456789012:instance/i-0abcdefgh12345678",
    "arn:aws:rds:us-east-1:123456789012:db:mydatabase"
  ]
});
```

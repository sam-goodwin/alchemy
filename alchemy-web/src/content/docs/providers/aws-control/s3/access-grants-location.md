---
title: AccessGrantsLocation
description: Learn how to create, update, and manage AWS S3 AccessGrantsLocations using Alchemy Cloud Control.
---


The AccessGrantsLocation resource allows you to define access grants for specific locations in Amazon S3. This resource is useful for managing permissions and access control at a granular level for S3 buckets. For more information, refer to the AWS documentation on [AWS S3 AccessGrantsLocations](https://docs.aws.amazon.com/s3/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic `AccessGrantsLocation` resource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const accessGrantsLocation = await AWS.S3.AccessGrantsLocation("myAccessGrantsLocation", {
  LocationScope: "bucket",
  IamRoleArn: "arn:aws:iam::123456789012:role/SampleRole"
});
```

## Advanced Configuration

In this example, we configure the `AccessGrantsLocation` resource with tags and enable resource adoption if it already exists.

```ts
const advancedAccessGrantsLocation = await AWS.S3.AccessGrantsLocation("advancedAccessGrantsLocation", {
  LocationScope: "object",
  IamRoleArn: "arn:aws:iam::123456789012:role/AnotherSampleRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "S3AccessControl" }
  ],
  adopt: true
});
```

## Resource with Custom IAM Role

This example shows how to create an `AccessGrantsLocation` that specifies a custom IAM role for access management.

```ts
const customIamRoleAccessGrantsLocation = await AWS.S3.AccessGrantsLocation("customIamRoleAccessGrantsLocation", {
  LocationScope: "bucket",
  IamRoleArn: "arn:aws:iam::123456789012:role/CustomAccessRole",
  Tags: [
    { Key: "Purpose", Value: "Custom IAM Role for S3 Access" }
  ]
});
```

## Adoption of Existing Resource

In this example, we demonstrate how to adopt an existing `AccessGrantsLocation` resource instead of failing if it already exists.

```ts
const adoptedAccessGrantsLocation = await AWS.S3.AccessGrantsLocation("adoptedAccessGrantsLocation", {
  LocationScope: "object",
  IamRoleArn: "arn:aws:iam::123456789012:role/AdoptedRole",
  adopt: true
});
```

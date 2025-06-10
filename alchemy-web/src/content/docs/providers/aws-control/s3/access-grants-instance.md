---
title: AccessGrantsInstance
description: Learn how to create, update, and manage AWS S3 AccessGrantsInstances using Alchemy Cloud Control.
---


The AccessGrantsInstance resource allows you to manage access grants for AWS S3 buckets and objects. For more information, refer to the official AWS documentation on [AWS S3 AccessGrantsInstances](https://docs.aws.amazon.com/s3/latest/userguide/).

## Minimal Example

Create a basic AccessGrantsInstance with the Identity Center ARN and tags.

```ts
import AWS from "alchemy/aws/control";

const accessGrantsInstance = await AWS.S3.AccessGrantsInstance("basicAccessGrants", {
  IdentityCenterArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-efgh-5678-ijkl-9876543210mn",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataPipeline" }
  ]
});
```

## Advanced Configuration

Configure an AccessGrantsInstance to adopt an existing resource instead of failing if the resource already exists.

```ts
const advancedAccessGrantsInstance = await AWS.S3.AccessGrantsInstance("advancedAccessGrants", {
  IdentityCenterArn: "arn:aws:identitystore:us-west-2:123456789012:instance/wxyz9876-abcd-1234-efgh-567890abcdef",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "ImageProcessing" }
  ],
  adopt: true
});
```

## Example with Additional Properties

Create an AccessGrantsInstance and retrieve its ARN and creation time.

```ts
const detailedAccessGrantsInstance = await AWS.S3.AccessGrantsInstance("detailedAccessGrants", {
  IdentityCenterArn: "arn:aws:identitystore:us-west-2:123456789012:instance/ijklmnop-qrst-uvwx-yz12-34567890abcd",
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Project", Value: "BackupService" }
  ]
});

// Accessing additional properties
console.log(`ARN: ${detailedAccessGrantsInstance.Arn}`);
console.log(`Created At: ${detailedAccessGrantsInstance.CreationTime}`);
```

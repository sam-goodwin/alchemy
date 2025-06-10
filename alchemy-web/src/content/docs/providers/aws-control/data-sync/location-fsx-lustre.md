---
title: LocationFSxLustre
description: Learn how to create, update, and manage AWS DataSync LocationFSxLustres using Alchemy Cloud Control.
---


The LocationFSxLustre resource allows you to manage [AWS DataSync Location FSx Lustre](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data to and from Amazon FSx for Lustre file systems.

## Minimal Example

Create a basic DataSync LocationFSxLustre with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const locationFSxLustre = await AWS.DataSync.LocationFSxLustre("myLocationFSxLustre", {
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data"
});
```

## Advanced Configuration

Configure a DataSync LocationFSxLustre with tags for better resource management.

```ts
const taggedLocationFSxLustre = await AWS.DataSync.LocationFSxLustre("taggedLocationFSxLustre", {
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataPipeline" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing DataSync LocationFSxLustre resource instead of failing when it already exists, set the `adopt` property to true.

```ts
const existingLocationFSxLustre = await AWS.DataSync.LocationFSxLustre("existingLocationFSxLustre", {
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/existing-data",
  adopt: true
});
```

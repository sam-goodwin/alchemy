---
title: LocationFSxWindows
description: Learn how to create, update, and manage AWS DataSync LocationFSxWindows using Alchemy Cloud Control.
---


The LocationFSxWindows resource allows you to create and manage an AWS DataSync location that uses FSx for Windows File Server as a source or destination for data transfer. For more information, see the [AWS DataSync LocationFSxWindows documentation](https://docs.aws.amazon.com/datasync/latest/userguide/).

## Minimal Example

Create a basic DataSync LocationFSxWindows resource with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const fsxLocation = await AWS.DataSync.LocationFSxWindows("myFsxLocation", {
  User: "Administrator",
  Password: alchemy.secret(process.env.FSX_PASSWORD!),
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data"
});
```

## Advanced Configuration

Configure a DataSync LocationFSxWindows with additional settings, including domain and tags.

```ts
const advancedFsxLocation = await AWS.DataSync.LocationFSxWindows("advancedFsxLocation", {
  User: "Administrator",
  Password: alchemy.secret(process.env.FSX_PASSWORD!),
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-0123456789abcdef0",
  Domain: "example.com",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data",
  Tags: [
    { Key: "Project", Value: "DataSync" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing DataSync LocationFSxWindows resource instead of creating a new one, set the `adopt` property to true.

```ts
const adoptedFsyncLocation = await AWS.DataSync.LocationFSxWindows("adoptedFsxLocation", {
  User: "Administrator",
  Password: alchemy.secret(process.env.FSX_PASSWORD!),
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  adopt: true
});
```

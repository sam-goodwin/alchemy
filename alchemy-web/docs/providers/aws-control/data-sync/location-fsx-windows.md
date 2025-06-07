---
title: Managing AWS DataSync LocationFSxWindows with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationFSxWindows using Alchemy Cloud Control.
---

# LocationFSxWindows

The LocationFSxWindows resource lets you manage [AWS DataSync LocationFSxWindows](https://docs.aws.amazon.com/datasync/latest/userguide/) used for transferring data between on-premises storage and Amazon FSx for Windows File Server.

## Minimal Example

Create a basic AWS DataSync LocationFSxWindows with essential properties:

```ts
import AWS from "alchemy/aws/control";

const dataSyncLocation = await AWS.DataSync.LocationFSxWindows("MyDataSyncLocation", {
  User: "Domain\\UserName",
  SecurityGroupArns: ["arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"],
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:filesystem/fs-0123456789abcdef0",
  Password: "SuperSecretPassword123",
  Domain: "mydomain.local"
});
```

## Advanced Configuration

Configure an AWS DataSync LocationFSxWindows with additional optional settings, such as a specific subdirectory and tags:

```ts
const advancedDataSyncLocation = await AWS.DataSync.LocationFSxWindows("AdvancedDataSyncLocation", {
  User: "Domain\\UserName",
  SecurityGroupArns: ["arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"],
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:filesystem/fs-0123456789abcdef0",
  Password: "SuperSecretPassword123",
  Domain: "mydomain.local",
  Subdirectory: "/data/sync",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataSync" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing resource without failing, use the `adopt` property:

```ts
const adoptedDataSyncLocation = await AWS.DataSync.LocationFSxWindows("AdoptedDataSyncLocation", {
  User: "Domain\\UserName",
  SecurityGroupArns: ["arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"],
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:filesystem/fs-0123456789abcdef0",
  Password: "SuperSecretPassword123",
  Domain: "mydomain.local",
  adopt: true
});
```
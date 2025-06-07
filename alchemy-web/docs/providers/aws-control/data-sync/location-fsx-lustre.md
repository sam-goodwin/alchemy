---
title: Managing AWS DataSync LocationFSxLustres with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationFSxLustres using Alchemy Cloud Control.
---

# LocationFSxLustre

The LocationFSxLustre resource lets you manage [AWS DataSync LocationFSxLustres](https://docs.aws.amazon.com/datasync/latest/userguide/) for data transfer between on-premises storage and AWS services. This resource facilitates the integration of FSx for Lustre file systems into your data workflows.

## Minimal Example

Create a basic FSx Lustre location with essential properties:

```ts
import AWS from "alchemy/aws/control";

const BasicLocationFSxLustre = await AWS.DataSync.LocationFSxLustre("BasicFSxLustreLocation", {
  FsxFilesystemArn: "arn:aws:fsx:us-east-1:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-east-1:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataSync" }
  ]
});
```

## Advanced Configuration

Enhance the FSx Lustre location with additional security group ARNs, and specify tags for better organization:

```ts
const AdvancedLocationFSxLustre = await AWS.DataSync.LocationFSxLustre("AdvancedFSxLustreLocation", {
  FsxFilesystemArn: "arn:aws:fsx:us-east-1:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-east-1:123456789012:security-group/sg-0123456789abcdef0",
    "arn:aws:ec2:us-east-1:123456789012:security-group/sg-0abcdef1234567890"
  ],
  Subdirectory: "/data",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataOps" }
  ],
  adopt: true
});
```

## Specific Use Case: Data Migration

Set up a location for migrating data from an on-premises file system to an FSx Lustre file system:

```ts
const MigrationLocationFSxLustre = await AWS.DataSync.LocationFSxLustre("MigrationFSxLustreLocation", {
  FsxFilesystemArn: "arn:aws:fsx:us-east-1:123456789012:file-system/fs-0123456789abcdef0",
  SecurityGroupArns: [
    "arn:aws:ec2:us-east-1:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/migrate",
  Tags: [
    { Key: "Purpose", Value: "data-migration" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```
---
title: Managing AWS DataSync LocationEFSs with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationEFSs using Alchemy Cloud Control.
---

# LocationEFS

The LocationEFS resource allows you to manage [AWS DataSync LocationEFSs](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between Amazon EFS and other AWS storage services.

## Minimal Example

Create a basic DataSync LocationEFS with the necessary properties.

```ts
import AWS from "alchemy/aws/control";

const BasicLocationEFS = await AWS.DataSync.LocationEFS("BasicLocationEFS", {
  Ec2Config: {
    SecurityGroupArns: ["arn:aws:ec2:us-west-2:123456789012:security-group/sg-0abc12345def67890"],
    SubnetArn: "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abc12345def67890"
  },
  EfsFilesystemArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:file-system/fs-0abc12345def67890",
  InTransitEncryption: "ENABLED",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataSync" }
  ]
});
```

## Advanced Configuration

Configure a DataSync LocationEFS with additional options such as an access point and a specific subdirectory.

```ts
const AdvancedLocationEFS = await AWS.DataSync.LocationEFS("AdvancedLocationEFS", {
  Ec2Config: {
    SecurityGroupArns: ["arn:aws:ec2:us-west-2:123456789012:security-group/sg-0abc12345def67890"],
    SubnetArn: "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abc12345def67890"
  },
  EfsFilesystemArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:file-system/fs-0abc12345def67890",
  AccessPointArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:access-point/fsap-0abc12345def67890",
  Subdirectory: "/data",
  InTransitEncryption: "ENABLED",
  FileSystemAccessRoleArn: "arn:aws:iam::123456789012:role/DataSyncEFSRole",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataSync" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing EFS resource instead of creating a new one, set the `adopt` property to `true`.

```ts
const AdoptExistingLocationEFS = await AWS.DataSync.LocationEFS("AdoptExistingLocationEFS", {
  Ec2Config: {
    SecurityGroupArns: ["arn:aws:ec2:us-west-2:123456789012:security-group/sg-0abc12345def67890"],
    SubnetArn: "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abc12345def67890"
  },
  EfsFilesystemArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:file-system/fs-0abc12345def67890",
  adopt: true
});
```
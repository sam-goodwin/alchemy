---
title: LocationEFS
description: Learn how to create, update, and manage AWS DataSync LocationEFSs using Alchemy Cloud Control.
---


The LocationEFS resource lets you manage [AWS DataSync LocationEFSs](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between AWS and on-premises environments using Amazon Elastic File System (EFS).

## Minimal Example

Create a basic EFS location with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const efsLocation = await AWS.DataSync.LocationEFS("myEfsLocation", {
  EfsFilesystemArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:file-system/fs-12345678",
  Ec2Config: {
    SecurityGroupArn: "arn:aws:ec2:us-west-2:123456789012:security-group/sg-12345678",
    SubnetArn: "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-12345678"
  },
  Tags: [
    { Key: "Project", Value: "DataSync" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure an EFS location with additional optional settings, including access point and encryption.

```ts
const advancedEfsLocation = await AWS.DataSync.LocationEFS("advancedEfsLocation", {
  EfsFilesystemArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:file-system/fs-12345678",
  Ec2Config: {
    SecurityGroupArn: "arn:aws:ec2:us-west-2:123456789012:security-group/sg-12345678",
    SubnetArn: "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-12345678"
  },
  AccessPointArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:access-point/fsap-12345678",
  Subdirectory: "/data",
  InTransitEncryption: "ENABLED",
  FileSystemAccessRoleArn: "arn:aws:iam::123456789012:role/DataSyncAccessRole",
  Tags: [
    { Key: "Project", Value: "DataSync" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Using an Existing Resource

Adopt an existing EFS location instead of failing if the resource already exists.

```ts
const adoptEfsLocation = await AWS.DataSync.LocationEFS("adoptEfsLocation", {
  EfsFilesystemArn: "arn:aws:elasticfilesystem:us-west-2:123456789012:file-system/fs-12345678",
  Ec2Config: {
    SecurityGroupArn: "arn:aws:ec2:us-west-2:123456789012:security-group/sg-12345678",
    SubnetArn: "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-12345678"
  },
  adopt: true // Adopt the existing resource
});
```

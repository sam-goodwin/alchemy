---
title: LocationFSxONTAP
description: Learn how to create, update, and manage AWS DataSync LocationFSxONTAPs using Alchemy Cloud Control.
---


The LocationFSxONTAP resource allows you to manage [AWS DataSync Location FSx for ONTAP](https://docs.aws.amazon.com/datasync/latest/userguide/) configurations, enabling data transfer between on-premises storage and AWS cloud storage.

## Minimal Example

Create a basic LocationFSxONTAP with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const locationFsxOntap = await AWS.DataSync.LocationFSxONTAP("fsxLocation", {
  StorageVirtualMachineArn: "arn:aws:fsx:us-west-2:123456789012:storage-virtual-machine:fsx-svm",
  Subdirectory: "/data",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-abc123"
  ]
});
```

## Advanced Configuration

Configure a LocationFSxONTAP with additional protocol and tags.

```ts
const advancedFsxLocation = await AWS.DataSync.LocationFSxONTAP("advancedFsxLocation", {
  StorageVirtualMachineArn: "arn:aws:fsx:us-west-2:123456789012:storage-virtual-machine:fsx-svm",
  Subdirectory: "/data/advanced",
  Protocol: {
    Nfs: {
      MountOptions: {
        Version: "NFS3"
      }
    }
  },
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-def456"
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "DataMigration"
    }
  ]
});
```

## Adoption of Existing Resources

Create a LocationFSxONTAP while adopting an existing resource if it already exists.

```ts
const adoptFsxLocation = await AWS.DataSync.LocationFSxONTAP("adoptFsxLocation", {
  StorageVirtualMachineArn: "arn:aws:fsx:us-west-2:123456789012:storage-virtual-machine:fsx-svm",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-ghi789"
  ],
  adopt: true // Enables adoption of an existing resource
});
```

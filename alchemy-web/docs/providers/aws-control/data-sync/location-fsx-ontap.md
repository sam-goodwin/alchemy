---
title: Managing AWS DataSync LocationFSxONTAPs with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationFSxONTAPs using Alchemy Cloud Control.
---

# LocationFSxONTAP

The LocationFSxONTAP resource allows you to manage AWS DataSync locations for FSx for ONTAP file systems. This resource enables you to efficiently transfer data between your on-premises storage and AWS. For more information, visit the [AWS DataSync LocationFSxONTAPs](https://docs.aws.amazon.com/datasync/latest/userguide/) documentation.

## Minimal Example

Create a basic FSx for ONTAP location with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicLocationFSxONTAP = await AWS.DataSync.LocationFSxONTAP("BasicLocation", {
  StorageVirtualMachineArn: "arn:aws:fsx:us-west-2:123456789012:storage-virtual-machine:fsx-svm-12345678",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-12345678"
  ],
  Subdirectory: "/data",
  Tags: [
    { Key: "Purpose", Value: "DataSync" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

## Advanced Configuration

Configure an FSx for ONTAP location with additional protocol options and security settings.

```ts
const AdvancedLocationFSxONTAP = await AWS.DataSync.LocationFSxONTAP("AdvancedLocation", {
  StorageVirtualMachineArn: "arn:aws:fsx:us-west-2:123456789012:storage-virtual-machine:fsx-svm-87654321",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-87654321"
  ],
  Subdirectory: "/data/advanced",
  Protocol: {
    NFS: {
      MountOptions: {
        Version: "3"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataOps" }
  ]
});
```

## Security Group Configuration

Create an FSx for ONTAP location with a specific security group to control access.

```ts
const SecuredLocationFSxONTAP = await AWS.DataSync.LocationFSxONTAP("SecuredLocation", {
  StorageVirtualMachineArn: "arn:aws:fsx:us-west-2:123456789012:storage-virtual-machine:fsx-svm-11223344",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-11223344"
  ],
  Subdirectory: "/data/secured",
  Protocol: {
    NFS: {
      MountOptions: {
        Version: "4"
      }
    }
  },
  Tags: [
    { Key: "Security", Value: "high" },
    { Key: "Project", Value: "DataMigration" }
  ]
});
```
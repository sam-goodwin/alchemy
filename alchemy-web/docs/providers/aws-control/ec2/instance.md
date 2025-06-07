---
title: Managing AWS EC2 Instances with Alchemy
description: Learn how to create, update, and manage AWS EC2 Instances using Alchemy Cloud Control.
---

# Instance

The Instance resource lets you manage [AWS EC2 Instances](https://docs.aws.amazon.com/ec2/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic EC2 instance with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicInstance = await AWS.EC2.Instance("BasicInstance", {
  ImageId: "ami-0c55b159cbfafe1f0", // Amazon Linux 2 AMI
  InstanceType: "t2.micro", // Type of instance
  KeyName: "my-key-pair", // Key pair for SSH access
  SecurityGroupIds: ["sg-0abcd1234efgh5678"], // Security group ID
  SubnetId: "subnet-0a1b2c3d4e5f6g7h8", // Subnet ID
  Tags: [
    { Key: "Name", Value: "BasicInstance" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an EC2 instance with advanced options like Elastic IP and monitoring.

```ts
const AdvancedInstance = await AWS.EC2.Instance("AdvancedInstance", {
  ImageId: "ami-0c55b159cbfafe1f0",
  InstanceType: "t3.medium",
  KeyName: "my-key-pair",
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  SubnetId: "subnet-0a1b2c3d4e5f6g7h8",
  Monitoring: true, // Enable detailed monitoring
  ElasticGpuSpecifications: [
    { Type: "eg1.medium" }
  ],
  Tags: [
    { Key: "Name", Value: "AdvancedInstance" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## User Data for Initialization

Launch an instance with user data to configure it on startup.

```ts
const UserDataInstance = await AWS.EC2.Instance("UserDataInstance", {
  ImageId: "ami-0c55b159cbfafe1f0",
  InstanceType: "t2.micro",
  KeyName: "my-key-pair",
  UserData: Buffer.from(`#cloud-config
package_update: true
packages:
  - nginx
  - git`).toString('base64'), // Base64 encoded user data
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  SubnetId: "subnet-0a1b2c3d4e5f6g7h8",
  Tags: [
    { Key: "Name", Value: "UserDataInstance" },
    { Key: "Environment", Value: "Testing" }
  ]
});
```

## Instance with Block Device Mappings

Create an instance that includes block device mappings for additional storage.

```ts
const StorageInstance = await AWS.EC2.Instance("StorageInstance", {
  ImageId: "ami-0c55b159cbfafe1f0",
  InstanceType: "t2.micro",
  KeyName: "my-key-pair",
  BlockDeviceMappings: [
    {
      DeviceName: "/dev/sda1",
      Ebs: {
        VolumeSize: 20, // Size in GB
        DeleteOnTermination: true
      }
    },
    {
      DeviceName: "/dev/sdb",
      Ebs: {
        VolumeSize: 30,
        VolumeType: "gp2",
        DeleteOnTermination: true
      }
    }
  ],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  SubnetId: "subnet-0a1b2c3d4e5f6g7h8",
  Tags: [
    { Key: "Name", Value: "StorageInstance" },
    { Key: "Environment", Value: "Production" }
  ]
});
``` 

This documentation provides a comprehensive guide on how to create and manage AWS EC2 instances using the Alchemy framework, tailored to meet various use cases and configurations.
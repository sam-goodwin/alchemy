---
title: Instance
description: Learn how to create, update, and manage AWS EC2 Instances using Alchemy Cloud Control.
---


The Instance resource lets you manage [AWS EC2 Instances](https://docs.aws.amazon.com/ec2/latest/userguide/) for running virtual servers in the cloud.

## Minimal Example

Create a basic EC2 instance with a specified instance type, image ID, and key name.

```ts
import AWS from "alchemy/aws/control";

const myEC2Instance = await AWS.EC2.Instance("myEC2Instance", {
  InstanceType: "t2.micro",
  ImageId: "ami-0abcdef1234567890",
  KeyName: "my-key-pair", 
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetId: "subnet-0123456789abcdef0"
});
```

## Advanced Configuration

Configure an EC2 instance with additional options such as EBS optimization, IAM instance profile, and user data.

```ts
const advancedEC2Instance = await AWS.EC2.Instance("advancedEC2Instance", {
  InstanceType: "t2.medium",
  ImageId: "ami-0abcdef1234567890",
  KeyName: "my-key-pair", 
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetId: "subnet-0123456789abcdef0",
  EbsOptimized: true,
  IamInstanceProfile: "myIAMProfile",
  UserData: `#!/bin/bash
              echo "Hello, World!" > /var/tmp/hello.txt`
});
```

## Enhanced Networking Configuration

Create an EC2 instance with custom private IP and network interfaces.

```ts
const networkedEC2Instance = await AWS.EC2.Instance("networkedEC2Instance", {
  InstanceType: "t2.large",
  ImageId: "ami-0abcdef1234567890",
  KeyName: "my-key-pair",
  NetworkInterfaces: [{
    AssociatePublicIpAddress: true,
    DeviceIndex: 0,
    SubnetId: "subnet-0123456789abcdef0",
    PrivateIpAddress: "10.0.0.10",
    Groups: ["sg-0123456789abcdef0"]
  }]
});
```

## Instance with EBS Volume

Launch an EC2 instance with an additional EBS volume specified in the block device mappings.

```ts
const ebsInstance = await AWS.EC2.Instance("ebsInstance", {
  InstanceType: "t2.medium",
  ImageId: "ami-0abcdef1234567890",
  KeyName: "my-key-pair",
  BlockDeviceMappings: [{
    DeviceName: "/dev/sdh",
    Ebs: {
      VolumeSize: 20, 
      VolumeType: "gp2",
      DeleteOnTermination: true
    }
  }]
});
```

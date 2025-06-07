---
title: Managing AWS AutoScaling LaunchConfigurations with Alchemy
description: Learn how to create, update, and manage AWS AutoScaling LaunchConfigurations using Alchemy Cloud Control.
---

# LaunchConfiguration

The LaunchConfiguration resource lets you create and manage [AWS AutoScaling LaunchConfigurations](https://docs.aws.amazon.com/autoscaling/latest/userguide/) which define the settings for EC2 instances launched by an Auto Scaling group.

## Minimal Example

Create a basic LaunchConfiguration with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicLaunchConfiguration = await AWS.AutoScaling.LaunchConfiguration("BasicLaunchConfig", {
  ImageId: "ami-0abcdef1234567890",
  InstanceType: "t2.micro",
  SecurityGroups: ["sg-0123456789abcdef0"],
  KeyName: "my-key-pair"
});
```

## Advanced Configuration

Configure a LaunchConfiguration with enhanced settings including IAM instance profile and EBS optimization.

```ts
const AdvancedLaunchConfiguration = await AWS.AutoScaling.LaunchConfiguration("AdvancedLaunchConfig", {
  ImageId: "ami-0abcdef1234567890",
  InstanceType: "t2.micro",
  SecurityGroups: ["sg-0123456789abcdef0"],
  KeyName: "my-key-pair",
  IamInstanceProfile: "myIamRole",
  EbsOptimized: true,
  MetadataOptions: {
    HttpTokens: "required",
    HttpPutResponseHopLimit: 2
  }
});
```

## Spot Instance Configuration

Create a LaunchConfiguration for launching Spot Instances with a specified maximum price.

```ts
const SpotLaunchConfiguration = await AWS.AutoScaling.LaunchConfiguration("SpotLaunchConfig", {
  ImageId: "ami-0abcdef1234567890",
  InstanceType: "t2.micro",
  SpotPrice: "0.05", // Maximum price per hour
  SecurityGroups: ["sg-0123456789abcdef0"],
  KeyName: "my-key-pair"
});
```

## Multiple Block Device Mappings

Define a LaunchConfiguration that includes multiple block device mappings for EBS volumes.

```ts
const MultiBlockDeviceLaunchConfiguration = await AWS.AutoScaling.LaunchConfiguration("MultiBlockDeviceLaunchConfig", {
  ImageId: "ami-0abcdef1234567890",
  InstanceType: "t2.micro",
  BlockDeviceMappings: [
    {
      DeviceName: "/dev/sda1",
      Ebs: {
        VolumeSize: 30,
        VolumeType: "gp2",
        DeleteOnTermination: true
      }
    },
    {
      DeviceName: "/dev/sdb",
      Ebs: {
        VolumeSize: 50,
        VolumeType: "gp2",
        DeleteOnTermination: true
      }
    }
  ],
  SecurityGroups: ["sg-0123456789abcdef0"],
  KeyName: "my-key-pair"
});
```
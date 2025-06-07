---
title: Managing AWS EC2 LaunchTemplates with Alchemy
description: Learn how to create, update, and manage AWS EC2 LaunchTemplates using Alchemy Cloud Control.
---

# LaunchTemplate

The LaunchTemplate resource lets you manage [AWS EC2 LaunchTemplates](https://docs.aws.amazon.com/ec2/latest/userguide/) for configuring instance settings and launching EC2 instances.

## Minimal Example

Create a basic LaunchTemplate with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicLaunchTemplate = await AWS.EC2.LaunchTemplate("BasicLaunchTemplate", {
  LaunchTemplateName: "MyBasicLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "t2.micro",
    ImageId: "ami-0abcdef1234567890", // Replace with a valid AMI ID
    KeyName: "my-key-pair", // Replace with your key pair name
    SecurityGroupIds: ["sg-0123456789abcdef0"], // Replace with a valid security group ID
  },
  TagSpecifications: [
    {
      ResourceType: "launch-template",
      Tags: [
        { Key: "Environment", Value: "development" },
        { Key: "Team", Value: "DevOps" }
      ]
    }
  ]
});
```

## Advanced Configuration

Configure a LaunchTemplate with additional settings like block device mappings and user data.

```ts
const AdvancedLaunchTemplate = await AWS.EC2.LaunchTemplate("AdvancedLaunchTemplate", {
  LaunchTemplateName: "MyAdvancedLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "t3.medium",
    ImageId: "ami-0abcdef1234567890", // Replace with a valid AMI ID
    KeyName: "my-key-pair", // Replace with your key pair name
    SecurityGroupIds: ["sg-0123456789abcdef0"], // Replace with a valid security group ID
    UserData: Buffer.from("#!/bin/bash\necho 'Hello World' > /var/tmp/hello.txt").toString('base64'),
    BlockDeviceMappings: [
      {
        DeviceName: "/dev/sda1",
        Ebs: {
          VolumeSize: 20,
          VolumeType: "gp2",
          DeleteOnTermination: true
        }
      }
    ]
  }
});
```

## Specific Use Case: Spot Instances

Create a LaunchTemplate specifically for launching Spot Instances with a specified price.

```ts
const SpotInstanceLaunchTemplate = await AWS.EC2.LaunchTemplate("SpotInstanceLaunchTemplate", {
  LaunchTemplateName: "MySpotInstanceLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "t3.large",
    ImageId: "ami-0abcdef1234567890", // Replace with a valid AMI ID
    KeyName: "my-key-pair", // Replace with your key pair name
    SecurityGroupIds: ["sg-0123456789abcdef0"], // Replace with a valid security group ID
    InstanceMarketOptions: {
      MarketType: "spot",
      SpotOptions: {
        MaxPrice: "0.05" // Set desired max price for the Spot Instance
      }
    }
  }
});
```

## Specific Use Case: Auto-Scaling

Create a LaunchTemplate optimized for use with Auto Scaling groups.

```ts
const AutoScalingLaunchTemplate = await AWS.EC2.LaunchTemplate("AutoScalingLaunchTemplate", {
  LaunchTemplateName: "MyAutoScalingLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "m5.large",
    ImageId: "ami-0abcdef1234567890", // Replace with a valid AMI ID
    KeyName: "my-key-pair", // Replace with your key pair name
    SecurityGroupIds: ["sg-0123456789abcdef0"], // Replace with a valid security group ID
    TagSpecifications: [
      {
        ResourceType: "instance",
        Tags: [
          { Key: "Environment", Value: "production" },
          { Key: "Application", Value: "web-app" }
        ]
      }
    ]
  }
});
```
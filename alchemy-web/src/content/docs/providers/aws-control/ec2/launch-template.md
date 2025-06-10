---
title: LaunchTemplate
description: Learn how to create, update, and manage AWS EC2 LaunchTemplates using Alchemy Cloud Control.
---


The LaunchTemplate resource lets you manage [AWS EC2 LaunchTemplates](https://docs.aws.amazon.com/ec2/latest/userguide/) for configuring EC2 instance settings, including instance type, key pairs, security groups, and more.

## Minimal Example

Create a basic LaunchTemplate with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleLaunchTemplate = await AWS.EC2.LaunchTemplate("simpleLaunchTemplate", {
  LaunchTemplateName: "MyFirstLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "t2.micro",
    KeyName: "my-key-pair",
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    ImageId: "ami-0123456789abcdef0" // Amazon Linux 2 AMI
  }
});
```

## Advanced Configuration

Configure a LaunchTemplate with advanced options, including block device mappings and user data.

```ts
const advancedLaunchTemplate = await AWS.EC2.LaunchTemplate("advancedLaunchTemplate", {
  LaunchTemplateName: "MyAdvancedLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "t3.medium",
    KeyName: "my-key-pair",
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    ImageId: "ami-0123456789abcdef0",
    BlockDeviceMappings: [
      {
        DeviceName: "/dev/sda1",
        Ebs: {
          VolumeSize: 20,
          VolumeType: "gp2",
          DeleteOnTermination: true
        }
      }
    ],
    UserData: Buffer.from("#!/bin/bash\nyum update -y").toString("base64") // Base64-encoded user data
  },
  VersionDescription: "Initial version with advanced settings"
});
```

## Using Tag Specifications

Create a LaunchTemplate with Tag Specifications to help organize resources.

```ts
const taggedLaunchTemplate = await AWS.EC2.LaunchTemplate("taggedLaunchTemplate", {
  LaunchTemplateName: "MyTaggedLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "t3.small",
    KeyName: "my-key-pair",
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    ImageId: "ami-0123456789abcdef0"
  },
  TagSpecifications: [
    {
      ResourceType: "launch-template",
      Tags: [
        {
          Key: "Environment",
          Value: "Development"
        },
        {
          Key: "Project",
          Value: "MyAwesomeProject"
        }
      ]
    }
  ]
});
```

## Adoption of Existing Resources

Create a LaunchTemplate that adopts an existing resource if it already exists.

```ts
const adoptedLaunchTemplate = await AWS.EC2.LaunchTemplate("adoptedLaunchTemplate", {
  LaunchTemplateName: "MyExistingLaunchTemplate",
  LaunchTemplateData: {
    InstanceType: "t2.micro",
    KeyName: "my-key-pair",
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    ImageId: "ami-0123456789abcdef0"
  },
  adopt: true // Adopt existing resource instead of failing
});
```

---
title: LaunchConfiguration
description: Learn how to create, update, and manage AWS AutoScaling LaunchConfigurations using Alchemy Cloud Control.
---


The LaunchConfiguration resource lets you define an EC2 instance configuration used by Auto Scaling groups to launch instances. For more details, refer to the [AWS AutoScaling LaunchConfigurations documentation](https://docs.aws.amazon.com/autoscaling/latest/userguide/).

## Minimal Example

Create a basic LaunchConfiguration with required properties and commonly used optional settings.

```ts
import AWS from "alchemy/aws/control";

const launchConfig = await AWS.AutoScaling.LaunchConfiguration("myLaunchConfig", {
  imageId: "ami-0abcdef1234567890", // Replace with a valid AMI ID
  instanceType: "t2.micro", // Select a suitable instance type
  keyName: "myKeyPair", // Provide your key pair name for SSH access
  securityGroups: ["sg-0123456789abcdef0"], // Use a valid security group ID
  associatePublicIpAddress: true // Enable public IP assignment
});
```

## Advanced Configuration

Customize the LaunchConfiguration with additional options such as monitoring and EBS optimization.

```ts
const advancedLaunchConfig = await AWS.AutoScaling.LaunchConfiguration("advancedLaunchConfig", {
  imageId: "ami-0abcdef1234567890",
  instanceType: "t2.micro",
  keyName: "myKeyPair",
  securityGroups: ["sg-0123456789abcdef0"],
  ebsOptimized: true, // Optimize EBS for better performance
  instanceMonitoring: true, // Enable detailed monitoring
  blockDeviceMappings: [{
    deviceName: "/dev/sda1",
    ebs: {
      volumeSize: 20, // Set volume size in GB
      deleteOnTermination: true // Delete the volume on instance termination
    }
  }]
});
```

## Spot Instance Configuration

Configure a LaunchConfiguration to launch Spot Instances with a specified maximum price.

```ts
const spotLaunchConfig = await AWS.AutoScaling.LaunchConfiguration("spotLaunchConfig", {
  imageId: "ami-0abcdef1234567890",
  instanceType: "t2.micro",
  keyName: "myKeyPair",
  securityGroups: ["sg-0123456789abcdef0"],
  spotPrice: "0.03", // Set maximum price for the Spot Instance
  instanceMonitoring: false // Disable detailed monitoring for cost saving
});
```

## Custom User Data

Provide a user data script to initialize the instance upon launch.

```ts
const userDataLaunchConfig = await AWS.AutoScaling.LaunchConfiguration("userDataLaunchConfig", {
  imageId: "ami-0abcdef1234567890",
  instanceType: "t2.micro",
  keyName: "myKeyPair",
  securityGroups: ["sg-0123456789abcdef0"],
  userData: `#!/bin/bash
              echo "Hello World" > /var/www/html/index.html
              systemctl start httpd`
});
```

---
title: InstanceProfile
description: Learn how to create, update, and manage AWS IAM InstanceProfiles using Alchemy Cloud Control.
---


The InstanceProfile resource allows you to manage [AWS IAM InstanceProfiles](https://docs.aws.amazon.com/iam/latest/userguide/) which are used to associate IAM roles with EC2 instances to grant them permissions.

## Minimal Example

Create a basic instance profile with a specified role and a name.

```ts
import AWS from "alchemy/aws/control";

const instanceProfile = await AWS.IAM.InstanceProfile("basicInstanceProfile", {
  instanceProfileName: "WebServerProfile",
  roles: ["WebServerRole"],
  path: "/instance-profiles/"
});
```

## Advanced Configuration

Add additional properties such as a custom path for the instance profile.

```ts
const advancedInstanceProfile = await AWS.IAM.InstanceProfile("advancedInstanceProfile", {
  instanceProfileName: "DatabaseServerProfile",
  roles: ["DatabaseAccessRole"],
  path: "/instance-profiles/secure/",
  adopt: true // Adopt existing resource if it exists
});
```

## Associating Multiple Roles

Create an instance profile that can associate multiple roles for broader permissions.

```ts
const multiRoleInstanceProfile = await AWS.IAM.InstanceProfile("multiRoleInstanceProfile", {
  instanceProfileName: "AppServerProfile",
  roles: ["AppRole", "MonitoringRole"],
  path: "/instance-profiles/app/"
});
```

## Using Instance Profiles in EC2

Demonstrate how to associate the instance profile with an EC2 instance.

```ts
import AWS from "alchemy/aws/control";

const ec2Instance = await AWS.EC2.Instance("appServerInstance", {
  imageId: "ami-0abcdef1234567890", // Replace with a valid AMI ID
  instanceType: "t2.micro",
  iamInstanceProfile: multiRoleInstanceProfile.instanceProfileName,
  minCount: 1,
  maxCount: 1
});
```

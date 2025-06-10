---
title: Instance
description: Learn how to create, update, and manage AWS Lightsail Instances using Alchemy Cloud Control.
---


The Instance resource lets you manage [AWS Lightsail Instances](https://docs.aws.amazon.com/lightsail/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Lightsail Instance with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicInstance = await AWS.Lightsail.Instance("myBasicInstance", {
  InstanceName: "MyFirstInstance",
  BundleId: "micro_1_0",
  BlueprintId: "os_debian_10",
  KeyPairName: "myKeyPair"
});
```

## Advanced Configuration

Configure an instance with additional properties like networking and user data for custom initial setup.

```ts
const advancedInstance = await AWS.Lightsail.Instance("myAdvancedInstance", {
  InstanceName: "MyAdvancedInstance",
  BundleId: "nano_1_0",
  BlueprintId: "os_ubuntu_20_04",
  KeyPairName: "myKeyPair",
  UserData: "#!/bin/bash\nyum update -y\n",
  Networking: {
    Ports: [{
      fromPort: 22,
      toPort: 22,
      protocol: "tcp",
      cidr: "0.0.0.0/0"
    }]
  }
});
```

## Instance with Tags and Add-Ons

Create an instance with tags for better management and enable add-ons for additional features.

```ts
const taggedInstance = await AWS.Lightsail.Instance("myTaggedInstance", {
  InstanceName: "MyTaggedInstance",
  BundleId: "small_1_0",
  BlueprintId: "os_windows_2019",
  KeyPairName: "myKeyPair",
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }, {
    Key: "Project",
    Value: "WebApp"
  }],
  AddOns: [{
    Key: "Monitoring",
    Value: "Enabled"
  }]
});
```

## Instance with Specific Availability Zone

Deploy an instance in a specific availability zone for regional redundancy.

```ts
const zonedInstance = await AWS.Lightsail.Instance("myZonedInstance", {
  InstanceName: "MyZonedInstance",
  BundleId: "medium_1_0",
  BlueprintId: "os_centos_8",
  AvailabilityZone: "us-east-1a",
  KeyPairName: "myKeyPair"
});
```

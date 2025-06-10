---
title: Instance
description: Learn how to create, update, and manage AWS OpsWorks Instances using Alchemy Cloud Control.
---


The Instance resource lets you manage [AWS OpsWorks Instances](https://docs.aws.amazon.com/opsworks/latest/userguide/) in your applications, providing the ability to configure, deploy, and manage EC2 instances within a stack.

## Minimal Example

Create an OpsWorks instance with the required properties and some common optional settings like EBS optimization and SSH key:

```ts
import AWS from "alchemy/aws/control";

const opsWorksInstance = await AWS.OpsWorks.Instance("myOpsWorksInstance", {
  InstanceType: "t2.micro",
  LayerIds: ["myLayerId"],
  StackId: "myStackId",
  EbsOptimized: true,
  SshKeyName: "mySshKey"
});
```

## Advanced Configuration

Configure an OpsWorks instance with additional settings such as custom AMI, agent version, and time-based auto-scaling:

```ts
const advancedOpsWorksInstance = await AWS.OpsWorks.Instance("advancedOpsWorksInstance", {
  InstanceType: "t2.small",
  LayerIds: ["myLayerId"],
  StackId: "myStackId",
  AmiId: "ami-12345678",
  AgentVersion: "LATEST",
  TimeBasedAutoScaling: {
    Schedule: [{
      Time: "12:00",
      Unit: "Hour",
      Days: ["Monday", "Wednesday"]
    }]
  }
});
```

## Network Configuration

Set up an OpsWorks instance with a specific subnet and Elastic IPs:

```ts
const networkConfiguredInstance = await AWS.OpsWorks.Instance("networkConfiguredInstance", {
  InstanceType: "t2.large",
  LayerIds: ["myLayerId"],
  StackId: "myStackId",
  SubnetId: "subnet-12345678",
  ElasticIps: ["192.0.2.1"]
});
```

## Auto Scaling Configuration

Demonstrate how to create an instance with auto-scaling settings and additional volume configuration:

```ts
const autoScalingInstance = await AWS.OpsWorks.Instance("autoScalingInstance", {
  InstanceType: "t2.medium",
  LayerIds: ["myLayerId"],
  StackId: "myStackId",
  AutoScalingType: "time-based",
  BlockDeviceMappings: [{
    DeviceName: "/dev/xvda",
    Ebs: {
      VolumeSize: 30,
      VolumeType: "gp2",
      DeleteOnTermination: true
    }
  }]
});
```

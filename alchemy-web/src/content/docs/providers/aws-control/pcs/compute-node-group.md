---
title: ComputeNodeGroup
description: Learn how to create, update, and manage AWS PCS ComputeNodeGroups using Alchemy Cloud Control.
---


The ComputeNodeGroup resource allows you to manage [AWS PCS ComputeNodeGroups](https://docs.aws.amazon.com/pcs/latest/userguide/) for your computing needs, enabling you to configure clusters of compute nodes effectively.

## Minimal Example

Create a basic ComputeNodeGroup with the required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const computeNodeGroup = await AWS.PCS.ComputeNodeGroup("basicComputeNodeGroup", {
  ClusterId: "pcs-cluster-abc123",
  ScalingConfiguration: {
    DesiredSize: 2,
    MinSize: 1,
    MaxSize: 5
  },
  InstanceConfigs: [
    {
      InstanceType: "c5.large",
      ImageId: "ami-0abcd1234efgh5678"
    }
  ],
  SubnetIds: ["10.0.1.0/24", "10.0.2.0/24"],
  IamInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile"
});
```

## Advanced Configuration

Configure a ComputeNodeGroup with additional settings such as spot options and custom launch template.

```ts
const advancedComputeNodeGroup = await AWS.PCS.ComputeNodeGroup("advancedComputeNodeGroup", {
  ClusterId: "pcs-cluster-xyz789",
  SpotOptions: {
    AllocationStrategy: "lowest-price",
    MaxPrice: "0.05"
  },
  ScalingConfiguration: {
    DesiredSize: 3,
    MinSize: 2,
    MaxSize: 6
  },
  InstanceConfigs: [
    {
      InstanceType: "c5.2xlarge",
      ImageId: "ami-0abcd1234efgh5678"
    }
  ],
  CustomLaunchTemplate: {
    LaunchTemplateId: "lt-0abcdef1234567890",
    Version: "$Latest"
  },
  SubnetIds: ["10.0.3.0/24", "10.0.4.0/24"],
  IamInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile"
});
```

## Tagging and Resource Management

Create a ComputeNodeGroup with tags for better resource management and identification.

```ts
const taggedComputeNodeGroup = await AWS.PCS.ComputeNodeGroup("taggedComputeNodeGroup", {
  ClusterId: "pcs-cluster-tagged123",
  ScalingConfiguration: {
    DesiredSize: 4,
    MinSize: 2,
    MaxSize: 8
  },
  InstanceConfigs: [
    {
      InstanceType: "m5.large",
      ImageId: "ami-0abcd1234efgh5678"
    }
  ],
  SubnetIds: ["10.0.5.0/24", "10.0.6.0/24"],
  IamInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile",
  Tags: {
    Environment: "Production",
    Team: "DataScience"
  }
});
```

## Adoption of Existing Resources

Adopt an existing ComputeNodeGroup resource instead of failing if it already exists.

```ts
const existingComputeNodeGroup = await AWS.PCS.ComputeNodeGroup("existingComputeNodeGroup", {
  ClusterId: "pcs-cluster-exists123",
  ScalingConfiguration: {
    DesiredSize: 2,
    MinSize: 1,
    MaxSize: 4
  },
  InstanceConfigs: [
    {
      InstanceType: "t3.medium",
      ImageId: "ami-0abcd1234efgh5678"
    }
  ],
  SubnetIds: ["10.0.7.0/24"],
  IamInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile",
  adopt: true
});
```

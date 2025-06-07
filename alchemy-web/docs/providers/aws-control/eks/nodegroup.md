---
title: Managing AWS EKS Nodegroups with Alchemy
description: Learn how to create, update, and manage AWS EKS Nodegroups using Alchemy Cloud Control.
---

# Nodegroup

The Nodegroup resource allows you to manage [AWS EKS Nodegroups](https://docs.aws.amazon.com/eks/latest/userguide/) and their configuration settings for running containerized applications in Kubernetes.

## Minimal Example

Create a basic EKS Nodegroup with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicNodegroup = await AWS.EKS.Nodegroup("BasicNodegroup", {
  ClusterName: "MyEKSCluster",
  NodeRole: "arn:aws:iam::123456789012:role/EKSNodeRole",
  Subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  ScalingConfig: {
    MinSize: 1,
    MaxSize: 3,
    DesiredSize: 2
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an EKS Nodegroup with advanced settings such as custom AMI type and Node Repair Configuration.

```ts
const advancedNodegroup = await AWS.EKS.Nodegroup("AdvancedNodegroup", {
  ClusterName: "MyEKSCluster",
  NodeRole: "arn:aws:iam::123456789012:role/EKSNodeRole",
  Subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  AmiType: "AL2_x86_64",
  NodeRepairConfig: {
    // Specify how to handle node repair
    // Note: Ensure to configure properties that exist in NodeRepairConfig
  },
  Taints: [
    { Key: "dedicated", Value: "spot", Effect: "NO_SCHEDULE" }
  ]
});
```

## Custom Launch Template

Create a Nodegroup using a custom launch template to define instance types and additional configurations.

```ts
const customLaunchTemplateNodegroup = await AWS.EKS.Nodegroup("CustomLaunchTemplateNodegroup", {
  ClusterName: "MyEKSCluster",
  NodeRole: "arn:aws:iam::123456789012:role/EKSNodeRole",
  Subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  LaunchTemplate: {
    Id: "lt-0123456789abcdef0",
    Version: "$Latest"
  },
  InstanceTypes: ["t3.medium", "t3.large"]
});
```

## Remote Access Configuration

Set up a Nodegroup with remote access configuration for SSH connectivity.

```ts
const remoteAccessNodegroup = await AWS.EKS.Nodegroup("RemoteAccessNodegroup", {
  ClusterName: "MyEKSCluster",
  NodeRole: "arn:aws:iam::123456789012:role/EKSNodeRole",
  Subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  RemoteAccess: {
    Ec2SshKey: "my-ssh-key",
    SourceSecurityGroups: ["sg-0abcdef1234567890"]
  }
});
```
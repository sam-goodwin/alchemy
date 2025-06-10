---
title: Nodegroup
description: Learn how to create, update, and manage AWS EKS Nodegroups using Alchemy Cloud Control.
---


The Nodegroup resource lets you manage [AWS EKS Nodegroups](https://docs.aws.amazon.com/eks/latest/userguide/) for your Kubernetes cluster, enabling you to configure the EC2 instances that run your containerized applications.

## Minimal Example

Create a basic Nodegroup with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicNodegroup = await AWS.EKS.Nodegroup("basicNodegroup", {
  clusterName: "myEKSCluster",
  nodeRole: "arn:aws:iam::123456789012:role/myEKSNodeRole",
  subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  scalingConfig: {
    desiredSize: 2,
    minSize: 1,
    maxSize: 3
  },
  labels: {
    environment: "production"
  }
});
```

## Advanced Configuration

Configure a Nodegroup with advanced settings like launch templates, remote access, and disk size.

```ts
const advancedNodegroup = await AWS.EKS.Nodegroup("advancedNodegroup", {
  clusterName: "myEKSCluster",
  nodeRole: "arn:aws:iam::123456789012:role/myEKSNodeRole",
  subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  launchTemplate: {
    id: "lt-12345678",
    version: "$Latest"
  },
  remoteAccess: {
    ec2SshKey: "my-key-pair",
    sourceSecurityGroups: ["sg-12345678"]
  },
  diskSize: 20,
  scalingConfig: {
    desiredSize: 3,
    minSize: 2,
    maxSize: 5
  }
});
```

## Custom Node Role and Labels

This example demonstrates creating a Nodegroup with a specific IAM role and custom labels for better organization.

```ts
const customNodegroup = await AWS.EKS.Nodegroup("customNodegroup", {
  clusterName: "myEKSCluster",
  nodeRole: "arn:aws:iam::123456789012:role/customNodeRole",
  subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  labels: {
    app: "myApp",
    tier: "frontend"
  },
  instanceTypes: ["t3.medium", "t3.large"],
  scalingConfig: {
    desiredSize: 2,
    minSize: 1,
    maxSize: 4
  }
});
```

## Nodegroup with Taints

Configure a Nodegroup that uses taints to control pod scheduling on specific nodes.

```ts
const taintedNodegroup = await AWS.EKS.Nodegroup("taintedNodegroup", {
  clusterName: "myEKSCluster",
  nodeRole: "arn:aws:iam::123456789012:role/myEKSNodeRole",
  subnets: ["10.0.0.0/24", "10.0.1.0/24"],
  taints: [
    {
      key: "dedicated",
      value: "gpu",
      effect: "NO_SCHEDULE"
    }
  ],
  scalingConfig: {
    desiredSize: 3,
    minSize: 2,
    maxSize: 6
  }
});
```

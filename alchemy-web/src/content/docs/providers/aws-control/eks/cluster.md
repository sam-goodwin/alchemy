---
title: Cluster
description: Learn how to create, update, and manage AWS EKS Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS EKS Clusters](https://docs.aws.amazon.com/eks/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic EKS cluster with required properties and a couple of optional configurations.

```ts
import AWS from "alchemy/aws/control";

const eksCluster = await AWS.EKS.Cluster("myEKSCluster", {
  roleArn: "arn:aws:iam::123456789012:role/eks-cluster-role",
  resourcesVpcConfig: {
    subnetIds: ["subnet-abc123", "subnet-def456"],
    securityGroupIds: ["sg-12345678"],
    endpointPublicAccess: true,
    endpointPrivateAccess: false
  },
  version: "1.21",
  name: "my-cluster",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an EKS cluster with additional settings for logging, encryption, and self-managed addons.

```ts
const advancedEKSCluster = await AWS.EKS.Cluster("advancedEKSCluster", {
  roleArn: "arn:aws:iam::123456789012:role/eks-cluster-role",
  resourcesVpcConfig: {
    subnetIds: ["subnet-abc123", "subnet-def456"],
    securityGroupIds: ["sg-12345678"],
    endpointPublicAccess: true,
    endpointPrivateAccess: false
  },
  logging: {
    clusterLogging: [
      { enabled: true, types: ["api", "audit", "authenticator", "controllerManager", "scheduler"] }
    ]
  },
  encryptionConfig: [
    {
      provider: {
        keyArn: "arn:aws:kms:us-west-2:123456789012:key/my-kms-key"
      },
      resources: ["secrets"]
    }
  ],
  bootstrapSelfManagedAddons: true,
  name: "my-advanced-cluster"
});
```

## Self-Managed Addons Configuration

Set up an EKS cluster with specific self-managed addons.

```ts
const selfManagedEKSCluster = await AWS.EKS.Cluster("selfManagedEKSCluster", {
  roleArn: "arn:aws:iam::123456789012:role/eks-cluster-role",
  resourcesVpcConfig: {
    subnetIds: ["subnet-abc123", "subnet-def456"],
    securityGroupIds: ["sg-12345678"],
    endpointPublicAccess: true,
    endpointPrivateAccess: false
  },
  bootstrapSelfManagedAddons: true,
  name: "my-self-managed-cluster",
  tags: [
    { key: "Environment", value: "Development" }
  ]
});
```

## Cluster Upgrade Policy

Create an EKS cluster with a specified upgrade policy for managing version updates.

```ts
const upgradePolicyEKSCluster = await AWS.EKS.Cluster("upgradePolicyEKSCluster", {
  roleArn: "arn:aws:iam::123456789012:role/eks-cluster-role",
  resourcesVpcConfig: {
    subnetIds: ["subnet-abc123", "subnet-def456"],
    securityGroupIds: ["sg-12345678"],
    endpointPublicAccess: true,
    endpointPrivateAccess: false
  },
  upgradePolicy: {
    maxUnavailable: 1
  },
  name: "my-upgrade-policy-cluster"
});
```

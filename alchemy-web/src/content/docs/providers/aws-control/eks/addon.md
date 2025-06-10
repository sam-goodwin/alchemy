---
title: Addon
description: Learn how to create, update, and manage AWS EKS Addons using Alchemy Cloud Control.
---


The Addon resource allows you to manage [AWS EKS Addons](https://docs.aws.amazon.com/eks/latest/userguide/) for enhancing the capabilities of your Kubernetes clusters.

## Minimal Example

Create a basic EKS Addon with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const eksAddon = await AWS.EKS.Addon("basic-eks-addon", {
  clusterName: "my-cluster",
  addonName: "vpc-cni",
  addonVersion: "1.9.0",
  serviceAccountRoleArn: "arn:aws:iam::123456789012:role/eks-addon-role"
});
```

## Advanced Configuration

Configure an EKS Addon with additional settings, including tags and preserve on delete functionality.

```ts
const advancedEksAddon = await AWS.EKS.Addon("advanced-eks-addon", {
  clusterName: "my-cluster",
  addonName: "kube-proxy",
  addonVersion: "1.23.0",
  preserveOnDelete: true,
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Pod Identity Associations

Demonstrate how to configure pod identity associations for an EKS Addon.

```ts
const podIdentityAddon = await AWS.EKS.Addon("pod-identity-addon", {
  clusterName: "my-cluster",
  addonName: "aws-node-termination-handler",
  podIdentityAssociations: [
    {
      namespace: "default",
      serviceAccountName: "my-service-account"
    }
  ]
});
```

## Resolving Conflicts

Show how to handle conflicts when an EKS Addon already exists.

```ts
const conflictHandlingAddon = await AWS.EKS.Addon("conflict-handling-addon", {
  clusterName: "my-cluster",
  addonName: "cluster-autoscaler",
  resolveConflicts: "overwrite",
  serviceAccountRoleArn: "arn:aws:iam::123456789012:role/cluster-autoscaler-role"
});
```

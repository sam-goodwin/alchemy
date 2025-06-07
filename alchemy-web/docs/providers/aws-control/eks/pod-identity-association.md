---
title: Managing AWS EKS PodIdentityAssociations with Alchemy
description: Learn how to create, update, and manage AWS EKS PodIdentityAssociations using Alchemy Cloud Control.
---

# PodIdentityAssociation

The PodIdentityAssociation resource allows you to manage the association between an Amazon EKS service account and an IAM role, enabling your pods to access AWS resources using the IAM role. For more information, visit the [AWS EKS PodIdentityAssociations documentation](https://docs.aws.amazon.com/eks/latest/userguide/).

## Minimal Example

Create a basic PodIdentityAssociation with required properties for a service account, cluster name, and role ARN.

```ts
import AWS from "alchemy/aws/control";

const BasicPodIdentityAssociation = await AWS.EKS.PodIdentityAssociation("BasicPodIdentityAssociation", {
  ServiceAccount: "my-service-account",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/my-iam-role",
  Namespace: "default"
});
```

## Advanced Configuration

Configure a PodIdentityAssociation with additional tags for better resource management and tracking.

```ts
const TaggedPodIdentityAssociation = await AWS.EKS.PodIdentityAssociation("TaggedPodIdentityAssociation", {
  ServiceAccount: "my-service-account",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/my-iam-role",
  Namespace: "default",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adopt Existing Resource

Adopt an existing PodIdentityAssociation instead of creating a new one if it already exists.

```ts
const AdoptedPodIdentityAssociation = await AWS.EKS.PodIdentityAssociation("AdoptedPodIdentityAssociation", {
  ServiceAccount: "my-service-account",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/my-iam-role",
  Namespace: "default",
  adopt: true
});
```
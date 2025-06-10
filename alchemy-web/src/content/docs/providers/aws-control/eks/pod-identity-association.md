---
title: PodIdentityAssociation
description: Learn how to create, update, and manage AWS EKS PodIdentityAssociations using Alchemy Cloud Control.
---


The PodIdentityAssociation resource allows you to associate an IAM role with a Kubernetes service account in an Amazon EKS cluster, enabling pods that use the service account to assume the specified IAM role. For more information, refer to the AWS documentation: [AWS EKS PodIdentityAssociations](https://docs.aws.amazon.com/eks/latest/userguide/).

## Minimal Example

Create a basic PodIdentityAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const podIdentityAssociation = await AWS.EKS.PodIdentityAssociation("myPodIdentityAssociation", {
  ServiceAccount: "my-service-account",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/myEKSRole",
  Namespace: "default"
});
```

## Advanced Configuration

Add tags to your PodIdentityAssociation for better resource management.

```ts
const taggedPodIdentityAssociation = await AWS.EKS.PodIdentityAssociation("taggedPodIdentityAssociation", {
  ServiceAccount: "my-service-account",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/myEKSRole",
  Namespace: "default",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Error Handling and Adoption

Create a PodIdentityAssociation and adopt an existing resource if it already exists.

```ts
const adoptPodIdentityAssociation = await AWS.EKS.PodIdentityAssociation("adoptedPodIdentityAssociation", {
  ServiceAccount: "my-service-account",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/myEKSRole",
  Namespace: "default",
  adopt: true // Adopt existing resource if it exists
});
```

## Specific Use Case: Multiple Associations

Manage multiple PodIdentityAssociations for different service accounts in the same cluster.

```ts
const firstPodIdentityAssociation = await AWS.EKS.PodIdentityAssociation("firstPodIdentityAssociation", {
  ServiceAccount: "service-account-one",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/roleOne",
  Namespace: "default"
});

const secondPodIdentityAssociation = await AWS.EKS.PodIdentityAssociation("secondPodIdentityAssociation", {
  ServiceAccount: "service-account-two",
  ClusterName: "my-eks-cluster",
  RoleArn: "arn:aws:iam::123456789012:role/roleTwo",
  Namespace: "default"
});
```

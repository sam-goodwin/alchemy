---
title: AccessEntry
description: Learn how to create, update, and manage AWS EKS AccessEntrys using Alchemy Cloud Control.
---


The AccessEntry resource lets you manage access permissions for Amazon EKS clusters, enabling secure access for users and groups. For more details, refer to the AWS documentation on [AWS EKS AccessEntrys](https://docs.aws.amazon.com/eks/latest/userguide/).

## Minimal Example

Create a basic AccessEntry with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicAccessEntry = await AWS.EKS.AccessEntry("basicAccessEntry", {
  PrincipalArn: "arn:aws:iam::123456789012:user/Alice",
  ClusterName: "my-eks-cluster",
  Username: "Alice"
});
```

## Advanced Configuration

Configure an AccessEntry with additional options, including Kubernetes groups and access policies:

```ts
const advancedAccessEntry = await AWS.EKS.AccessEntry("advancedAccessEntry", {
  PrincipalArn: "arn:aws:iam::123456789012:role/EKSAccessRole",
  ClusterName: "my-eks-cluster",
  Username: "Bob",
  KubernetesGroups: ["system:masters", "developers"],
  AccessPolicies: [{
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "eks:DescribeCluster",
      Resource: "*"
    }]
  }],
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Example with Multiple Access Policies

Demonstrate how to set up an AccessEntry with multiple access policies for granular permissions:

```ts
const multiPolicyAccessEntry = await AWS.EKS.AccessEntry("multiPolicyAccessEntry", {
  PrincipalArn: "arn:aws:iam::123456789012:role/DevOpsRole",
  ClusterName: "my-eks-cluster",
  AccessPolicies: [{
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "eks:ListClusters",
      Resource: "*"
    }]
  }, {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "eks:DescribeCluster",
      Resource: "arn:aws:eks:us-west-2:123456789012:cluster/my-eks-cluster"
    }]
  }]
});
```

## Example with Tags

Create an AccessEntry that includes tags for better resource management and tracking:

```ts
const taggedAccessEntry = await AWS.EKS.AccessEntry("taggedAccessEntry", {
  PrincipalArn: "arn:aws:iam::123456789012:user/Charlie",
  ClusterName: "my-eks-cluster",
  Username: "Charlie",
  Tags: [{
    Key: "Project",
    Value: "KubernetesMigration"
  }, {
    Key: "Department",
    Value: "Engineering"
  }]
});
```

---
title: ClusterSecurityGroup
description: Learn how to create, update, and manage AWS Redshift ClusterSecurityGroups using Alchemy Cloud Control.
---


The ClusterSecurityGroup resource lets you manage AWS Redshift Cluster Security Groups, which control access to your Redshift clusters. For more information, refer to the [AWS Redshift ClusterSecurityGroups documentation](https://docs.aws.amazon.com/redshift/latest/userguide/).

## Minimal Example

Create a basic Cluster Security Group with a description and a tag:

```ts
import AWS from "alchemy/aws/control";

const minimalClusterSecurityGroup = await AWS.Redshift.ClusterSecurityGroup("myClusterSecurityGroup", {
  Description: "Security group for my Redshift cluster",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a Cluster Security Group with multiple ingress rules to allow access from specific IP ranges:

```ts
const advancedClusterSecurityGroup = await AWS.Redshift.ClusterSecurityGroup("advancedClusterSecurityGroup", {
  Description: "Advanced security group for my Redshift cluster with multiple ingress rules",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  IngressRules: [
    {
      CidrIp: "192.168.1.0/24",
      FromPort: 5439,
      ToPort: 5439,
      IpProtocol: "tcp"
    },
    {
      CidrIp: "203.0.113.0/24",
      FromPort: 5439,
      ToPort: 5439,
      IpProtocol: "tcp"
    }
  ]
});
```

## Security Group with Adopt Option

Create a Cluster Security Group and adopt an existing resource if it already exists:

```ts
const adoptedClusterSecurityGroup = await AWS.Redshift.ClusterSecurityGroup("adoptedClusterSecurityGroup", {
  Description: "Cluster security group with adoption option",
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ],
  adopt: true
});
```

## Cluster Security Group without Tags

Create a Cluster Security Group without any tags for simplicity:

```ts
const simpleClusterSecurityGroup = await AWS.Redshift.ClusterSecurityGroup("simpleClusterSecurityGroup", {
  Description: "Simple security group for Redshift cluster"
});
```

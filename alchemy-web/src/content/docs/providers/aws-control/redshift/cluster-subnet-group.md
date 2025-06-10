---
title: ClusterSubnetGroup
description: Learn how to create, update, and manage AWS Redshift ClusterSubnetGroups using Alchemy Cloud Control.
---


The ClusterSubnetGroup resource lets you manage [AWS Redshift ClusterSubnetGroups](https://docs.aws.amazon.com/redshift/latest/userguide/) which define a collection of subnets for your Redshift cluster.

## Minimal Example

Create a basic ClusterSubnetGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const subnetGroup = await AWS.Redshift.ClusterSubnetGroup("mySubnetGroup", {
  Description: "My Redshift Cluster Subnet Group",
  SubnetIds: [
    "subnet-0a1b2c3d",
    "subnet-1a2b3c4d"
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a ClusterSubnetGroup with additional properties such as enabling resource adoption.

```ts
const advancedSubnetGroup = await AWS.Redshift.ClusterSubnetGroup("advancedSubnetGroup", {
  Description: "Advanced Configuration for Redshift",
  SubnetIds: [
    "subnet-0a1b2c3d",
    "subnet-1a2b3c4d",
    "subnet-2a3b4c5d"
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ],
  adopt: true
});
```

## Using with Multiple Subnets

Demonstrate creating a ClusterSubnetGroup that spans multiple availability zones.

```ts
const multiAzSubnetGroup = await AWS.Redshift.ClusterSubnetGroup("multiAzSubnetGroup", {
  Description: "Cluster Subnet Group across multiple AZs",
  SubnetIds: [
    "subnet-0a1b2c3d", // Availability Zone 1
    "subnet-1a2b3c4d", // Availability Zone 2
    "subnet-2a3b4c5d"  // Availability Zone 3
  ]
});
```

## Adopting Existing Resources

Show how to adopt an existing ClusterSubnetGroup rather than failing if it exists.

```ts
const existingSubnetGroup = await AWS.Redshift.ClusterSubnetGroup("existingSubnetGroup", {
  Description: "Adopt an existing subnet group",
  SubnetIds: [
    "subnet-0a1b2c3d",
    "subnet-1a2b3c4d"
  ],
  adopt: true
});
```

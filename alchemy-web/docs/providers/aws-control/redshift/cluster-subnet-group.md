---
title: Managing AWS Redshift ClusterSubnetGroups with Alchemy
description: Learn how to create, update, and manage AWS Redshift ClusterSubnetGroups using Alchemy Cloud Control.
---

# ClusterSubnetGroup

The ClusterSubnetGroup resource lets you manage [AWS Redshift ClusterSubnetGroups](https://docs.aws.amazon.com/redshift/latest/userguide/) which are used to define a collection of subnets that can be used by Redshift clusters.

## Minimal Example

Create a basic Redshift ClusterSubnetGroup with a description and a list of subnet IDs.

```ts
import AWS from "alchemy/aws/control";

const BasicClusterSubnetGroup = await AWS.Redshift.ClusterSubnetGroup("BasicSubnetGroup", {
  Description: "Subnet group for my Redshift cluster",
  SubnetIds: [
    "subnet-0abcd1234efgh5678", 
    "subnet-1abcd1234efgh5678"
  ],
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Advanced Configuration

Configure a ClusterSubnetGroup with additional tags for better resource management.

```ts
const AdvancedClusterSubnetGroup = await AWS.Redshift.ClusterSubnetGroup("AdvancedSubnetGroup", {
  Description: "Advanced subnet group for Redshift cluster with extra tags",
  SubnetIds: [
    "subnet-2abcd1234efgh5678", 
    "subnet-3abcd1234efgh5678"
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Using Existing Resources

Adopt an existing ClusterSubnetGroup instead of failing if it already exists.

```ts
const AdoptedClusterSubnetGroup = await AWS.Redshift.ClusterSubnetGroup("AdoptedSubnetGroup", {
  Description: "Adopt existing subnet group",
  SubnetIds: [
    "subnet-4abcd1234efgh5678", 
    "subnet-5abcd1234efgh5678"
  ],
  adopt: true
});
```

## Descriptive Tags for Resource Management

Create a ClusterSubnetGroup with detailed tags to help in tracking resource usage.

```ts
const TaggedClusterSubnetGroup = await AWS.Redshift.ClusterSubnetGroup("TaggedSubnetGroup", {
  Description: "Subnet group with detailed tags",
  SubnetIds: [
    "subnet-6abcd1234efgh5678", 
    "subnet-7abcd1234efgh5678"
  ],
  Tags: [
    { Key: "CostCenter", Value: "1234" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Project", Value: "DataMigration" }
  ]
});
```
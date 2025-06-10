---
title: Cluster
description: Learn how to create, update, and manage AWS DAX Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS DAX Clusters](https://docs.aws.amazon.com/dax/latest/userguide/) for caching DynamoDB queries to improve performance and reduce response times.

## Minimal Example

Create a basic DAX cluster with required properties and a couple of optional settings like description and parameter group name.

```ts
import AWS from "alchemy/aws/control";

const daxCluster = await AWS.DAX.Cluster("myDaxCluster", {
  ReplicationFactor: 3,
  IAMRoleARN: "arn:aws:iam::123456789012:role/DAXRole",
  Description: "My DAX Cluster for caching DynamoDB queries",
  ParameterGroupName: "default.dax1.0"
});
```

## Advanced Configuration

Configure a DAX cluster with advanced options including availability zones, security groups, and a maintenance window.

```ts
const advancedDaxCluster = await AWS.DAX.Cluster("advancedDaxCluster", {
  ReplicationFactor: 3,
  IAMRoleARN: "arn:aws:iam::123456789012:role/DAXRole",
  AvailabilityZones: ["us-west-2a", "us-west-2b"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00",
  ClusterName: "AdvancedDAXCluster"
});
```

## Enhanced Security Settings

Configure a DAX cluster with server-side encryption enabled for enhanced security.

```ts
const secureDaxCluster = await AWS.DAX.Cluster("secureDaxCluster", {
  ReplicationFactor: 3,
  IAMRoleARN: "arn:aws:iam::123456789012:role/DAXRole",
  SSESpecification: {
    SSEEnabled: true
  },
  Description: "Secure DAX Cluster with encryption"
});
```

## Specific Use Case: Custom Tags

Create a DAX cluster with custom tags for better resource management.

```ts
const taggedDaxCluster = await AWS.DAX.Cluster("taggedDaxCluster", {
  ReplicationFactor: 3,
  IAMRoleARN: "arn:aws:iam::123456789012:role/DAXRole",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "E-commerce"
    }
  ]
});
```

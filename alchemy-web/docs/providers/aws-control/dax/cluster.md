---
title: Managing AWS DAX Clusters with Alchemy
description: Learn how to create, update, and manage AWS DAX Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you manage [AWS DAX Clusters](https://docs.aws.amazon.com/dax/latest/userguide/) for fast in-memory caching for DynamoDB. It allows you to configure various properties such as node type, replication factor, and security settings.

## Minimal Example

Create a basic DAX cluster with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const MyDaxCluster = await AWS.DAX.Cluster("MyDaxCluster", {
  ReplicationFactor: 3,
  IAMRoleARN: "arn:aws:iam::123456789012:role/DAXAccessRole",
  NodeType: "dax.r4.large",
  Description: "My DAX cluster for caching DynamoDB data",
  SubnetGroupName: "MyDaxSubnetGroup",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure a DAX cluster with advanced settings for maintenance and encryption.

```ts
const AdvancedDaxCluster = await AWS.DAX.Cluster("AdvancedDaxCluster", {
  ReplicationFactor: 3,
  IAMRoleARN: "arn:aws:iam::123456789012:role/DAXAccessRole",
  NodeType: "dax.r4.large",
  PreferredMaintenanceWindow: "sun:23:00-sun:23:30",
  SSESpecification: {
    SSEEnabled: true
  },
  ClusterEndpointEncryptionType: "SERVER_SIDE_ENCRYPTION",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Custom Notification Settings

Set up a DAX cluster with custom notification settings for monitoring.

```ts
const NotificationDaxCluster = await AWS.DAX.Cluster("NotificationDaxCluster", {
  ReplicationFactor: 2,
  IAMRoleARN: "arn:aws:iam::123456789012:role/DAXAccessRole",
  NodeType: "dax.r4.large",
  NotificationTopicARN: "arn:aws:sns:us-west-2:123456789012:MyDaxNotifications",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "QA" }
  ]
});
```
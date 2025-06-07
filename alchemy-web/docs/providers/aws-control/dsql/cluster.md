---
title: Managing AWS DSQL Clusters with Alchemy
description: Learn how to create, update, and manage AWS DSQL Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource allows you to manage [AWS DSQL Clusters](https://docs.aws.amazon.com/dsql/latest/userguide/) for deploying, updating, and maintaining distributed SQL databases on AWS.

## Minimal Example

Create a basic DSQL Cluster with essential properties and enable deletion protection.

```ts
import AWS from "alchemy/aws/control";

const BasicCluster = await AWS.DSQL.Cluster("basic-cluster", {
  DeletionProtectionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a DSQL Cluster with additional settings, including custom tags and enhanced features.

```ts
const AdvancedCluster = await AWS.DSQL.Cluster("advanced-cluster", {
  DeletionProtectionEnabled: false,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "DataWarehouse" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Monitoring and Maintenance

Set up monitoring and maintenance configurations for a DSQL Cluster.

```ts
const MonitoringCluster = await AWS.DSQL.Cluster("monitoring-cluster", {
  DeletionProtectionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataOps" }
  ],
  adopt: true // Use this to adopt an existing cluster
});
```

## Custom Tags and Metadata

Add custom tags and metadata for better resource management.

```ts
const CustomTagCluster = await AWS.DSQL.Cluster("custom-tag-cluster", {
  DeletionProtectionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Owner", Value: "John Doe" },
    { Key: "Application", Value: "AnalyticsApp" }
  ]
});
```
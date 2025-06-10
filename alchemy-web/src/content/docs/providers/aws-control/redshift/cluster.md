---
title: Cluster
description: Learn how to create, update, and manage AWS Redshift Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS Redshift Clusters](https://docs.aws.amazon.com/redshift/latest/userguide/) which are designed for data warehousing and analytics. You can create and configure clusters with various properties including node type, number of nodes, and security settings.

## Minimal Example

Create a basic AWS Redshift Cluster with required properties and a few common optional ones.

```ts
import AWS from "alchemy/aws/control";

const redshiftCluster = await AWS.Redshift.Cluster("myRedshiftCluster", {
  nodeType: "dc2.large",
  clusterType: "single-node",
  dbName: "analyticsdb",
  masterUsername: "admin",
  masterUserPassword: "SecurePass123!",
  port: 5439,
  tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a Redshift Cluster with additional settings for enhanced security and maintenance.

```ts
const advancedRedshiftCluster = await AWS.Redshift.Cluster("advancedRedshiftCluster", {
  nodeType: "dc2.8xlarge",
  clusterType: "multi-node",
  dbName: "productiondb",
  masterUsername: "admin",
  masterUserPassword: "SecurePass123!",
  port: 5439,
  multiAZ: true,
  encrypted: true,
  automatedSnapshotRetentionPeriod: 7,
  preferredMaintenanceWindow: "sun:06:00-sun:06:30",
  iamRoles: ["arn:aws:iam::123456789012:role/MyRedshiftRole"],
  clusterParameterGroupName: "default.redshift-1.0",
  vpcSecurityGroupIds: ["sg-0123456789abcdef0"]
});
```

## Using Snapshot Copy

Create a cluster that uses snapshot copy for disaster recovery.

```ts
const snapshotCopyCluster = await AWS.Redshift.Cluster("snapshotCopyCluster", {
  nodeType: "dc2.large",
  clusterType: "single-node",
  dbName: "backupdb",
  masterUsername: "admin",
  masterUserPassword: "SecurePass123!",
  port: 5439,
  snapshotCopyRetentionPeriod: 30,
  snapshotCopyManual: true,
  destinationRegion: "us-west-2"
});
```

## Defer Maintenance

Configure a Redshift Cluster with deferred maintenance settings.

```ts
const maintenanceCluster = await AWS.Redshift.Cluster("maintenanceCluster", {
  nodeType: "dc2.large",
  clusterType: "single-node",
  dbName: "maintenanceDB",
  masterUsername: "admin",
  masterUserPassword: "SecurePass123!",
  port: 5439,
  deferMaintenance: true,
  deferMaintenanceStartTime: "2023-11-01T00:00:00Z",
  deferMaintenanceDuration: 30 // Duration in minutes
});
```

---
title: Managing AWS RDS DBProxyTargetGroups with Alchemy
description: Learn how to create, update, and manage AWS RDS DBProxyTargetGroups using Alchemy Cloud Control.
---

# DBProxyTargetGroup

The DBProxyTargetGroup resource lets you manage [AWS RDS DBProxy Target Groups](https://docs.aws.amazon.com/rds/latest/userguide/) for use with your database proxy. This resource allows you to define the target group for your DBProxy, which can include multiple DB instances or clusters.

## Minimal Example

Create a basic DBProxyTargetGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const targetGroup = await AWS.RDS.DBProxyTargetGroup("MyDBProxyTargetGroup", {
  DBProxyName: "MyDBProxy",
  TargetGroupName: "MyTargetGroup",
  DBInstanceIdentifiers: ["instance-1", "instance-2"]
});
```

## Advanced Configuration

Configure a DBProxyTargetGroup with connection pool settings to optimize database connections.

```ts
const advancedTargetGroup = await AWS.RDS.DBProxyTargetGroup("AdvancedDBProxyTargetGroup", {
  DBProxyName: "MyAdvancedDBProxy",
  TargetGroupName: "AdvancedTargetGroup",
  DBInstanceIdentifiers: ["instance-1"],
  ConnectionPoolConfigurationInfo: {
    MaxConnectionsPercent: 100,
    MaxIdleConnectionsPercent: 50,
    ConnectionBorrowTimeout: 120,
    SessionPinningFilters: ["EXCLUDE_VARIABLE_SETS"]
  }
});
```

## Using DBClusterIdentifiers

You can also define a target group using DB cluster identifiers instead of DB instance identifiers.

```ts
const clusterTargetGroup = await AWS.RDS.DBProxyTargetGroup("ClusterDBProxyTargetGroup", {
  DBProxyName: "MyClusterDBProxy",
  TargetGroupName: "ClusterTargetGroup",
  DBClusterIdentifiers: ["cluster-1"],
  ConnectionPoolConfigurationInfo: {
    MaxConnectionsPercent: 70,
    MaxIdleConnectionsPercent: 30
  }
});
```

## Adopting Existing Resources

If you want to adopt an existing target group instead of creating a new one, you can set the `adopt` property to true.

```ts
const adoptTargetGroup = await AWS.RDS.DBProxyTargetGroup("AdoptDBProxyTargetGroup", {
  DBProxyName: "MyDBProxy",
  TargetGroupName: "ExistingTargetGroup",
  adopt: true
});
```
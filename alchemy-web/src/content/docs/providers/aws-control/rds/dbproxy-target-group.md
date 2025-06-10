---
title: DBProxyTargetGroup
description: Learn how to create, update, and manage AWS RDS DBProxyTargetGroups using Alchemy Cloud Control.
---


The DBProxyTargetGroup resource allows you to manage an Amazon RDS DB Proxy target group, which is a collection of RDS database instances that the proxy can connect to. For further details, refer to the official AWS documentation: [AWS RDS DBProxyTargetGroups](https://docs.aws.amazon.com/rds/latest/userguide/).

## Minimal Example

Create a basic DB Proxy target group with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const dbProxyTargetGroup = await AWS.RDS.DBProxyTargetGroup("myDbProxyTargetGroup", {
  DBProxyName: "myDbProxy",
  TargetGroupName: "myTargetGroup",
  DBInstanceIdentifiers: ["db-instance-1", "db-instance-2"]
});
```

## Advanced Configuration

Configure a DB Proxy target group with connection pool settings for better performance.

```ts
import AWS from "alchemy/aws/control";

const connectionPoolTargetGroup = await AWS.RDS.DBProxyTargetGroup("poolTargetGroup", {
  DBProxyName: "myDbProxy",
  TargetGroupName: "myPoolTargetGroup",
  DBInstanceIdentifiers: ["db-instance-1", "db-instance-2"],
  ConnectionPoolConfigurationInfo: {
    MaxConnectionsPercent: 50,
    MaxIdleConnectionsPercent: 50,
    ConnectionBorrowTimeout: 120,
    InitQuery: "SELECT 1"
  }
});
```

## Using with DB Clusters

Create a DB Proxy target group that targets a specific RDS DB cluster.

```ts
import AWS from "alchemy/aws/control";

const dbClusterTargetGroup = await AWS.RDS.DBProxyTargetGroup("clusterTargetGroup", {
  DBProxyName: "myDbProxy",
  TargetGroupName: "myClusterTargetGroup",
  DBClusterIdentifiers: ["my-db-cluster"],
  DBInstanceIdentifiers: ["db-instance-1"]
});
```

## Adopt Existing Resource

Adopt an existing DB Proxy target group if it already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptExistingTargetGroup = await AWS.RDS.DBProxyTargetGroup("existingTargetGroup", {
  DBProxyName: "myDbProxy",
  TargetGroupName: "myExistingTargetGroup",
  adopt: true
});
```

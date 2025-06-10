---
title: Cluster
description: Learn how to create, update, and manage AWS DSQL Clusters using Alchemy Cloud Control.
---


The Cluster resource allows you to manage [AWS DSQL Clusters](https://docs.aws.amazon.com/dsql/latest/userguide/) for your applications, providing features like high availability, scalability, and enhanced performance.

## Minimal Example

Create a basic DSQL Cluster with deletion protection enabled.

```ts
import AWS from "alchemy/aws/control";

const dsqlCluster = await AWS.DSQL.Cluster("myDsqlCluster", {
  DeletionProtectionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Advanced Configuration

Configure a DSQL Cluster with specific tags and enable deletion protection.

```ts
const advancedDsqlCluster = await AWS.DSQL.Cluster("advancedDsqlCluster", {
  DeletionProtectionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Monitoring and Maintenance

Create a DSQL Cluster and configure it for monitoring and maintenance.

```ts
const monitoringDsqlCluster = await AWS.DSQL.Cluster("monitoringDsqlCluster", {
  DeletionProtectionEnabled: false,
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Owner", Value: "QA Team" }
  ],
  adopt: false // Do not adopt existing resources
});
```

## Integration with Other AWS Services

Create a DSQL Cluster that integrates with other AWS services.

```ts
const integratedDsqlCluster = await AWS.DSQL.Cluster("integratedDsqlCluster", {
  DeletionProtectionEnabled: true,
  Tags: [
    { Key: "Service", Value: "DataProcessing" },
    { Key: "Owner", Value: "DataTeam" }
  ],
  adopt: true // Adopt existing resource if necessary
});
```

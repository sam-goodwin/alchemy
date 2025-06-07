---
title: Managing AWS Redshift ClusterParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS Redshift ClusterParameterGroups using Alchemy Cloud Control.
---

# ClusterParameterGroup

The ClusterParameterGroup resource lets you create and manage [AWS Redshift ClusterParameterGroups](https://docs.aws.amazon.com/redshift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const clusterparametergroup = await AWS.Redshift.ClusterParameterGroup(
  "clusterparametergroup-example",
  {
    Description: "A clusterparametergroup resource managed by Alchemy",
    ParameterGroupFamily: "example-parametergroupfamily",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a clusterparametergroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedClusterParameterGroup = await AWS.Redshift.ClusterParameterGroup(
  "advanced-clusterparametergroup",
  {
    Description: "A clusterparametergroup resource managed by Alchemy",
    ParameterGroupFamily: "example-parametergroupfamily",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


---
title: ClusterParameterGroup
description: Learn how to create, update, and manage AWS Redshift ClusterParameterGroups using Alchemy Cloud Control.
---


The ClusterParameterGroup resource allows you to manage [AWS Redshift ClusterParameterGroups](https://docs.aws.amazon.com/redshift/latest/userguide/) which are used to manage database-level parameters and settings for your Amazon Redshift clusters.

## Minimal Example

Create a basic ClusterParameterGroup with required properties and some common optional parameters.

```ts
import AWS from "alchemy/aws/control";

const basicClusterParameterGroup = await AWS.Redshift.ClusterParameterGroup("basicClusterParamGroup", {
  Description: "Basic parameter group for Redshift clusters",
  ParameterGroupFamily: "redshift-1.0",
  ParameterGroupName: "basic-parameter-group",
  Parameters: [{
    ParameterName: "enable_user_activity_logging",
    ParameterValue: "true"
  }]
});
```

## Advanced Configuration

Configure a ClusterParameterGroup with more advanced settings, including multiple parameters.

```ts
const advancedClusterParameterGroup = await AWS.Redshift.ClusterParameterGroup("advancedClusterParamGroup", {
  Description: "Advanced parameter group for Redshift clusters",
  ParameterGroupFamily: "redshift-1.0",
  ParameterGroupName: "advanced-parameter-group",
  Parameters: [
    {
      ParameterName: "query_group",
      ParameterValue: "analytics"
    },
    {
      ParameterName: "max_connections",
      ParameterValue: "500"
    },
    {
      ParameterName: "enable_user_activity_logging",
      ParameterValue: "true"
    }
  ]
});
```

## Tagging for Resource Management

Create a ClusterParameterGroup with tags for better resource management and organization.

```ts
const taggedClusterParameterGroup = await AWS.Redshift.ClusterParameterGroup("taggedClusterParamGroup", {
  Description: "Parameter group with tags for resource management",
  ParameterGroupFamily: "redshift-1.0",
  ParameterGroupName: "tagged-parameter-group",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Data Science"
    }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing parameter group instead of failing when it already exists, you can set the `adopt` property.

```ts
const adoptedClusterParameterGroup = await AWS.Redshift.ClusterParameterGroup("adoptedClusterParamGroup", {
  Description: "Adopting an existing parameter group if it exists",
  ParameterGroupFamily: "redshift-1.0",
  ParameterGroupName: "existing-parameter-group",
  adopt: true
});
```

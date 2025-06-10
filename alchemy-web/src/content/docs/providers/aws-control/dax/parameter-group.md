---
title: ParameterGroup
description: Learn how to create, update, and manage AWS DAX ParameterGroups using Alchemy Cloud Control.
---


The ParameterGroup resource allows you to manage [AWS DAX ParameterGroups](https://docs.aws.amazon.com/dax/latest/userguide/) which define settings for your Amazon DynamoDB Accelerator (DAX) clusters.

## Minimal Example

Create a basic DAX ParameterGroup with a name and a description:

```ts
import AWS from "alchemy/aws/control";

const basicParameterGroup = await AWS.DAX.ParameterGroup("basic-parameter-group", {
  ParameterGroupName: "default",
  Description: "Default parameter group for DAX",
  ParameterNameValues: {
    "iam_role": "arn:aws:iam::123456789012:role/DAXRole"
  }
});
```

## Advanced Configuration

Configure a DAX ParameterGroup with specific parameters and values for better performance tuning:

```ts
const advancedParameterGroup = await AWS.DAX.ParameterGroup("advanced-parameter-group", {
  ParameterGroupName: "custom-parameters",
  Description: "Custom parameter group for performance optimization",
  ParameterNameValues: {
    "query_timeout": "300",
    "max_connections": "100",
    "max_memory": "2048MB"
  }
});
```

## Adoption of Existing Parameter Group

Use the adoption feature to create a parameter group that takes over an existing resource:

```ts
const adoptExistingParameterGroup = await AWS.DAX.ParameterGroup("adopt-existing-parameter-group", {
  ParameterGroupName: "existing-parameter-group",
  Description: "Adopting an existing parameter group",
  adopt: true
});
```

## Updating Parameter Values

Demonstrate how to update specific parameter values in an existing DAX ParameterGroup:

```ts
const updateParameterGroup = await AWS.DAX.ParameterGroup("update-parameter-group", {
  ParameterGroupName: "custom-parameters",
  Description: "Updating parameters for DAX",
  ParameterNameValues: {
    "max_connections": "200"
  }
});
```

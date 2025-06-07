---
title: Managing AWS DAX ParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS DAX ParameterGroups using Alchemy Cloud Control.
---

# ParameterGroup

The ParameterGroup resource allows you to manage [AWS DAX ParameterGroups](https://docs.aws.amazon.com/dax/latest/userguide/) for Amazon DynamoDB Accelerator (DAX). Parameter groups let you manage configuration settings for your DAX cluster.

## Minimal Example

Create a basic DAX ParameterGroup with a name and a couple of parameter values.

```ts
import AWS from "alchemy/aws/control";

const basicParameterGroup = await AWS.DAX.ParameterGroup("BasicParameterGroup", {
  ParameterGroupName: "my-dax-parameter-group",
  ParameterNameValues: [
    { ParameterName: "max-size", ParameterValue: "1000" },
    { ParameterName: "write-io-operations", ParameterValue: "10000" }
  ]
});
```

## Advanced Configuration

Configure a DAX ParameterGroup with additional settings like a description and multiple parameter values for optimization.

```ts
const advancedParameterGroup = await AWS.DAX.ParameterGroup("AdvancedParameterGroup", {
  ParameterGroupName: "optimized-dax-parameter-group",
  Description: "An optimized DAX parameter group for high performance",
  ParameterNameValues: [
    { ParameterName: "max-size", ParameterValue: "2000" },
    { ParameterName: "write-io-operations", ParameterValue: "20000" },
    { ParameterName: "read-io-operations", ParameterValue: "15000" }
  ]
});
```

## Adoption of Existing Resource

Configure a DAX ParameterGroup to adopt an existing resource instead of failing if it already exists.

```ts
const adoptedParameterGroup = await AWS.DAX.ParameterGroup("AdoptedParameterGroup", {
  ParameterGroupName: "existing-dax-parameter-group",
  ParameterNameValues: [
    { ParameterName: "max-size", ParameterValue: "3000" }
  ],
  adopt: true
});
```

## Multiple Parameter Adjustments

Demonstrate how to create a DAX ParameterGroup with multiple parameters for different performance metrics.

```ts
const performanceParameterGroup = await AWS.DAX.ParameterGroup("PerformanceParameterGroup", {
  ParameterGroupName: "performance-optimized-dax-group",
  Description: "Parameter group for performance optimization",
  ParameterNameValues: [
    { ParameterName: "max-size", ParameterValue: "5000" },
    { ParameterName: "write-io-operations", ParameterValue: "50000" },
    { ParameterName: "read-io-operations", ParameterValue: "30000" },
    { ParameterName: "ttl", ParameterValue: "3600" }
  ]
});
```
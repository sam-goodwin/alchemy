---
title: Managing AWS Timestream InfluxDBInstances with Alchemy
description: Learn how to create, update, and manage AWS Timestream InfluxDBInstances using Alchemy Cloud Control.
---

# InfluxDBInstance

The InfluxDBInstance resource lets you create and manage [AWS Timestream InfluxDBInstances](https://docs.aws.amazon.com/timestream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-timestream-influxdbinstance.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const influxdbinstance = await AWS.Timestream.InfluxDBInstance("influxdbinstance-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a influxdbinstance with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInfluxDBInstance = await AWS.Timestream.InfluxDBInstance(
  "advanced-influxdbinstance",
  {
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


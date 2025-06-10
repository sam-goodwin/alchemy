---
title: InfluxDBInstance
description: Learn how to create, update, and manage AWS Timestream InfluxDBInstances using Alchemy Cloud Control.
---


The InfluxDBInstance resource lets you manage [AWS Timestream InfluxDBInstances](https://docs.aws.amazon.com/timestream/latest/userguide/) for time-series data storage and analysis.

## Minimal Example

Create a basic InfluxDBInstance with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleInfluxDBInstance = await AWS.Timestream.InfluxDBInstance("myInfluxDBInstance", {
  Name: "MyTimeSeriesDB",
  DbInstanceType: "standard",
  Port: 8086,
  VpcSubnetIds: ["10.0.1.0/24"],
  VpcSecurityGroupIds: ["sg-12345678"]
});
```

## Advanced Configuration

Configure an InfluxDBInstance with enhanced settings including a parameter group and logging configuration.

```ts
const advancedInfluxDBInstance = await AWS.Timestream.InfluxDBInstance("advancedInfluxDBInstance", {
  Name: "AdvancedTimeSeriesDB",
  DbInstanceType: "high-memory",
  AllocatedStorage: 100,
  DeploymentType: "multi-availability-zone",
  LogDeliveryConfiguration: {
    CloudWatchLogsExportConfiguration: {
      EnableLogTypes: ["query", "connection"]
    }
  },
  DbParameterGroupIdentifier: "myParameterGroup",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataAnalytics" }
  ]
});
```

## Configuring Network Access

Set up an InfluxDBInstance with specific network configurations for secure access.

```ts
const networkConfiguredInfluxDBInstance = await AWS.Timestream.InfluxDBInstance("networkConfiguredInfluxDBInstance", {
  Name: "NetworkConfiguredDB",
  Port: 8086,
  VpcSubnetIds: ["10.0.2.0/24"],
  VpcSecurityGroupIds: ["sg-87654321"],
  PubliclyAccessible: true,
  NetworkType: "ipv4"
});
```

## Using Tags for Management

Create an InfluxDBInstance with tags for better resource management and identification.

```ts
const taggedInfluxDBInstance = await AWS.Timestream.InfluxDBInstance("taggedInfluxDBInstance", {
  Name: "TaggedTimeSeriesDB",
  DbInstanceType: "standard",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "CostCenter", Value: "123" }
  ]
});
```

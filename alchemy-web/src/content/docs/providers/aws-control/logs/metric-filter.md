---
title: MetricFilter
description: Learn how to create, update, and manage AWS Logs MetricFilters using Alchemy Cloud Control.
---


The MetricFilter resource lets you create and manage [AWS Logs MetricFilters](https://docs.aws.amazon.com/logs/latest/userguide/) for monitoring and analyzing log data. Metric filters allow you to extract metric data from logs for use in CloudWatch.

## Minimal Example

Create a simple metric filter that counts the number of error messages in a log group.

```ts
import AWS from "alchemy/aws/control";

const errorMetricFilter = await AWS.Logs.MetricFilter("ErrorMetricFilter", {
  MetricTransformations: [{
    MetricValue: "1",
    MetricNamespace: "MyApp",
    MetricName: "ErrorCount"
  }],
  FilterPattern: "{ $.level = \"ERROR\" }",
  LogGroupName: "MyAppLogGroup",
  ApplyOnTransformedLogs: true,
  FilterName: "ErrorFilter"
});
```

## Advanced Configuration

This example shows how to configure a metric filter with multiple transformations and a custom filter name.

```ts
const detailedMetricFilter = await AWS.Logs.MetricFilter("DetailedMetricFilter", {
  MetricTransformations: [{
    MetricValue: "1",
    MetricNamespace: "MyApp",
    MetricName: "ErrorCount"
  }, {
    MetricValue: "1",
    MetricNamespace: "MyApp",
    MetricName: "WarningCount"
  }],
  FilterPattern: "{ $.level = \"ERROR\" || $.level = \"WARNING\" }",
  LogGroupName: "MyAppLogGroup",
  FilterName: "DetailedFilter"
});
```

## Using Existing Log Groups

This example demonstrates how to create a metric filter for an existing log group without failing if it already exists.

```ts
const existingLogGroupMetricFilter = await AWS.Logs.MetricFilter("ExistingLogGroupMetricFilter", {
  MetricTransformations: [{
    MetricValue: "1",
    MetricNamespace: "MyApp",
    MetricName: "CriticalErrors"
  }],
  FilterPattern: "{ $.level = \"CRITICAL\" }",
  LogGroupName: "ExistingLogGroup",
  adopt: true // This will adopt the existing resource if it already exists
});
```

## Applying on Transformed Logs

In this example, we create a metric filter that applies to transformed logs, allowing you to get metrics from processed data.

```ts
const transformedLogsMetricFilter = await AWS.Logs.MetricFilter("TransformedLogsMetricFilter", {
  MetricTransformations: [{
    MetricValue: "1",
    MetricNamespace: "MyApp",
    MetricName: "TransformedLogCount"
  }],
  FilterPattern: "{ $.statusCode = 200 }",
  LogGroupName: "TransformedLogsGroup",
  ApplyOnTransformedLogs: true
});
```

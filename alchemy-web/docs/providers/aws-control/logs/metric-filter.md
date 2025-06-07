---
title: Managing AWS Logs MetricFilters with Alchemy
description: Learn how to create, update, and manage AWS Logs MetricFilters using Alchemy Cloud Control.
---

# MetricFilter

The MetricFilter resource allows you to define filters for AWS CloudWatch Logs, enabling you to create metrics based on specific patterns in your log data. For more information, refer to the [AWS Logs MetricFilters documentation](https://docs.aws.amazon.com/logs/latest/userguide/).

## Minimal Example

Create a basic MetricFilter with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMetricFilter = await AWS.Logs.MetricFilter("BasicMetricFilter", {
  MetricTransformations: [{
    MetricName: "ErrorCount",
    MetricNamespace: "MyApp",
    MetricValue: "1",
    DefaultValue: 0
  }],
  FilterPattern: "{ $.level = \"ERROR\" }",
  LogGroupName: "MyAppLogGroup",
  FilterName: "ErrorFilter"
});
```

## Advanced Configuration

Configure a MetricFilter with multiple metric transformations for a more complex setup.

```ts
const advancedMetricFilter = await AWS.Logs.MetricFilter("AdvancedMetricFilter", {
  MetricTransformations: [
    {
      MetricName: "ErrorCount",
      MetricNamespace: "MyApp",
      MetricValue: "1"
    },
    {
      MetricName: "WarningCount",
      MetricNamespace: "MyApp",
      MetricValue: "1"
    }
  ],
  FilterPattern: "{ $.level = \"ERROR\" || $.level = \"WARNING\" }",
  LogGroupName: "MyAppLogGroup",
  FilterName: "ErrorAndWarningFilter"
});
```

## Using Transformed Logs

Create a MetricFilter that applies on transformed logs to track specific events.

```ts
const transformedLogMetricFilter = await AWS.Logs.MetricFilter("TransformedLogMetricFilter", {
  MetricTransformations: [{
    MetricName: "UserLoginCount",
    MetricNamespace: "MyApp",
    MetricValue: "1"
  }],
  FilterPattern: "{ $.eventType = \"UserLogin\" }",
  LogGroupName: "TransformedLogGroup",
  ApplyOnTransformedLogs: true,
  FilterName: "UserLoginFilter"
});
```
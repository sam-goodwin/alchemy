---
title: Managing AWS MediaLive CloudWatchAlarmTemplates with Alchemy
description: Learn how to create, update, and manage AWS MediaLive CloudWatchAlarmTemplates using Alchemy Cloud Control.
---

# CloudWatchAlarmTemplate

The CloudWatchAlarmTemplate resource allows you to create and manage CloudWatch alarm templates within AWS MediaLive. This resource is essential for setting up monitoring and alerting based on specific metrics related to your MediaLive channels. For more information, refer to the [AWS MediaLive CloudWatchAlarmTemplates documentation](https://docs.aws.amazon.com/medialive/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic CloudWatch alarm template with required properties and common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicAlarmTemplate = await AWS.MediaLive.CloudWatchAlarmTemplate("BasicAlarmTemplate", {
  TargetResourceType: "INPUT",
  ComparisonOperator: "GreaterThanThreshold",
  TreatMissingData: "notBreaching",
  Period: 60,
  EvaluationPeriods: 1,
  Name: "HighInputLatencyAlarm",
  MetricName: "InputLatency",
  Statistic: "Average",
  Threshold: 100,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

This example shows how to configure a more complex CloudWatch alarm template with additional options for grouping and data point thresholds.

```ts
const AdvancedAlarmTemplate = await AWS.MediaLive.CloudWatchAlarmTemplate("AdvancedAlarmTemplate", {
  TargetResourceType: "CHANNEL",
  ComparisonOperator: "LessThanThreshold",
  TreatMissingData: "breaching",
  Period: 300,
  EvaluationPeriods: 2,
  DatapointsToAlarm: 1,
  Name: "LowOutputBitrateAlarm",
  MetricName: "OutputBitrate",
  Statistic: "Sum",
  Threshold: 500000,
  GroupIdentifier: "OutputGroupA",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Streaming" }
  ]
});
```

## Custom Group Identifier

In this example, we create a CloudWatch alarm template specifically for monitoring output latency with a custom group identifier.

```ts
const LatencyAlarmTemplate = await AWS.MediaLive.CloudWatchAlarmTemplate("LatencyAlarmTemplate", {
  TargetResourceType: "CHANNEL",
  ComparisonOperator: "GreaterThanThreshold",
  TreatMissingData: "notBreaching",
  Period: 60,
  EvaluationPeriods: 3,
  Name: "OutputLatencyAlarm",
  MetricName: "OutputLatency",
  Statistic: "Average",
  Threshold: 200,
  GroupIdentifier: "LatencyGroup",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "LiveOps" }
  ]
});
```
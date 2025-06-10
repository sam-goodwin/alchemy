---
title: CloudWatchAlarmTemplate
description: Learn how to create, update, and manage AWS MediaLive CloudWatchAlarmTemplates using Alchemy Cloud Control.
---


The CloudWatchAlarmTemplate resource allows you to manage [AWS MediaLive CloudWatch Alarm Templates](https://docs.aws.amazon.com/medialive/latest/userguide/), which define the metrics and thresholds for CloudWatch alarms associated with your MediaLive resources.

## Minimal Example

Create a basic CloudWatch alarm template with required properties and a couple of common optional settings:

```ts
import AWS from "alchemy/aws/control";

const basicAlarmTemplate = await AWS.MediaLive.CloudWatchAlarmTemplate("basicAlarmTemplate", {
  TargetResourceType: "INPUT",
  ComparisonOperator: "GreaterThanThreshold",
  TreatMissingData: "notBreaching",
  Period: 60,
  EvaluationPeriods: 5,
  Name: "BasicInputAlarm",
  MetricName: "InputLoss",
  Statistic: "Average",
  Threshold: 1.0,
  Tags: {
    Environment: "Production",
    Project: "MediaLiveProject"
  }
});
```

## Advanced Configuration

Configure an advanced CloudWatch alarm template with additional properties such as description and datapoints to alarm:

```ts
const advancedAlarmTemplate = await AWS.MediaLive.CloudWatchAlarmTemplate("advancedAlarmTemplate", {
  TargetResourceType: "OUTPUT",
  ComparisonOperator: "LessThanThreshold",
  TreatMissingData: "breaching",
  Description: "Alarm for output latency",
  Period: 120,
  EvaluationPeriods: 3,
  DatapointsToAlarm: 2,
  Name: "OutputLatencyAlarm",
  MetricName: "OutputLatency",
  Statistic: "Maximum",
  Threshold: 2.0,
  GroupIdentifier: "OutputGroup1"
});
```

## Grouping Alarms

Create a CloudWatch alarm template that groups alarms based on a specific identifier:

```ts
const groupedAlarmTemplate = await AWS.MediaLive.CloudWatchAlarmTemplate("groupedAlarmTemplate", {
  TargetResourceType: "CHANNEL",
  ComparisonOperator: "GreaterThanThreshold",
  TreatMissingData: "notBreaching",
  Period: 300,
  EvaluationPeriods: 2,
  GroupIdentifier: "ChannelGroup1",
  Name: "ChannelHealthAlarm",
  MetricName: "ChannelHealth",
  Statistic: "Sum",
  Threshold: 5.0
});
```

## Using Tags for Resource Management

Create a CloudWatch alarm template with specific tags to manage resources effectively:

```ts
const taggedAlarmTemplate = await AWS.MediaLive.CloudWatchAlarmTemplate("taggedAlarmTemplate", {
  TargetResourceType: "INPUT",
  ComparisonOperator: "GreaterThanThreshold",
  TreatMissingData: "breaching",
  Period: 60,
  EvaluationPeriods: 1,
  Name: "TaggedInputAlarm",
  MetricName: "InputOverruns",
  Statistic: "Average",
  Threshold: 0.5,
  Tags: {
    Environment: "Staging",
    Owner: "DevTeam"
  }
});
``` 

These examples illustrate how to create and configure CloudWatch alarm templates that can help monitor and alert based on the health and performance of your MediaLive resources.

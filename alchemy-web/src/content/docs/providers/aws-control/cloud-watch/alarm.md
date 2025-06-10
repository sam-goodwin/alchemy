---
title: Alarm
description: Learn how to create, update, and manage AWS CloudWatch Alarms using Alchemy Cloud Control.
---


The Alarm resource lets you manage [AWS CloudWatch Alarms](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) for monitoring your AWS resources and applications. You can set alarms based on specific metrics, and take automated actions when those metrics reach a defined threshold.

## Minimal Example

Create a basic CloudWatch Alarm that triggers when the CPU utilization exceeds 80%.

```ts
import AWS from "alchemy/aws/control";

const cpuAlarm = await AWS.CloudWatch.Alarm("cpuAlarm", {
  ComparisonOperator: "GreaterThanThreshold",
  EvaluationPeriods: 1,
  MetricName: "CPUUtilization",
  Namespace: "AWS/EC2",
  Period: 300,
  Statistic: "Average",
  Threshold: 80,
  AlarmDescription: "Alarm when CPU exceeds 80%",
  AlarmActions: ["arn:aws:sns:us-east-1:123456789012:NotifyMe"],
  OKActions: ["arn:aws:sns:us-east-1:123456789012:NotifyMe"],
  Dimensions: [
    {
      Name: "InstanceId",
      Value: "i-0abcd1234efgh5678"
    }
  ]
});
```

## Advanced Configuration

Configure a CloudWatch Alarm with additional options, such as treating missing data and using extended statistics.

```ts
const advancedCpuAlarm = await AWS.CloudWatch.Alarm("advancedCpuAlarm", {
  ComparisonOperator: "GreaterThanThreshold",
  EvaluationPeriods: 2,
  MetricName: "CPUUtilization",
  Namespace: "AWS/EC2",
  Period: 300,
  Statistic: "Average",
  Threshold: 75,
  AlarmDescription: "Advanced Alarm when CPU exceeds 75% for 2 periods",
  AlarmActions: ["arn:aws:sns:us-east-1:123456789012:NotifyMe"],
  InsufficientDataActions: ["arn:aws:sns:us-east-1:123456789012:NotifyMe"],
  TreatMissingData: "breaching",
  ExtendedStatistic: "p90",
  Dimensions: [
    {
      Name: "InstanceId",
      Value: "i-0abcd1234efgh5678"
    }
  ]
});
```

## Custom Metric Alarm

Set an alarm based on a custom metric that tracks application-specific performance.

```ts
const customMetricAlarm = await AWS.CloudWatch.Alarm("customMetricAlarm", {
  ComparisonOperator: "GreaterThanThreshold",
  EvaluationPeriods: 3,
  MetricName: "CustomErrorCount",
  Namespace: "MyApplication",
  Period: 60,
  Statistic: "Sum",
  Threshold: 5,
  AlarmDescription: "Alarm for high error count in application",
  AlarmActions: ["arn:aws:sns:us-east-1:123456789012:NotifyMe"],
  Dimensions: [
    {
      Name: "ServiceName",
      Value: "MyService"
    }
  ]
});
```

## Multi-Metric Alarm

Create an alarm that monitors multiple metrics using metric math.

```ts
const multiMetricAlarm = await AWS.CloudWatch.Alarm("multiMetricAlarm", {
  ComparisonOperator: "GreaterThanThreshold",
  EvaluationPeriods: 1,
  Metrics: [
    {
      Id: "m1",
      Expression: "SUM(METRICS())",
      Label: "TotalRequests",
      ReturnData: true
    },
    {
      Id: "m2",
      MetricStat: {
        MetricName: "5XXError",
        Namespace: "AWS/ApiGateway",
        Period: 60,
        Stat: "Sum"
      },
      Label: "5XX Errors",
      ReturnData: true
    }
  ],
  Threshold: 10,
  AlarmDescription: "Alarm when total requests exceed errors threshold",
  AlarmActions: ["arn:aws:sns:us-east-1:123456789012:NotifyMe"]
});
```

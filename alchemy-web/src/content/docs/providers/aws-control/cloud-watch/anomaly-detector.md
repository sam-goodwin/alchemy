---
title: AnomalyDetector
description: Learn how to create, update, and manage AWS CloudWatch AnomalyDetectors using Alchemy Cloud Control.
---


The AnomalyDetector resource allows you to create and manage [AWS CloudWatch AnomalyDetectors](https://docs.aws.amazon.com/cloudwatch/latest/userguide/), which help in monitoring and detecting unusual patterns in your metrics.

## Minimal Example

Create a basic AnomalyDetector with essential properties, including metric name and statistic.

```ts
import AWS from "alchemy/aws/control";

const basicAnomalyDetector = await AWS.CloudWatch.AnomalyDetector("BasicAnomalyDetector", {
  MetricName: "CPUUtilization",
  Stat: "Average",
  Namespace: "AWS/EC2",
  Dimensions: [
    {
      Name: "InstanceId",
      Value: "i-0123456789abcdef0"
    }
  ]
});
```

## Advanced Configuration

Configure an AnomalyDetector with specific metric characteristics to fine-tune anomaly detection.

```ts
const advancedAnomalyDetector = await AWS.CloudWatch.AnomalyDetector("AdvancedAnomalyDetector", {
  MetricName: "RequestCount",
  Stat: "Sum",
  Namespace: "AWS/ApplicationELB",
  MetricCharacteristics: {
    // Define the characteristics of the metric for better anomaly detection
    StatisticalThreshold: {
      LowerThreshold: 10,
      UpperThreshold: 1000
    },
    // More characteristics can be added based on requirements
  },
  Dimensions: [
    {
      Name: "LoadBalancer",
      Value: "app/my-load-balancer/50dc6c4952c5a0c1"
    }
  ]
});
```

## Single Metric Anomaly Detection

Create a single metric anomaly detector that focuses on a specific metric.

```ts
const singleMetricAnomalyDetector = await AWS.CloudWatch.AnomalyDetector("SingleMetricAnomalyDetector", {
  SingleMetricAnomalyDetector: {
    MetricName: "Latency",
    Stat: "Average",
    Namespace: "AWS/ELB",
    Dimensions: [
      {
        Name: "LoadBalancer",
        Value: "app/my-load-balancer/50dc6c4952c5a0c1"
      }
    ]
  }
});
```

## Metric Math Anomaly Detection

Set up a metric math anomaly detector to aggregate multiple metrics.

```ts
const metricMathAnomalyDetector = await AWS.CloudWatch.AnomalyDetector("MetricMathAnomalyDetector", {
  MetricMathAnomalyDetector: {
    MetricMath: [
      "SUM(METRICS('RequestCount'))",
      "SUM(METRICS('Latency'))"
    ],
    Stat: "Average",
    Namespace: "AWS/ApplicationELB"
  }
});
```

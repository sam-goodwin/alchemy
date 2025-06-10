---
title: Monitor
description: Learn how to create, update, and manage AWS InternetMonitor Monitors using Alchemy Cloud Control.
---


The Monitor resource allows you to manage [AWS InternetMonitor Monitors](https://docs.aws.amazon.com/internetmonitor/latest/userguide/) for tracking the health and performance of your internet applications.

## Minimal Example

Create a basic InternetMonitor Monitor with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicMonitor = await AWS.InternetMonitor.Monitor("basicMonitor", {
  MonitorName: "MyBasicMonitor",
  Status: "ENABLED",
  TrafficPercentageToMonitor: 50,
  ResourcesToAdd: ["arn:aws:ec2:us-west-2:123456789012:instance/i-1234567890abcdef0"]
});
```

## Advanced Configuration

Configure a monitor with advanced settings including health events and linked accounts.

```ts
const advancedMonitor = await AWS.InternetMonitor.Monitor("advancedMonitor", {
  MonitorName: "MyAdvancedMonitor",
  Status: "ENABLED",
  TrafficPercentageToMonitor: 75,
  IncludeLinkedAccounts: true,
  HealthEventsConfig: {
    HealthEventTypes: ["LATENCY", "AVAILABILITY"],
    Thresholds: {
      Latency: {
        Threshold: 200,
        ComparisonOperator: "GREATER_THAN"
      },
      Availability: {
        Threshold: 99,
        ComparisonOperator: "LESS_THAN"
      }
    }
  },
  ResourcesToAdd: ["arn:aws:ec2:us-west-2:123456789012:instance/i-abcdef1234567890"]
});
```

## Custom Log Delivery

Set up a monitor with custom internet measurements log delivery settings.

```ts
const logDeliveryMonitor = await AWS.InternetMonitor.Monitor("logDeliveryMonitor", {
  MonitorName: "MyLogDeliveryMonitor",
  Status: "ENABLED",
  InternetMeasurementsLogDelivery: {
    S3Bucket: {
      BucketArn: "arn:aws:s3:::my-log-bucket",
      Prefix: "internet-monitor-logs/"
    },
    LogFormat: "JSON"
  },
  ResourcesToAdd: ["arn:aws:ec2:us-west-2:123456789012:instance/i-1234567890abcdef0"]
});
```

## Monitoring Multiple City Networks

Create a monitor that tracks multiple city networks for better insights.

```ts
const cityNetworkMonitor = await AWS.InternetMonitor.Monitor("cityNetworkMonitor", {
  MonitorName: "MyCityNetworkMonitor",
  Status: "ENABLED",
  MaxCityNetworksToMonitor: 5,
  ResourcesToAdd: [
    "arn:aws:ec2:us-west-2:123456789012:instance/i-1234567890abcdef0",
    "arn:aws:ec2:us-west-2:123456789012:instance/i-abcdef1234567890"
  ]
});
```

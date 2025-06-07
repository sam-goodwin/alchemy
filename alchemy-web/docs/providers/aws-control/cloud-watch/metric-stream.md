---
title: Managing AWS CloudWatch MetricStreams with Alchemy
description: Learn how to create, update, and manage AWS CloudWatch MetricStreams using Alchemy Cloud Control.
---

# MetricStream

The MetricStream resource lets you create and manage [AWS CloudWatch MetricStreams](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-metricstream.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const metricstream = await AWS.CloudWatch.MetricStream("metricstream-example", {
  FirehoseArn: "example-firehosearn",
  OutputFormat: "example-outputformat",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a metricstream with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMetricStream = await AWS.CloudWatch.MetricStream("advanced-metricstream", {
  FirehoseArn: "example-firehosearn",
  OutputFormat: "example-outputformat",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


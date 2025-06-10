---
title: MetricStream
description: Learn how to create, update, and manage AWS CloudWatch MetricStreams using Alchemy Cloud Control.
---


The MetricStream resource lets you create and manage [AWS CloudWatch MetricStreams](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) for streaming CloudWatch metrics to Amazon Kinesis Data Firehose.

## Minimal Example

Create a basic MetricStream with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMetricStream = await AWS.CloudWatch.MetricStream("basicMetricStream", {
  FirehoseArn: "arn:aws:firehose:us-east-1:123456789012:deliverystream/myFirehose",
  RoleArn: "arn:aws:iam::123456789012:role/myMetricStreamRole",
  OutputFormat: "json",
  IncludeLinkedAccountsMetrics: true
});
```

## Advanced Configuration

Configure a MetricStream with detailed statistics configurations and filters to control the metrics being streamed.

```ts
const advancedMetricStream = await AWS.CloudWatch.MetricStream("advancedMetricStream", {
  FirehoseArn: "arn:aws:firehose:us-east-1:123456789012:deliverystream/myAdvancedFirehose",
  RoleArn: "arn:aws:iam::123456789012:role/myAdvancedMetricStreamRole",
  OutputFormat: "json",
  StatisticsConfigurations: [
    {
      Statistics: ["Average", "Sum"],
      Dimensions: ["InstanceId"],
      MetricStat: {
        MetricName: "CPUUtilization",
        Namespace: "AWS/EC2",
        Period: 300,
        Unit: "Percent"
      }
    }
  ],
  IncludeFilters: [
    {
      Namespace: "AWS/EC2",
      MetricName: "CPUUtilization"
    }
  ],
  ExcludeFilters: [
    {
      Namespace: "AWS/S3",
      MetricName: "BucketSizeBytes"
    }
  ]
});
```

## Using Tags

Create a MetricStream and apply tags for better resource management.

```ts
const taggedMetricStream = await AWS.CloudWatch.MetricStream("taggedMetricStream", {
  FirehoseArn: "arn:aws:firehose:us-east-1:123456789012:deliverystream/myTaggedFirehose",
  RoleArn: "arn:aws:iam::123456789012:role/myTaggedMetricStreamRole",
  OutputFormat: "json",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MetricStreamProject"
    }
  ]
});
```

## Adopting Existing Resources

Set the `adopt` property to true to adopt an existing MetricStream.

```ts
const adoptExistingMetricStream = await AWS.CloudWatch.MetricStream("adoptExistingMetricStream", {
  FirehoseArn: "arn:aws:firehose:us-east-1:123456789012:deliverystream/myExistingFirehose",
  RoleArn: "arn:aws:iam::123456789012:role/myAdoptExistingMetricStreamRole",
  OutputFormat: "json",
  adopt: true
});
```

---
title: Managing AWS EC2 FlowLogs with Alchemy
description: Learn how to create, update, and manage AWS EC2 FlowLogs using Alchemy Cloud Control.
---

# FlowLog

The FlowLog resource lets you manage [AWS EC2 FlowLogs](https://docs.aws.amazon.com/ec2/latest/userguide/) for capturing information about the IP traffic going to and from network interfaces in your VPC.

## Minimal Example

Create a basic FlowLog to monitor traffic for a specific VPC.

```ts
import AWS from "alchemy/aws/control";

const MyVpcFlowLog = await AWS.EC2.FlowLog("MyVpcFlowLog", {
  ResourceId: "vpc-12345678",
  ResourceType: "VPC",
  LogDestination: "s3",
  LogDestinationType: "S3",
  LogGroupName: "MyVpcFlowLogGroup",
  TrafficType: "ALL",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a FlowLog with a custom log format and cross-account role for log delivery.

```ts
const AdvancedVpcFlowLog = await AWS.EC2.FlowLog("AdvancedVpcFlowLog", {
  ResourceId: "vpc-87654321",
  ResourceType: "VPC",
  LogDestination: "cloud-watch-logs",
  LogDestinationType: "CloudWatchLogs",
  LogGroupName: "AdvancedVpcFlowLogGroup",
  LogFormat: "${version} ${account-id} ${interface-id} ${srcaddr} ${dstaddr} ${srcport} ${dstport} ${protocol} ${packets} ${bytes} ${start} ${end}",
  DeliverCrossAccountRole: "arn:aws:iam::123456789012:role/FlowLogDeliveryRole",
  TrafficType: "ACCEPT",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Using Custom Aggregation Interval

Create a FlowLog with a specified maximum aggregation interval to control log delivery frequency.

```ts
const CustomAggregationFlowLog = await AWS.EC2.FlowLog("CustomAggregationFlowLog", {
  ResourceId: "eni-1234567890abcdef0",
  ResourceType: "NetworkInterface",
  LogDestination: "s3",
  LogDestinationType: "S3",
  MaxAggregationInterval: 60, // In seconds
  TrafficType: "ALL",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```
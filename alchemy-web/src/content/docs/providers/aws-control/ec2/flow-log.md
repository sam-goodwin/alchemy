---
title: FlowLog
description: Learn how to create, update, and manage AWS EC2 FlowLogs using Alchemy Cloud Control.
---


The FlowLog resource allows you to manage [AWS EC2 FlowLogs](https://docs.aws.amazon.com/ec2/latest/userguide/) which capture information about the IP traffic going to and from network interfaces in your VPC.

## Minimal Example

Create a basic FlowLog to capture all traffic from a specified VPC with default settings.

```ts
import AWS from "alchemy/aws/control";

const vpcFlowLog = await AWS.EC2.FlowLog("vpcFlowLog", {
  ResourceId: "vpc-12345678",
  ResourceType: "VPC",
  TrafficType: "ALL",
  LogDestination: "cloud-watch-logs",
  LogGroupName: "vpc-flow-logs",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a FlowLog with advanced options, including a custom log format and aggregation interval settings.

```ts
const advancedFlowLog = await AWS.EC2.FlowLog("advancedFlowLog", {
  ResourceId: "vpc-87654321",
  ResourceType: "VPC",
  TrafficType: "ACCEPT",
  LogDestination: "s3",
  LogDestinationType: "S3",
  LogGroupName: "advanced-vpc-flow-logs",
  LogFormat: "${version} ${timestamp} ${srcaddr} ${dstaddr} ${srcport} ${dstport} ${protocol} ${packets} ${bytes}",
  MaxAggregationInterval: 60,
  DeliverCrossAccountRole: "arn:aws:iam::123456789012:role/FlowLogsRole",
  Tags: [
    {
      Key: "Project",
      Value: "NetworkMonitoring"
    }
  ]
});
```

## Capture Specific Traffic Types

Set up a FlowLog to capture only accepted and rejected traffic for a specific network interface.

```ts
const interfaceFlowLog = await AWS.EC2.FlowLog("interfaceFlowLog", {
  ResourceId: "eni-12345678",
  ResourceType: "NetworkInterface",
  TrafficType: "REJECT",
  LogDestination: "cloud-watch-logs",
  LogGroupName: "interface-flow-logs",
  Tags: [
    {
      Key: "Type",
      Value: "Monitoring"
    }
  ]
});
```

## Cross-Account Flow Logs

Establish a FlowLog that delivers logs to a different account's S3 bucket.

```ts
const crossAccountFlowLog = await AWS.EC2.FlowLog("crossAccountFlowLog", {
  ResourceId: "vpc-11223344",
  ResourceType: "VPC",
  TrafficType: "ALL",
  LogDestination: "s3",
  LogDestinationType: "S3",
  LogGroupName: "cross-account-vpc-flow-logs",
  DeliverCrossAccountRole: "arn:aws:iam::123456789012:role/CrossAccountFlowLogsRole",
  Tags: [
    {
      Key: "Compliance",
      Value: "Audit"
    }
  ]
});
```

---
title: Managing AWS IoTWireless Destinations with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless Destinations using Alchemy Cloud Control.
---

# Destination

The Destination resource lets you manage [AWS IoTWireless Destinations](https://docs.aws.amazon.com/iotwireless/latest/userguide/) which are used to route messages from devices to other AWS services.

## Minimal Example

Create a basic IoTWireless Destination with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const BasicDestination = await AWS.IoTWireless.Destination("BasicDestination", {
  Name: "BasicDestination",
  Expression: "SELECT * FROM 'device/messages'",
  ExpressionType: "RuleQueryString",
  Description: "A basic IoT Wireless Destination for routing messages"
});
```

## Advanced Configuration

Configure an IoTWireless Destination with additional options such as IAM Role and tags:

```ts
const AdvancedDestination = await AWS.IoTWireless.Destination("AdvancedDestination", {
  Name: "AdvancedDestination",
  Expression: "SELECT * FROM 'device/messages'",
  ExpressionType: "RuleQueryString",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTRole",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "IoT" }
  ],
  Description: "An advanced IoT Wireless Destination with role and tags"
});
```

## Using with an AWS Lambda Function

Demonstrate how to create a Destination that routes messages to an AWS Lambda function:

```ts
const LambdaDestination = await AWS.IoTWireless.Destination("LambdaDestination", {
  Name: "LambdaDestination",
  Expression: "SELECT * FROM 'device/messages'",
  ExpressionType: "RuleQueryString",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTRole",
  Description: "Destination for routing messages to a Lambda function",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Service", Value: "DataProcessing" }
  ]
});
```

## Integrating with Amazon S3

Create a Destination to send messages directly to an Amazon S3 bucket:

```ts
const S3Destination = await AWS.IoTWireless.Destination("S3Destination", {
  Name: "S3Destination",
  Expression: "SELECT * FROM 'device/messages'",
  ExpressionType: "RuleQueryString",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTRole",
  Description: "Destination for routing IoT messages to an S3 bucket",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Service", Value: "Storage" }
  ]
});
```
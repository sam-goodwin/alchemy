---
title: Destination
description: Learn how to create, update, and manage AWS IoTWireless Destinations using Alchemy Cloud Control.
---


The Destination resource allows you to manage [AWS IoTWireless Destinations](https://docs.aws.amazon.com/iotwireless/latest/userguide/) for routing messages from your IoT devices to AWS services. 

## Minimal Example

Create a basic IoTWireless Destination with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleDestination = await AWS.IoTWireless.Destination("simpleDestination", {
  Name: "SimpleDestination",
  Expression: "SELECT * FROM 'iot/topic'",
  ExpressionType: "RuleQueryString",
  Description: "A simple destination for routing IoT messages",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTRole"
});
```

## Advanced Configuration

Configure a more complex IoTWireless Destination with multiple tags and necessary IAM role.

```ts
const advancedDestination = await AWS.IoTWireless.Destination("advancedDestination", {
  Name: "AdvancedDestination",
  Expression: "SELECT * FROM 'iot/topic'",
  ExpressionType: "RuleQueryString",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTRole",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "IoTMonitoring"
    }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing resource instead of failing when it already exists, set the `adopt` property to `true`.

```ts
const adoptDestination = await AWS.IoTWireless.Destination("adoptDestination", {
  Name: "ExistingDestination",
  Expression: "SELECT * FROM 'iot/topic'",
  ExpressionType: "RuleQueryString",
  adopt: true
});
```

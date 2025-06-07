---
title: Managing AWS EC2 TransitGatewayConnects with Alchemy
description: Learn how to create, update, and manage AWS EC2 TransitGatewayConnects using Alchemy Cloud Control.
---

# TransitGatewayConnect

The TransitGatewayConnect resource lets you create and manage [AWS EC2 TransitGatewayConnects](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayconnect.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewayconnect = await AWS.EC2.TransitGatewayConnect("transitgatewayconnect-example", {
  Options: "example-options",
  TransportTransitGatewayAttachmentId: "example-transporttransitgatewayattachmentid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a transitgatewayconnect with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTransitGatewayConnect = await AWS.EC2.TransitGatewayConnect(
  "advanced-transitgatewayconnect",
  {
    Options: "example-options",
    TransportTransitGatewayAttachmentId: "example-transporttransitgatewayattachmentid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


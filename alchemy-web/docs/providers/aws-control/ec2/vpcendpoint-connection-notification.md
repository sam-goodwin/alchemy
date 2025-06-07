---
title: Managing AWS EC2 VPCEndpointConnectionNotifications with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCEndpointConnectionNotifications using Alchemy Cloud Control.
---

# VPCEndpointConnectionNotification

The VPCEndpointConnectionNotification resource allows you to manage notifications for connection events related to Amazon EC2 VPC endpoints. This resource can help you receive updates about changes in the connection state of your VPC endpoints. For more details, refer to the [AWS EC2 VPCEndpointConnectionNotifications](https://docs.aws.amazon.com/ec2/latest/userguide/) documentation.

## Minimal Example

Create a basic VPCEndpointConnectionNotification with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const VpcEndpointConnectionNotification = await AWS.EC2.VPCEndpointConnectionNotification("MyVpcEndpointConnectionNotification", {
  ConnectionEvents: ["Accept", "Reject"],
  VPCEndpointId: "vpce-123abc456def789gh",
  ConnectionNotificationArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic"
});
```

## Advanced Configuration

Configure a VPCEndpointConnectionNotification with additional optional properties, including service ID.

```ts
const AdvancedVpcEndpointConnectionNotification = await AWS.EC2.VPCEndpointConnectionNotification("AdvancedVpcEndpointConnectionNotification", {
  ConnectionEvents: ["Accept", "Reject", "Disconnect"],
  VPCEndpointId: "vpce-123abc456def789gh",
  ConnectionNotificationArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic",
  ServiceId: "com.amazonaws.us-east-1.s3"
});
```

## Adoption of Existing Resource

If you want to adopt an existing VPCEndpointConnectionNotification without failing, set the adopt property to true.

```ts
const AdoptedVpcEndpointConnectionNotification = await AWS.EC2.VPCEndpointConnectionNotification("AdoptedVpcEndpointConnectionNotification", {
  ConnectionEvents: ["Accept"],
  VPCEndpointId: "vpce-123abc456def789gh",
  ConnectionNotificationArn: "arn:aws:sns:us-east-1:123456789012:MySNSTopic",
  adopt: true
});
```
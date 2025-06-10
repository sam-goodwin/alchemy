---
title: VPCEndpointConnectionNotification
description: Learn how to create, update, and manage AWS EC2 VPCEndpointConnectionNotifications using Alchemy Cloud Control.
---


The VPCEndpointConnectionNotification resource allows you to manage notifications for AWS EC2 VPC Endpoint connection events. This resource enables you to specify various connection events and the target for those notifications. For more information, refer to the [AWS EC2 VPCEndpointConnectionNotifications](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCEndpointConnectionNotification resource with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const vpcEndpointConnectionNotification = await AWS.EC2.VPCEndpointConnectionNotification("MyVPCEndpointNotification", {
  ConnectionEvents: ["Accept", "Reject"],
  ConnectionNotificationArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  VPCEndpointId: "vpce-0123456789abcdef0" // Optional: Specify the VPC Endpoint ID
});
```

## Advanced Configuration

Configure a VPCEndpointConnectionNotification with an optional ServiceId to filter notifications for a specific service.

```ts
const advancedVpcEndpointConnectionNotification = await AWS.EC2.VPCEndpointConnectionNotification("AdvancedVPCEndpointNotification", {
  ConnectionEvents: ["Accept", "Reject", "Disconnect"],
  ConnectionNotificationArn: "arn:aws:sns:us-east-1:123456789012:MyAdvancedTopic",
  VPCEndpointId: "vpce-0123456789abcdef0", // Optional: Specify the VPC Endpoint ID
  ServiceId: "com.amazonaws.us-east-1.s3" // Optional: Specify the service associated with the notifications
});
```

## Using Adoption

Create a VPCEndpointConnectionNotification that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedVpcEndpointConnectionNotification = await AWS.EC2.VPCEndpointConnectionNotification("AdoptedVPCEndpointNotification", {
  ConnectionEvents: ["Accept"],
  ConnectionNotificationArn: "arn:aws:sns:us-east-1:123456789012:MyAdoptedTopic",
  VPCEndpointId: "vpce-0123456789abcdef0", // Optional: Specify the VPC Endpoint ID
  adopt: true // Enable adoption of existing resource
});
``` 

## Specifying Multiple Connection Events

Demonstrate how to specify multiple connection events for notifications.

```ts
const multiEventVpcEndpointConnectionNotification = await AWS.EC2.VPCEndpointConnectionNotification("MultiEventVPCEndpointNotification", {
  ConnectionEvents: [
    "Accept",
    "Reject",
    "Create",
    "Delete"
  ],
  ConnectionNotificationArn: "arn:aws:sns:us-east-1:123456789012:MyMultiEventTopic",
  VPCEndpointId: "vpce-0123456789abcdef0" // Optional: Specify the VPC Endpoint ID
});
```

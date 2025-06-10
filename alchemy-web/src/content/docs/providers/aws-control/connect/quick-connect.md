---
title: QuickConnect
description: Learn how to create, update, and manage AWS Connect QuickConnects using Alchemy Cloud Control.
---


The QuickConnect resource lets you manage [AWS Connect QuickConnects](https://docs.aws.amazon.com/connect/latest/userguide/) which are used to set up quick connection capabilities for agents and customers.

## Minimal Example

Create a basic QuickConnect with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const quickConnect = await AWS.Connect.QuickConnect("basicQuickConnect", {
  Name: "SupportLine",
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abc12345-abc1-abc1-abc1-abc123456789",
  QuickConnectConfig: {
    QuickConnectType: "USER",
    UserConfig: {
      UserArn: "arn:aws:connect:us-west-2:123456789012:user/abc12345-abc1-abc1-abc1-abc123456789",
      ContactFlowId: "contact-flow-id-123"
    }
  },
  Description: "QuickConnect for customer support line"
});
```

## Advanced Configuration

Configure a QuickConnect with tags for better resource management and monitoring.

```ts
const advancedQuickConnect = await AWS.Connect.QuickConnect("advancedQuickConnect", {
  Name: "SalesLine",
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abc12345-abc1-abc1-abc1-abc123456789",
  QuickConnectConfig: {
    QuickConnectType: "USER",
    UserConfig: {
      UserArn: "arn:aws:connect:us-west-2:123456789012:user/def67890-def6-def6-def6-def678901234",
      ContactFlowId: "contact-flow-id-456"
    }
  },
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Priority", Value: "High" }
  ],
  Description: "QuickConnect for sales inquiries"
});
```

## Example with Different QuickConnect Types

This example demonstrates how to create a QuickConnect with a phone number configuration.

```ts
const phoneQuickConnect = await AWS.Connect.QuickConnect("phoneQuickConnect", {
  Name: "SupportHotline",
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abc12345-abc1-abc1-abc1-abc123456789",
  QuickConnectConfig: {
    QuickConnectType: "PHONE_NUMBER",
    PhoneConfig: {
      PhoneNumber: "+15555551234",
      ContactFlowId: "contact-flow-id-789"
    }
  },
  Description: "QuickConnect for customer support hotline"
});
```

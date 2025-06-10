---
title: EventBusPolicy
description: Learn how to create, update, and manage AWS Events EventBusPolicys using Alchemy Cloud Control.
---


The EventBusPolicy resource allows you to manage permissions for AWS EventBridge event buses, enabling you to control which principals can send events to your event bus. For more details on this resource, refer to the [AWS Events EventBusPolicys documentation](https://docs.aws.amazon.com/events/latest/userguide/).

## Minimal Example

Create a basic EventBusPolicy that allows a specific AWS account to send events to an event bus.

```ts
import AWS from "alchemy/aws/control";

const eventBusPolicy = await AWS.Events.EventBusPolicy("defaultPolicy", {
  EventBusName: "myCustomEventBus",
  StatementId: "AllowAccountSendEvents",
  Action: "events:PutEvents",
  Principal: "123456789012", // Replace with your AWS Account ID
  Statement: {
    Effect: "Allow",
    Principal: {
      AWS: "arn:aws:iam::123456789012:root"
    },
    Action: "events:PutEvents",
    Resource: "arn:aws:events:us-east-1:123456789012:event-bus/myCustomEventBus"
  }
});
```

## Advanced Configuration

Configure an EventBusPolicy that includes conditions for when the policy is applied, such as allowing only specific source IP addresses.

```ts
const advancedPolicy = await AWS.Events.EventBusPolicy("advancedPolicy", {
  EventBusName: "myCustomEventBus",
  StatementId: "AllowSpecificIpSendEvents",
  Action: "events:PutEvents",
  Principal: "123456789012",
  Condition: {
    StringEquals: {
      "aws:SourceIp": "203.0.113.0/24" // Replace with your valid CIDR block
    }
  },
  Statement: {
    Effect: "Allow",
    Principal: {
      AWS: "arn:aws:iam::123456789012:root"
    },
    Action: "events:PutEvents",
    Resource: "arn:aws:events:us-east-1:123456789012:event-bus/myCustomEventBus"
  }
});
```

## Using Wildcards

Create a policy that allows all accounts to send events from a specific service to the event bus.

```ts
const wildcardPolicy = await AWS.Events.EventBusPolicy("wildcardPolicy", {
  EventBusName: "myCustomEventBus",
  StatementId: "AllowAllAccountsSendEvents",
  Action: "events:PutEvents",
  Principal: "*", // Allow all accounts
  Statement: {
    Effect: "Allow",
    Principal: {
      AWS: "*"
    },
    Action: "events:PutEvents",
    Resource: "arn:aws:events:us-east-1:123456789012:event-bus/myCustomEventBus"
  }
});
```

## Restrict by Source ARN

Create a policy that restricts which resources can send events to your event bus based on the source ARN.

```ts
const sourceArnPolicy = await AWS.Events.EventBusPolicy("sourceArnPolicy", {
  EventBusName: "myCustomEventBus",
  StatementId: "AllowSpecificServiceSendEvents",
  Action: "events:PutEvents",
  Principal: "service.amazonaws.com", // Replace with the service you want to allow
  Condition: {
    ArnEquals: {
      "aws:SourceArn": "arn:aws:lambda:us-east-1:123456789012:function:MyFunction" // Replace with your Lambda function ARN
    }
  },
  Statement: {
    Effect: "Allow",
    Principal: {
      Service: "lambda.amazonaws.com"
    },
    Action: "events:PutEvents",
    Resource: "arn:aws:events:us-east-1:123456789012:event-bus/myCustomEventBus"
  }
});
```

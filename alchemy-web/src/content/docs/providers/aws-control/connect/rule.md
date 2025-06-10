---
title: Rule
description: Learn how to create, update, and manage AWS Connect Rules using Alchemy Cloud Control.
---


The Rule resource lets you manage [AWS Connect Rules](https://docs.aws.amazon.com/connect/latest/userguide/) for automating agent and customer interactions in Amazon Connect.

## Minimal Example

Create a basic AWS Connect Rule with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicRule = await AWS.Connect.Rule("basicRule", {
  function: "arn:aws:lambda:us-east-1:123456789012:function:myFunction",
  triggerEventSource: {
    type: "ContactFlowEvent",
    event: "ContactInitiated"
  },
  actions: {
    type: "InvokeLambdaFunction",
    parameters: {
      functionArn: "arn:aws:lambda:us-east-1:123456789012:function:myFunction"
    }
  },
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg",
  name: "Basic Rule",
  publishStatus: "ACTIVE"
});
```

## Advanced Configuration

Configure a more complex AWS Connect Rule with multiple actions and tags.

```ts
const advancedRule = await AWS.Connect.Rule("advancedRule", {
  function: "arn:aws:lambda:us-east-1:123456789012:function:myAdvancedFunction",
  triggerEventSource: {
    type: "AgentEvent",
    event: "AgentLoggedIn"
  },
  actions: {
    type: "InvokeLambdaFunction",
    parameters: {
      functionArn: "arn:aws:lambda:us-east-1:123456789012:function:myAdvancedFunction"
    }
  },
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "Support" }
  ],
  name: "Advanced Rule",
  publishStatus: "ACTIVE",
  adopt: true
});
```

## Custom Rule for Escalation

Create a rule specifically for contact escalation scenarios.

```ts
const escalationRule = await AWS.Connect.Rule("escalationRule", {
  function: "arn:aws:lambda:us-east-1:123456789012:function:handleEscalation",
  triggerEventSource: {
    type: "ContactFlowEvent",
    event: "EscalationTriggered"
  },
  actions: {
    type: "InvokeLambdaFunction",
    parameters: {
      functionArn: "arn:aws:lambda:us-east-1:123456789012:function:handleEscalation"
    }
  },
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg",
  name: "Escalation Rule",
  publishStatus: "ACTIVE"
});
```

## Rule for Customer Feedback

This example illustrates how to create a rule that triggers based on customer feedback.

```ts
const feedbackRule = await AWS.Connect.Rule("feedbackRule", {
  function: "arn:aws:lambda:us-east-1:123456789012:function:processFeedback",
  triggerEventSource: {
    type: "ContactFlowEvent",
    event: "FeedbackReceived"
  },
  actions: {
    type: "InvokeLambdaFunction",
    parameters: {
      functionArn: "arn:aws:lambda:us-east-1:123456789012:function:processFeedback"
    }
  },
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg",
  name: "Feedback Rule",
  publishStatus: "ACTIVE"
});
```

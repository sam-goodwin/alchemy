---
title: ResponsePlan
description: Learn how to create, update, and manage AWS SSMIncidents ResponsePlans using Alchemy Cloud Control.
---


The ResponsePlan resource allows you to create and manage [AWS SSMIncidents ResponsePlans](https://docs.aws.amazon.com/ssmincidents/latest/userguide/) for incident management and response workflows.

## Minimal Example

Create a basic ResponsePlan with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicResponsePlan = await AWS.SSMIncidents.ResponsePlan("basicResponsePlan", {
  name: "CriticalIncidentResponse",
  incidentTemplate: {
    title: "Critical Incident",
    summary: "A critical incident that requires immediate attention.",
    impact: "1", // 1 indicates the highest impact
    severity: "HIGH"
  },
  displayName: "Critical Incident Response Plan"
});
```

## Advanced Configuration

Configure a ResponsePlan with additional integrations and actions.

```ts
const advancedResponsePlan = await AWS.SSMIncidents.ResponsePlan("advancedResponsePlan", {
  name: "AdvancedIncidentResponse",
  incidentTemplate: {
    title: "Advanced Incident",
    summary: "An advanced incident that requires detailed response.",
    impact: "2", // 2 indicates a moderate impact
    severity: "MEDIUM"
  },
  actions: [
    {
      action: "NotifyTeam",
      parameters: {
        message: "A new incident has been reported."
      }
    }
  ],
  integrations: [
    {
      type: "Slack",
      targetArn: "arn:aws:chatbot::123456789012:chat-configuration/slack-channel"
    }
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Owner", value: "DevOps" }
  ]
});
```

## Using Chat Channels

Setup a ResponsePlan with a chat channel for notifications.

```ts
const chatResponsePlan = await AWS.SSMIncidents.ResponsePlan("chatResponsePlan", {
  name: "ChatIncidentResponse",
  incidentTemplate: {
    title: "Chat Incident",
    summary: "Incident requiring chat notifications.",
    impact: "3", // 3 indicates low impact
    severity: "LOW"
  },
  chatChannel: {
    chatChannelArn: "arn:aws:chatbot::123456789012:chat-configuration/slack-channel"
  },
  engagements: ["DevTeam", "OpsTeam"]
});
```

---
title: Managing AWS Connect ContactFlowModules with Alchemy
description: Learn how to create, update, and manage AWS Connect ContactFlowModules using Alchemy Cloud Control.
---

# ContactFlowModule

The ContactFlowModule resource allows you to create and manage [AWS Connect ContactFlowModules](https://docs.aws.amazon.com/connect/latest/userguide/) for defining and controlling the flow of customer interactions in your contact center.

## Minimal Example

Create a basic contact flow module with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicContactFlowModule = await AWS.Connect.ContactFlowModule("BasicContactFlowModule", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-efgh-5678-ijkl-9101mnopqrst",
  Name: "Basic Flow Module",
  Description: "A basic contact flow module for handling customer inquiries.",
  Content: JSON.stringify({
    Version: "1.0",
    StartAction: "InitialGreeting",
    Actions: [
      {
        Identifier: "InitialGreeting",
        Type: "PlayPrompt",
        Transitions: {
          NextAction: "HandleUserResponse"
        }
      },
      {
        Identifier: "HandleUserResponse",
        Type: "GetUserInput"
      }
    ]
  }),
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Support" }
  ]
});
```

## Advanced Configuration

Configure a contact flow module with additional actions and state settings.

```ts
const AdvancedContactFlowModule = await AWS.Connect.ContactFlowModule("AdvancedContactFlowModule", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-efgh-5678-ijkl-9101mnopqrst",
  Name: "Advanced Flow Module",
  Description: "An advanced contact flow module for handling complex interactions.",
  Content: JSON.stringify({
    Version: "1.0",
    StartAction: "WelcomeMessage",
    Actions: [
      {
        Identifier: "WelcomeMessage",
        Type: "PlayPrompt",
        Transitions: {
          NextAction: "CaptureFeedback"
        }
      },
      {
        Identifier: "CaptureFeedback",
        Type: "GetUserInput",
        InputType: "Dtmf",
        Transitions: {
          NextAction: "ThankYouMessage"
        }
      },
      {
        Identifier: "ThankYouMessage",
        Type: "PlayPrompt"
      }
    ]
  }),
  State: "ACTIVE",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "CustomerSupport" }
  ]
});
```

## Use Case: Handling Customer Support Requests

Create a contact flow module specifically designed for handling support requests efficiently.

```ts
const SupportRequestFlowModule = await AWS.Connect.ContactFlowModule("SupportRequestFlowModule", {
  InstanceArn: "arn:aws:connect:eu-central-1:123456789012:instance/abcd1234-efgh-5678-ijkl-9101mnopqrst",
  Name: "Support Request Flow Module",
  Description: "A contact flow module for processing customer support requests.",
  Content: JSON.stringify({
    Version: "1.0",
    StartAction: "GatherSupportReason",
    Actions: [
      {
        Identifier: "GatherSupportReason",
        Type: "GetUserInput",
        InputType: "Dtmf",
        Transitions: {
          NextAction: "RouteToAgent"
        }
      },
      {
        Identifier: "RouteToAgent",
        Type: "ConnectParticipant"
      }
    ]
  }),
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "TechSupport" }
  ]
});
```
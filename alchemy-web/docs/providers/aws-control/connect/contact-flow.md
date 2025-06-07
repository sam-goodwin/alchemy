---
title: Managing AWS Connect ContactFlows with Alchemy
description: Learn how to create, update, and manage AWS Connect ContactFlows using Alchemy Cloud Control.
---

# ContactFlow

The ContactFlow resource allows you to create and manage [AWS Connect ContactFlows](https://docs.aws.amazon.com/connect/latest/userguide/) that define the flow of customer interactions in an Amazon Connect instance.

## Minimal Example

Create a basic contact flow with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicContactFlow = await AWS.Connect.ContactFlow("BasicContactFlow", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-12345",
  Type: "CONTACT_FLOW",
  Name: "Basic Contact Flow",
  Description: "A simple contact flow to greet customers.",
  Content: JSON.stringify({
    Version: "2019-10-30",
    StartAction: "Start",
    Actions: [
      {
        Identifier: "Start",
        Type: "PlayPrompt",
        Parameters: {
          Prompt: {
            TextToSpeech: "Welcome to our service. Please hold while we connect you."
          },
          NextAction: "End"
        }
      },
      {
        Identifier: "End",
        Type: "Disconnect",
        Parameters: {}
      }
    ]
  })
});
```

## Advanced Configuration

Configure a contact flow with additional options such as tags and a specific state.

```ts
const advancedContactFlow = await AWS.Connect.ContactFlow("AdvancedContactFlow", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-12345",
  Type: "CONTACT_FLOW",
  Name: "Advanced Contact Flow",
  Description: "An advanced contact flow with tags and active state.",
  Content: JSON.stringify({
    Version: "2019-10-30",
    StartAction: "Start",
    Actions: [
      {
        Identifier: "Start",
        Type: "PlayPrompt",
        Parameters: {
          Prompt: {
            TextToSpeech: "Thank you for calling. Your call is important to us."
          },
          NextAction: "Queue"
        }
      },
      {
        Identifier: "Queue",
        Type: "Enqueue",
        Parameters: {
          Queue: "SupportQueue",
          NextAction: "End"
        }
      },
      {
        Identifier: "End",
        Type: "Disconnect",
        Parameters: {}
      }
    ]
  }),
  State: "ACTIVE",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Customer Support" }
  ]
});
```

## Integration with Other AWS Services

Demonstrate how to connect a contact flow to an existing queue.

```ts
const contactFlowWithQueue = await AWS.Connect.ContactFlow("QueueContactFlow", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-12345",
  Type: "CONTACT_FLOW",
  Name: "Queue Contact Flow",
  Description: "A contact flow that connects customers to a support queue.",
  Content: JSON.stringify({
    Version: "2019-10-30",
    StartAction: "Start",
    Actions: [
      {
        Identifier: "Start",
        Type: "PlayPrompt",
        Parameters: {
          Prompt: {
            TextToSpeech: "You are being connected to our support team."
          },
          NextAction: "Queue"
        }
      },
      {
        Identifier: "Queue",
        Type: "Enqueue",
        Parameters: {
          Queue: "SupportQueue",
          NextAction: "End"
        }
      },
      {
        Identifier: "End",
        Type: "Disconnect",
        Parameters: {}
      }
    ]
  }),
  State: "ACTIVE"
});
```
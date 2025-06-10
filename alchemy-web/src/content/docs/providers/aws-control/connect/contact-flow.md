---
title: ContactFlow
description: Learn how to create, update, and manage AWS Connect ContactFlows using Alchemy Cloud Control.
---


The ContactFlow resource lets you manage [AWS Connect ContactFlows](https://docs.aws.amazon.com/connect/latest/userguide/) for automating customer interactions and improving service quality.

## Minimal Example

Create a basic contact flow with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicContactFlow = await AWS.Connect.ContactFlow("basicContactFlow", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-12345-hijk-67890-lmnopqrs",
  Name: "Basic Contact Flow",
  Type: "CONTACT_FLOW",
  Content: JSON.stringify({
    StartAction: "Start",
    Actions: [
      {
        Identifier: "Start",
        Type: "PlayPrompt",
        Parameters: {
          Prompt: {
            Text: "Welcome to our service. Please hold."
          }
        }
      }
    ]
  }),
  Description: "A simple contact flow to greet customers."
});
```

## Advanced Configuration

Configure a more complex contact flow with various actions and states.

```ts
const advancedContactFlow = await AWS.Connect.ContactFlow("advancedContactFlow", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-12345-hijk-67890-lmnopqrs",
  Name: "Advanced Contact Flow",
  Type: "CONTACT_FLOW",
  Content: JSON.stringify({
    StartAction: "Init",
    Actions: [
      {
        Identifier: "Init",
        Type: "PlayPrompt",
        Parameters: {
          Prompt: {
            Text: "Welcome to our advanced service. Your call is important to us."
          }
        }
      },
      {
        Identifier: "Queue",
        Type: "Queue",
        Parameters: {
          QueueId: "arn:aws:connect:us-east-1:123456789012:queue/abcdefg-12345-hijk-67890-lmnopqrs"
        }
      }
    ]
  }),
  State: "ACTIVE",
  Description: "An advanced contact flow that includes a queue action."
});
```

## Using Tags for Organization

Create a contact flow with tags for better organization and tracking.

```ts
const taggedContactFlow = await AWS.Connect.ContactFlow("taggedContactFlow", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-12345-hijk-67890-lmnopqrs",
  Name: "Tagged Contact Flow",
  Type: "CONTACT_FLOW",
  Content: JSON.stringify({
    StartAction: "Start",
    Actions: [
      {
        Identifier: "Start",
        Type: "PlayPrompt",
        Parameters: {
          Prompt: {
            Text: "Thank you for calling. Please listen carefully."
          }
        }
      }
    ]
  }),
  Tags: [
    {
      Key: "Department",
      Value: "Sales"
    },
    {
      Key: "Project",
      Value: "Customer Service Optimization"
    }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing contact flow instead of creating a new one if it already exists.

```ts
const adoptedContactFlow = await AWS.Connect.ContactFlow("adoptedContactFlow", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-12345-hijk-67890-lmnopqrs",
  Name: "Existing Contact Flow",
  Type: "CONTACT_FLOW",
  Content: JSON.stringify({
    StartAction: "Start",
    Actions: [
      {
        Identifier: "Start",
        Type: "PlayPrompt",
        Parameters: {
          Prompt: {
            Text: "Welcome! Please wait while we connect your call."
          }
        }
      }
    ]
  }),
  adopt: true // This will adopt the existing resource instead of failing
});
```

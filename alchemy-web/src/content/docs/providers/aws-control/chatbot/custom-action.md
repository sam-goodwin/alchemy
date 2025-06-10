---
title: CustomAction
description: Learn how to create, update, and manage AWS Chatbot CustomActions using Alchemy Cloud Control.
---


The CustomAction resource lets you manage [AWS Chatbot CustomActions](https://docs.aws.amazon.com/chatbot/latest/userguide/) for integrating AWS services with chat platforms like Slack and Amazon Chime.

## Minimal Example

Create a basic CustomAction with required properties and one optional alias name:

```ts
import AWS from "alchemy/aws/control";

const basicCustomAction = await AWS.Chatbot.CustomAction("basicCustomAction", {
  ActionName: "NotifyOnError",
  AliasName: "ErrorNotifier",
  Definition: {
    // Define the action behavior here
    Type: "InvokeLambdaFunction",
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:NotifyFunction"
  }
});
```

## Advanced Configuration

Configure a CustomAction with attachments and tags for better management:

```ts
const advancedCustomAction = await AWS.Chatbot.CustomAction("advancedCustomAction", {
  ActionName: "DeployToProduction",
  Definition: {
    Type: "InvokeLambdaFunction",
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:DeployFunction"
  },
  Attachments: [
    {
      Key: "DeploymentInfo",
      Value: "ProductionDeployment"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "DevOps"
    }
  ]
});
```

## Custom Action with Adoption

Create a CustomAction that adopts an existing resource if it already exists:

```ts
const adoptCustomAction = await AWS.Chatbot.CustomAction("adoptCustomAction", {
  ActionName: "BackupDatabase",
  Definition: {
    Type: "InvokeLambdaFunction",
    FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:BackupFunction"
  },
  adopt: true // Adopt existing resource if it exists
});
```

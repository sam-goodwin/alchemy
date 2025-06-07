---
title: Managing AWS Chatbot CustomActions with Alchemy
description: Learn how to create, update, and manage AWS Chatbot CustomActions using Alchemy Cloud Control.
---

# CustomAction

The CustomAction resource lets you create and manage [AWS Chatbot CustomActions](https://docs.aws.amazon.com/chatbot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-chatbot-customaction.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const customaction = await AWS.Chatbot.CustomAction("customaction-example", {
  ActionName: "customaction-action",
  Definition: "example-definition",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a customaction with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCustomAction = await AWS.Chatbot.CustomAction("advanced-customaction", {
  ActionName: "customaction-action",
  Definition: "example-definition",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


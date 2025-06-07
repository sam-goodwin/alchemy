---
title: Managing AWS Bedrock IntelligentPromptRouters with Alchemy
description: Learn how to create, update, and manage AWS Bedrock IntelligentPromptRouters using Alchemy Cloud Control.
---

# IntelligentPromptRouter

The IntelligentPromptRouter resource lets you create and manage [AWS Bedrock IntelligentPromptRouters](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-intelligentpromptrouter.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const intelligentpromptrouter = await AWS.Bedrock.IntelligentPromptRouter(
  "intelligentpromptrouter-example",
  {
    PromptRouterName: "intelligentpromptrouter-promptrouter",
    FallbackModel: "example-fallbackmodel",
    RoutingCriteria: "example-routingcriteria",
    Models: [],
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A intelligentpromptrouter resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a intelligentpromptrouter with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIntelligentPromptRouter = await AWS.Bedrock.IntelligentPromptRouter(
  "advanced-intelligentpromptrouter",
  {
    PromptRouterName: "intelligentpromptrouter-promptrouter",
    FallbackModel: "example-fallbackmodel",
    RoutingCriteria: "example-routingcriteria",
    Models: [],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A intelligentpromptrouter resource managed by Alchemy",
  }
);
```


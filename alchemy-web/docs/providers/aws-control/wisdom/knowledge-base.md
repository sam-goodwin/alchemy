---
title: Managing AWS Wisdom KnowledgeBases with Alchemy
description: Learn how to create, update, and manage AWS Wisdom KnowledgeBases using Alchemy Cloud Control.
---

# KnowledgeBase

The KnowledgeBase resource lets you create and manage [AWS Wisdom KnowledgeBases](https://docs.aws.amazon.com/wisdom/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wisdom-knowledgebase.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const knowledgebase = await AWS.Wisdom.KnowledgeBase("knowledgebase-example", {
  KnowledgeBaseType: "example-knowledgebasetype",
  Name: "knowledgebase-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A knowledgebase resource managed by Alchemy",
});
```

## Advanced Configuration

Create a knowledgebase with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedKnowledgeBase = await AWS.Wisdom.KnowledgeBase("advanced-knowledgebase", {
  KnowledgeBaseType: "example-knowledgebasetype",
  Name: "knowledgebase-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A knowledgebase resource managed by Alchemy",
});
```


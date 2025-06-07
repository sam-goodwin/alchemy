---
title: Managing AWS Bedrock KnowledgeBases with Alchemy
description: Learn how to create, update, and manage AWS Bedrock KnowledgeBases using Alchemy Cloud Control.
---

# KnowledgeBase

The KnowledgeBase resource lets you create and manage [AWS Bedrock KnowledgeBases](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-knowledgebase.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const knowledgebase = await AWS.Bedrock.KnowledgeBase("knowledgebase-example", {
  KnowledgeBaseConfiguration: "example-knowledgebaseconfiguration",
  RoleArn: "example-rolearn",
  Name: "knowledgebase-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A knowledgebase resource managed by Alchemy",
});
```

## Advanced Configuration

Create a knowledgebase with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedKnowledgeBase = await AWS.Bedrock.KnowledgeBase("advanced-knowledgebase", {
  KnowledgeBaseConfiguration: "example-knowledgebaseconfiguration",
  RoleArn: "example-rolearn",
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


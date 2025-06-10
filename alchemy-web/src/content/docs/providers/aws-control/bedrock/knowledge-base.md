---
title: KnowledgeBase
description: Learn how to create, update, and manage AWS Bedrock KnowledgeBases using Alchemy Cloud Control.
---


The KnowledgeBase resource allows you to create and manage [AWS Bedrock KnowledgeBases](https://docs.aws.amazon.com/bedrock/latest/userguide/) that can be used for various applications including storing and retrieving information for AI and machine learning models.

## Minimal Example

Create a basic KnowledgeBase with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const knowledgeBase = await AWS.Bedrock.KnowledgeBase("myKnowledgeBase", {
  Name: "MyFirstKnowledgeBase",
  Description: "A knowledge base for AI model training",
  RoleArn: "arn:aws:iam::123456789012:role/MyRole",
  KnowledgeBaseConfiguration: {
    // Example configuration
    Type: "standard",
    Language: "en"
  }
});
```

## Advanced Configuration

Configure a KnowledgeBase with additional storage settings and tags.

```ts
const advancedKnowledgeBase = await AWS.Bedrock.KnowledgeBase("advancedKnowledgeBase", {
  Name: "AdvancedKnowledgeBase",
  Description: "An advanced knowledge base with storage configuration",
  RoleArn: "arn:aws:iam::123456789012:role/MyAdvancedRole",
  KnowledgeBaseConfiguration: {
    Type: "advanced",
    Language: "en"
  },
  StorageConfiguration: {
    Type: "s3",
    Bucket: "my-bucket",
    Prefix: "knowledgebase-data/"
  },
  Tags: {
    Environment: "production",
    Project: "AIResearch"
  }
});
```

## Adoption of Existing Resource

If you want to adopt an existing KnowledgeBase instead of failing when it already exists, you can set the adopt property to true.

```ts
const existingKnowledgeBase = await AWS.Bedrock.KnowledgeBase("adoptExistingKnowledgeBase", {
  Name: "MyExistingKnowledgeBase",
  RoleArn: "arn:aws:iam::123456789012:role/MyRole",
  KnowledgeBaseConfiguration: {
    Type: "standard",
    Language: "en"
  },
  adopt: true // Adopt existing resource
});
```

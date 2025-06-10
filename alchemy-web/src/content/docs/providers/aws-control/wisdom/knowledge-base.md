---
title: KnowledgeBase
description: Learn how to create, update, and manage AWS Wisdom KnowledgeBases using Alchemy Cloud Control.
---


The KnowledgeBase resource allows you to manage AWS Wisdom KnowledgeBases, which are used to store and retrieve information that can help support agents and customers. For more information, refer to the [AWS Wisdom KnowledgeBases documentation](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

Create a basic KnowledgeBase with a name and type.

```ts
import AWS from "alchemy/aws/control";

const knowledgeBase = await AWS.Wisdom.KnowledgeBase("basicKnowledgeBase", {
  name: "CustomerSupportKB",
  knowledgeBaseType: "CUSTOMER_SUPPORT",
  description: "A knowledge base for customer support queries."
});
```

## Advanced Configuration

Create a KnowledgeBase with detailed configurations including source configuration and server-side encryption.

```ts
const secureKnowledgeBase = await AWS.Wisdom.KnowledgeBase("secureKnowledgeBase", {
  name: "SecureSupportKB",
  knowledgeBaseType: "CUSTOMER_SUPPORT",
  description: "A secure knowledge base for sensitive customer support queries.",
  sourceConfiguration: {
    sourceType: "S3",
    sourceUri: "s3://my-bucket/customer-support-data"
  },
  serverSideEncryptionConfiguration: {
    kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd-efgh-ijkl-mnop"
  }
});
```

## Vector Ingestion Configuration

Create a KnowledgeBase with vector ingestion configuration for enhanced search capabilities.

```ts
const vectorIngestionKnowledgeBase = await AWS.Wisdom.KnowledgeBase("vectorIngestionKB", {
  name: "VectorIngestionSupportKB",
  knowledgeBaseType: "CUSTOMER_SUPPORT",
  vectorIngestionConfiguration: {
    vectorConfiguration: {
      vectorType: "DENSE",
      dimension: 768,
      model: "text-embedding-ada-002"
    }
  }
});
```

## Rendering Configuration

Create a KnowledgeBase that includes a rendering configuration to format responses.

```ts
const renderingKnowledgeBase = await AWS.Wisdom.KnowledgeBase("renderingKB", {
  name: "RenderingSupportKB",
  knowledgeBaseType: "CUSTOMER_SUPPORT",
  renderingConfiguration: {
    template: "<h1>{{title}}</h1><p>{{content}}</p>",
    contentType: "HTML"
  }
});
```

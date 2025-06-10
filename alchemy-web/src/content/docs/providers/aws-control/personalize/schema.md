---
title: Schema
description: Learn how to create, update, and manage AWS Personalize Schemas using Alchemy Cloud Control.
---


The Schema resource lets you define and manage [AWS Personalize Schemas](https://docs.aws.amazon.com/personalize/latest/userguide/) for your machine learning models. Schemas define the structure of your data and how it will be used in your personalization solutions.

## Minimal Example

Create a basic schema with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicSchema = await AWS.Personalize.Schema("basic-schema", {
  Name: "UserInteractionSchema",
  Schema: JSON.stringify({
    type: "record",
    name: "UserInteraction",
    fields: [
      { name: "USER_ID", type: "string" },
      { name: "ITEM_ID", type: "string" },
      { name: "TIMESTAMP", type: "long" }
    ],
    version: "1.0"
  }),
  Domain: "ECOMMERCE" // Optional domain
});
```

## Advanced Configuration

Define a schema with additional properties and a custom domain:

```ts
const advancedSchema = await AWS.Personalize.Schema("advanced-schema", {
  Name: "AdvancedUserInteractionSchema",
  Schema: JSON.stringify({
    type: "record",
    name: "AdvancedUserInteraction",
    fields: [
      { name: "USER_ID", type: "string" },
      { name: "ITEM_ID", type: "string" },
      { name: "TIMESTAMP", type: "long" },
      { name: "EVENT_TYPE", type: "string" }
    ],
    version: "1.0"
  }),
  Domain: "ECOMMERCE",
  adopt: true // Adopt existing resource if it already exists
});
```

## Schema with Multiple Fields

Define a schema that includes multiple interaction types and metadata:

```ts
const multiFieldSchema = await AWS.Personalize.Schema("multi-field-schema", {
  Name: "UserInteractionWithMetadata",
  Schema: JSON.stringify({
    type: "record",
    name: "UserInteractionWithMetadata",
    fields: [
      { name: "USER_ID", type: "string" },
      { name: "ITEM_ID", type: "string" },
      { name: "TIMESTAMP", type: "long" },
      { name: "EVENT_TYPE", type: "string" },
      { name: "METADATA", type: "string" }
    ],
    version: "1.0"
  })
});
```

## Schema for Different Domains

Create schemas tailored for different domains such as ECOMMERCE and VIDEO:

```ts
const videoSchema = await AWS.Personalize.Schema("video-schema", {
  Name: "VideoInteractionSchema",
  Schema: JSON.stringify({
    type: "record",
    name: "VideoInteraction",
    fields: [
      { name: "USER_ID", type: "string" },
      { name: "VIDEO_ID", type: "string" },
      { name: "WATCH_DURATION", type: "long" },
      { name: "TIMESTAMP", type: "long" }
    ],
    version: "1.0"
  }),
  Domain: "VIDEO" // Specify domain for the video use case
});
```

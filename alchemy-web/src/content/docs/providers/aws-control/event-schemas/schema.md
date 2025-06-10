---
title: Schema
description: Learn how to create, update, and manage AWS EventSchemas Schemas using Alchemy Cloud Control.
---


The Schema resource allows you to define and manage [AWS EventSchemas Schemas](https://docs.aws.amazon.com/eventschemas/latest/userguide/) for configuring event-driven architectures in AWS.

## Minimal Example

Create a basic schema with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicSchema = await AWS.EventSchemas.Schema("myBasicSchema", {
  Type: "openapi3",
  Description: "A simple example schema for event management.",
  Content: JSON.stringify({
    openapi: "3.0.0",
    info: {
      title: "Sample Schema",
      version: "1.0.0"
    },
    paths: {}
  }),
  RegistryName: "myEventRegistry"
});
```

## Advanced Configuration

Configure a schema with additional optional properties like SchemaName and Tags for better organization.

```ts
const advancedSchema = await AWS.EventSchemas.Schema("myAdvancedSchema", {
  Type: "openapi3",
  Description: "An advanced schema with additional configurations.",
  Content: JSON.stringify({
    openapi: "3.0.0",
    info: {
      title: "Advanced Schema",
      version: "1.0.0"
    },
    paths: {}
  }),
  RegistryName: "myEventRegistry",
  SchemaName: "CustomSchemaName",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Finance" }
  ]
});
```

## Adopting Existing Resources

Use the adopt option to modify an existing schema without failure.

```ts
const adoptSchema = await AWS.EventSchemas.Schema("adoptExistingSchema", {
  Type: "openapi3",
  Description: "This schema will adopt if it already exists.",
  Content: JSON.stringify({
    openapi: "3.0.0",
    info: {
      title: "Adopted Schema",
      version: "1.0.0"
    },
    paths: {}
  }),
  RegistryName: "myEventRegistry",
  adopt: true
});
```

## Schema for Event-Driven Architecture

Define a schema specifically for integrating with an event-driven application.

```ts
const eventDrivenSchema = await AWS.EventSchemas.Schema("eventDrivenSchema", {
  Type: "cloudwatch",
  Description: "Schema designed for event-driven applications.",
  Content: JSON.stringify({
    type: "object",
    properties: {
      eventType: { type: "string" },
      timestamp: { type: "string", format: "date-time" },
      source: { type: "string" }
    },
    required: ["eventType", "timestamp"]
  }),
  RegistryName: "myEventRegistry",
  Tags: [
    { Key: "UseCase", Value: "Event Processing" }
  ]
});
```

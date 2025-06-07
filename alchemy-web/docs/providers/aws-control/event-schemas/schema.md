---
title: Managing AWS EventSchemas Schemas with Alchemy
description: Learn how to create, update, and manage AWS EventSchemas Schemas using Alchemy Cloud Control.
---

# Schema

The Schema resource allows you to define and manage [AWS EventSchemas Schemas](https://docs.aws.amazon.com/eventschemas/latest/userguide/) for your applications. This resource enables you to create event schemas that can be used to validate and define the structure of events in your AWS environment.

## Minimal Example

Create a basic schema with the required properties:

```ts
import AWS from "alchemy/aws/control";

const basicSchema = await AWS.EventSchemas.Schema("BasicEventSchema", {
  Type: "openapi3",
  Content: JSON.stringify({
    Schema: {
      type: "object",
      properties: {
        message: { type: "string" },
        timestamp: { type: "string", format: "date-time" }
      }
    }
  }),
  RegistryName: "MyEventRegistry",
  Description: "A basic schema for event messages",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Define an advanced schema with additional optional properties such as schema name and tags:

```ts
const advancedSchema = await AWS.EventSchemas.Schema("AdvancedEventSchema", {
  Type: "openapi3",
  Content: JSON.stringify({
    Schema: {
      type: "object",
      properties: {
        userId: { type: "string" },
        action: { type: "string" },
        timestamp: { type: "string", format: "date-time" }
      }
    }
  }),
  RegistryName: "MyEventRegistry",
  SchemaName: "UserActionSchema",
  Description: "Schema for user actions",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "User Experience" }
  ]
});
```

## Detailed Event Schema

Create a schema that captures more detailed event information:

```ts
const detailedSchema = await AWS.EventSchemas.Schema("DetailedEventSchema", {
  Type: "openapi3",
  Content: JSON.stringify({
    Schema: {
      type: "object",
      properties: {
        eventId: { type: "string" },
        status: { type: "string" },
        createdAt: { type: "string", format: "date-time" }
      }
    }
  }),
  RegistryName: "MyEventRegistry",
  SchemaName: "EventStatusSchema",
  Description: "Schema for tracking event statuses",
  Tags: [{ Key: "Project", Value: "Events" }]
});
```
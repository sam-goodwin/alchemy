---
title: RegistryPolicy
description: Learn how to create, update, and manage AWS EventSchemas RegistryPolicys using Alchemy Cloud Control.
---


The RegistryPolicy resource allows you to manage [AWS EventSchemas RegistryPolicys](https://docs.aws.amazon.com/eventschemas/latest/userguide/) for controlling access to event schemas within a specific registry.

## Minimal Example

Create a basic registry policy with required properties and an optional revision ID.

```ts
import AWS from "alchemy/aws/control";

const basicRegistryPolicy = await AWS.EventSchemas.RegistryPolicy("basicPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "events.amazonaws.com"
        },
        Action: "events:PutSchema",
        Resource: "*"
      }
    ]
  },
  RegistryName: "myEventRegistry",
  RevisionId: "1234567890"
});
```

## Advanced Configuration

Define a registry policy that includes multiple statements for more granular control.

```ts
const advancedRegistryPolicy = await AWS.EventSchemas.RegistryPolicy("advancedPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "events.amazonaws.com"
        },
        Action: ["events:PutSchema", "events:DeleteSchema"],
        Resource: "*"
      },
      {
        Effect: "Deny",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/UnauthorizedRole"
        },
        Action: "events:PutSchema",
        Resource: "*"
      }
    ]
  },
  RegistryName: "myAdvancedEventRegistry"
});
```

## Policy with Revision ID

Create a registry policy that specifies the revision ID to track changes.

```ts
const policyWithRevisionId = await AWS.EventSchemas.RegistryPolicy("policyWithRevisionId", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "events.amazonaws.com"
        },
        Action: "events:PutSchema",
        Resource: "*"
      }
    ]
  },
  RegistryName: "myEventRegistryWithRevision",
  RevisionId: "rev-001"
});
```

## Adopt Existing Resource

Adopt an existing registry policy instead of failing if it already exists.

```ts
const adoptRegistryPolicy = await AWS.EventSchemas.RegistryPolicy("existingPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "events.amazonaws.com"
        },
        Action: "events:PutSchema",
        Resource: "*"
      }
    ]
  },
  RegistryName: "myAdoptedRegistry",
  adopt: true
});
```

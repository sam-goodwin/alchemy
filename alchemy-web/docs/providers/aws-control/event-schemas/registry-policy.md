---
title: Managing AWS EventSchemas RegistryPolicys with Alchemy
description: Learn how to create, update, and manage AWS EventSchemas RegistryPolicys using Alchemy Cloud Control.
---

# RegistryPolicy

The RegistryPolicy resource allows you to manage [AWS EventSchemas RegistryPolicys](https://docs.aws.amazon.com/eventschemas/latest/userguide/) for controlling access to your event schema registries.

## Minimal Example

Create a basic registry policy with required properties and an optional revision ID.

```ts
import AWS from "alchemy/aws/control";

const BasicRegistryPolicy = await AWS.EventSchemas.RegistryPolicy("BasicRegistryPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          "AWS": "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "events:PutEvents",
        Resource: "*"
      }
    ]
  },
  RegistryName: "MyEventRegistry",
  RevisionId: "1"
});
```

## Advanced Configuration

Configure a registry policy with more complex IAM policy statements.

```ts
const AdvancedRegistryPolicy = await AWS.EventSchemas.RegistryPolicy("AdvancedRegistryPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          "AWS": "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "events:PutEvents",
        Resource: "*",
        Condition: {
          StringEquals: {
            "events:Source": "MyApplication"
          }
        }
      },
      {
        Effect: "Deny",
        Principal: {
          "AWS": "arn:aws:iam::123456789012:role/AnotherRole"
        },
        Action: "events:PutEvents",
        Resource: "*"
      }
    ]
  },
  RegistryName: "MyAdvancedEventRegistry"
});
```

## Adopt Existing Policy

Create a registry policy that adopts an existing resource if it already exists.

```ts
const AdoptRegistryPolicy = await AWS.EventSchemas.RegistryPolicy("AdoptRegistryPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          "AWS": "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "events:PutEvents",
        Resource: "*"
      }
    ]
  },
  RegistryName: "MyAdoptedEventRegistry",
  adopt: true
});
```
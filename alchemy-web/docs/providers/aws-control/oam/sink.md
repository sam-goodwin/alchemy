---
title: Managing AWS Oam Sinks with Alchemy
description: Learn how to create, update, and manage AWS Oam Sinks using Alchemy Cloud Control.
---

# Sink

The Sink resource allows you to manage [AWS Oam Sinks](https://docs.aws.amazon.com/oam/latest/userguide/) which are used to collect and route observability data across AWS accounts and services.

## Minimal Example

Create a basic Oam Sink with essential properties:

```ts
import AWS from "alchemy/aws/control";

const BasicSink = await AWS.Oam.Sink("BasicSink", {
  Name: "MyOamSink",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "oam.amazonaws.com"
        },
        Action: "oam:PutSink",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Observability" }
  ]
});
```

## Advanced Configuration

Configure a sink with enhanced permissions and specific tags:

```ts
const AdvancedSink = await AWS.Oam.Sink("AdvancedSink", {
  Name: "AdvancedOamSink",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "oam.amazonaws.com"
        },
        Action: [
          "oam:PutSink",
          "oam:DeleteSink"
        ],
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "Monitoring" }
  ]
});
```

## Using Existing Resources

Adopt an existing Oam Sink resource without failing if it already exists:

```ts
const AdoptExistingSink = await AWS.Oam.Sink("AdoptExistingSink", {
  Name: "ExistingOamSink",
  adopt: true, // This will allow adopting the existing sink
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "oam.amazonaws.com"
        },
        Action: "oam:PutSink",
        Resource: "*"
      }
    ]
  }
});
```
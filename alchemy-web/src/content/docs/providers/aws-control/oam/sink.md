---
title: Sink
description: Learn how to create, update, and manage AWS Oam Sinks using Alchemy Cloud Control.
---


The Sink resource allows you to create and manage [AWS Oam Sinks](https://docs.aws.amazon.com/oam/latest/userguide/) for centralized logging and monitoring of your AWS resources.

## Minimal Example

Create a basic Oam Sink with a name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicSink = await AWS.Oam.Sink("basicSink", {
  name: "MyOamSink",
  tags: {
    Environment: "Production",
    Project: "LoggingService"
  }
});
```

## Enhanced Policy Configuration

Configure a sink with an IAM policy that grants permissions to write logs.

```ts
const secureSink = await AWS.Oam.Sink("secureSink", {
  name: "SecureOamSink",
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "logs.amazonaws.com"
        },
        Action: "oam:PutLogEvents",
        Resource: "*"
      }
    ]
  }
});
```

## Adoption of Existing Resource

Adopt an existing Oam Sink if it already exists, preventing failure during creation.

```ts
const adoptedSink = await AWS.Oam.Sink("adoptedSink", {
  name: "ExistingOamSink",
  adopt: true
});
```

## Advanced Configuration with Detailed Tags

Create a sink with detailed tags for better resource management and tracking.

```ts
const detailedSink = await AWS.Oam.Sink("detailedSink", {
  name: "DetailedOamSink",
  tags: {
    Environment: "Staging",
    Owner: "DevTeam",
    Purpose: "Testing"
  },
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "logs.amazonaws.com"
        },
        Action: [
          "oam:PutLogEvents",
          "oam:CreateLogStream"
        ],
        Resource: "*"
      }
    ]
  }
});
```

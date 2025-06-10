---
title: IngestConfiguration
description: Learn how to create, update, and manage AWS IVS IngestConfigurations using Alchemy Cloud Control.
---


The IngestConfiguration resource lets you manage [AWS IVS IngestConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) for configuring video ingest settings in AWS Interactive Video Service.

## Minimal Example

Create a basic ingest configuration with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const ingestConfig = await AWS.IVS.IngestConfiguration("basicIngestConfig", {
  userId: "user123",
  ingestProtocol: "RTMP",
  stageArn: "arn:aws:ivs:us-west-2:123456789012:stage:example-stage",
  insecureIngest: false,
  name: "BasicIngestConfig"
});
```

## Advanced Configuration

Set up an ingest configuration with additional optional settings to enhance functionality.

```ts
const advancedIngestConfig = await AWS.IVS.IngestConfiguration("advancedIngestConfig", {
  userId: "user456",
  ingestProtocol: "RTMP",
  stageArn: "arn:aws:ivs:us-east-1:123456789012:stage:another-stage",
  insecureIngest: true,
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "LiveStream" }
  ],
  name: "AdvancedIngestConfig"
});
```

## Custom Ingest Settings

Configure an ingest setting with specific user ID and ingest protocol.

```ts
const customIngestConfig = await AWS.IVS.IngestConfiguration("customIngestConfig", {
  userId: "user789",
  ingestProtocol: "RTMP",
  stageArn: "arn:aws:ivs:us-west-1:123456789012:stage:custom-stage",
  insecureIngest: false,
  name: "CustomIngestConfig"
});
```

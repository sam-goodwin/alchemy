---
title: Managing AWS IVS IngestConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IVS IngestConfigurations using Alchemy Cloud Control.
---

# IngestConfiguration

The IngestConfiguration resource allows you to manage [AWS IVS IngestConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) which are essential for configuring video ingest settings for your streaming applications.

## Minimal Example

Create a basic IngestConfiguration with required properties and some common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicIngestConfig = await AWS.IVS.IngestConfiguration("BasicIngestConfig", {
  UserId: "user_12345",
  IngestProtocol: "RTMP",
  StageArn: "arn:aws:ivs:us-west-2:123456789012:stage/abc123",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Streaming" }
  ]
});
```

## Advanced Configuration

Configure an IngestConfiguration with additional options such as InsecureIngest and a name.

```ts
const advancedIngestConfig = await AWS.IVS.IngestConfiguration("AdvancedIngestConfig", {
  UserId: "user_67890",
  IngestProtocol: "RTMP",
  StageArn: "arn:aws:ivs:us-west-2:123456789012:stage/xyz456",
  InsecureIngest: true,
  Name: "MyAdvancedIngestConfig",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "IVS Demo" }
  ]
});
```

## Secure Ingest Configuration

Create an IngestConfiguration ensuring secure ingest settings with InsecureIngest set to false.

```ts
const secureIngestConfig = await AWS.IVS.IngestConfiguration("SecureIngestConfig", {
  UserId: "user_54321",
  IngestProtocol: "RTMP",
  StageArn: "arn:aws:ivs:us-west-2:123456789012:stage/secure123",
  InsecureIngest: false,
  Name: "MySecureIngestConfig",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```

## Adoption of Existing Resource

If you need to adopt an existing IngestConfiguration instead of failing, set the adopt property to true.

```ts
const adoptExistingIngestConfig = await AWS.IVS.IngestConfiguration("AdoptExistingIngestConfig", {
  UserId: "user_13579",
  IngestProtocol: "RTMP",
  StageArn: "arn:aws:ivs:us-west-2:123456789012:stage/adopted123",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```
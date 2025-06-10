---
title: MissionProfile
description: Learn how to create, update, and manage AWS GroundStation MissionProfiles using Alchemy Cloud Control.
---


The MissionProfile resource allows you to manage [AWS GroundStation MissionProfiles](https://docs.aws.amazon.com/groundstation/latest/userguide/) which define how satellite data is processed and streamed during ground station operations.

## Minimal Example

Create a basic MissionProfile with the required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const missionProfile = await AWS.GroundStation.MissionProfile("basic-mission-profile", {
  name: "BasicMissionProfile",
  minimumViableContactDurationSeconds: 300,
  dataflowEdges: [{
    from: "satellite",
    to: "groundStation"
  }],
  trackingConfigArn: "arn:aws:groundstation:us-east-1:123456789012:tracking-config:example-tracking-config",
  contactPrePassDurationSeconds: 60,
  contactPostPassDurationSeconds: 60
});
```

## Advanced Configuration

Configure a MissionProfile with enhanced security for streaming and additional tags.

```ts
const secureMissionProfile = await AWS.GroundStation.MissionProfile("secure-mission-profile", {
  name: "SecureMissionProfile",
  minimumViableContactDurationSeconds: 300,
  dataflowEdges: [{
    from: "satellite",
    to: "groundStation"
  }],
  trackingConfigArn: "arn:aws:groundstation:us-east-1:123456789012:tracking-config:example-tracking-config",
  streamsKmsKey: {
    keyId: "arn:aws:kms:us-east-1:123456789012:key/example-key-id",
    keyType: "KMS"
  },
  streamsKmsRole: "arn:aws:iam::123456789012:role/example-streams-role",
  tags: [{
    key: "Environment",
    value: "Production"
  }]
});
```

## Streaming Configuration

Set up a MissionProfile with specific streaming configurations using KMS keys.

```ts
const streamingMissionProfile = await AWS.GroundStation.MissionProfile("streaming-mission-profile", {
  name: "StreamingMissionProfile",
  minimumViableContactDurationSeconds: 600,
  dataflowEdges: [{
    from: "satellite",
    to: "groundStation"
  }],
  trackingConfigArn: "arn:aws:groundstation:us-east-1:123456789012:tracking-config:example-tracking-config",
  streamsKmsKey: {
    keyId: "arn:aws:kms:us-east-1:123456789012:key/example-key-id",
    keyType: "KMS"
  },
  streamsKmsRole: "arn:aws:iam::123456789012:role/example-streams-role",
  contactPrePassDurationSeconds: 120,
  contactPostPassDurationSeconds: 120
});
```

---
title: Channel
description: Learn how to create, update, and manage AWS MediaPackage Channels using Alchemy Cloud Control.
---


The Channel resource lets you manage [AWS MediaPackage Channels](https://docs.aws.amazon.com/mediapackage/latest/userguide/) for delivering video content over the internet.

## Minimal Example

Create a basic MediaPackage Channel with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const mediaPackageChannel = await AWS.MediaPackage.Channel("myChannel", {
  Id: "my-channel-id",
  Description: "This channel is for delivering live sports events.",
  HlsIngest: {
    IngestEndpoints: [{
      Id: "my-ingest-endpoint-id",
      Url: "https://my-ingest-endpoint.example.com"
    }]
  }
});
```

## Advanced Configuration

Configure a channel with ingress and egress access logs for monitoring and analysis.

```ts
const mediaPackageChannelWithLogs = await AWS.MediaPackage.Channel("myChannelWithLogs", {
  Id: "my-channel-logs-id",
  Description: "This channel includes logging for better monitoring.",
  HlsIngest: {
    IngestEndpoints: [{
      Id: "my-ingest-endpoint-id",
      Url: "https://my-ingest-endpoint.example.com"
    }]
  },
  IngressAccessLogs: {
    LogGroupName: "my-ingress-log-group",
    LogRoleArn: "arn:aws:iam::123456789012:role/my-log-role"
  },
  EgressAccessLogs: {
    LogGroupName: "my-egress-log-group",
    LogRoleArn: "arn:aws:iam::123456789012:role/my-log-role"
  },
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Adoption of Existing Resource

If you need to adopt an existing MediaPackage Channel instead of creating a new one, you can set the adopt property to true.

```ts
const adoptedChannel = await AWS.MediaPackage.Channel("existingChannel", {
  Id: "existing-channel-id",
  adopt: true
});
```

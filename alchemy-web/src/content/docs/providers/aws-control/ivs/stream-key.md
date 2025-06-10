---
title: StreamKey
description: Learn how to create, update, and manage AWS IVS StreamKeys using Alchemy Cloud Control.
---


The StreamKey resource allows you to manage [AWS IVS StreamKeys](https://docs.aws.amazon.com/ivs/latest/userguide/) which are used to authenticate streaming sessions for your channels.

## Minimal Example

Create a basic StreamKey associated with a specific channel.

```ts
import AWS from "alchemy/aws/control";

const streamKey = await AWS.IVS.StreamKey("myStreamKey", {
  ChannelArn: "arn:aws:ivs:us-west-2:123456789012:channel/abcd1234",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Create a StreamKey with additional configurations to adopt an existing resource.

```ts
const existingStreamKey = await AWS.IVS.StreamKey("existingStreamKey", {
  ChannelArn: "arn:aws:ivs:us-west-2:123456789012:channel/efgh5678",
  Tags: [
    { Key: "Project", Value: "LiveStream" }
  ],
  adopt: true // Adopt the existing resource if it already exists
});
```

## StreamKey with No Tags

Create a StreamKey without any tags for a simpler configuration.

```ts
const simpleStreamKey = await AWS.IVS.StreamKey("simpleStreamKey", {
  ChannelArn: "arn:aws:ivs:us-west-2:123456789012:channel/ijkl91011"
});
```

## StreamKey Retrieval

Retrieve information about a StreamKey, including its ARN and timestamps.

```ts
const streamKeyDetails = await AWS.IVS.StreamKey("retrieveStreamKey", {
  ChannelArn: "arn:aws:ivs:us-west-2:123456789012:channel/mnop121314",
  Tags: [],
});

// Access specific details
console.log("StreamKey ARN:", streamKeyDetails.Arn);
console.log("Creation Time:", streamKeyDetails.CreationTime);
console.log("Last Update Time:", streamKeyDetails.LastUpdateTime);
```

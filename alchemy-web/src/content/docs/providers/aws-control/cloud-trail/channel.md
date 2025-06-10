---
title: Channel
description: Learn how to create, update, and manage AWS CloudTrail Channels using Alchemy Cloud Control.
---


The Channel resource allows you to manage [AWS CloudTrail Channels](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) for streaming event data to various destinations. This resource is essential for setting up data pipelines and integrating with other AWS services.

## Minimal Example

Create a basic CloudTrail Channel with a destination pointing to an S3 bucket.

```ts
import AWS from "alchemy/aws/control";

const cloudTrailChannel = await AWS.CloudTrail.Channel("basicChannel", {
  Destinations: [
    {
      Destination: "arn:aws:s3:::my-cloudtrail-bucket",
      DestinationType: "S3"
    }
  ],
  Source: "my-source",
  Name: "MyCloudTrailChannel"
});
```

## Advanced Configuration

Configure a channel with multiple destinations and custom tags for better organization.

```ts
const advancedChannel = await AWS.CloudTrail.Channel("advancedChannel", {
  Destinations: [
    {
      Destination: "arn:aws:s3:::my-cloudtrail-bucket",
      DestinationType: "S3"
    },
    {
      Destination: "arn:aws:kinesis:us-east-1:123456789012:stream/my-kinesis-stream",
      DestinationType: "Kinesis"
    }
  ],
  Source: "my-advanced-source",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  Name: "AdvancedCloudTrailChannel"
});
```

## Adoption of Existing Resources

Adopt an existing CloudTrail Channel instead of failing if it already exists.

```ts
const adoptChannel = await AWS.CloudTrail.Channel("adoptedChannel", {
  Destinations: [
    {
      Destination: "arn:aws:s3:::my-existing-cloudtrail-bucket",
      DestinationType: "S3"
    }
  ],
  Source: "my-adopted-source",
  Name: "AdoptedCloudTrailChannel",
  adopt: true
});
```

## Adding Tags for Resource Management

Create a channel while adding tags to facilitate resource management and cost tracking.

```ts
const taggedChannel = await AWS.CloudTrail.Channel("taggedChannel", {
  Destinations: [
    {
      Destination: "arn:aws:s3:::my-tagged-channel-bucket",
      DestinationType: "S3"
    }
  ],
  Source: "my-tagged-source",
  Name: "TaggedCloudTrailChannel",
  Tags: [
    { Key: "Project", Value: "CloudTrailIntegration" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

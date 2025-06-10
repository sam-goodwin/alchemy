---
title: ChannelPolicy
description: Learn how to create, update, and manage AWS MediaPackageV2 ChannelPolicys using Alchemy Cloud Control.
---


The ChannelPolicy resource allows you to manage [AWS MediaPackageV2 ChannelPolicys](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) for controlling access to your media channels.

## Minimal Example

This example demonstrates how to create a basic ChannelPolicy with required properties and an optional 'adopt' property.

```ts
import AWS from "alchemy/aws/control";

const channelPolicy = await AWS.MediaPackageV2.ChannelPolicy("basicChannelPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "mediapackage:DescribeChannel",
        Resource: "*"
      }
    ]
  },
  ChannelName: "myMediaChannel",
  ChannelGroupName: "myChannelGroup",
  adopt: true // Adopts existing resource if it already exists
});
```

## Advanced Configuration

This example shows how to configure a ChannelPolicy with a more complex IAM policy that restricts access to specific actions and resources.

```ts
const advancedChannelPolicy = await AWS.MediaPackageV2.ChannelPolicy("advancedChannelPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "arn:aws:iam::123456789012:role/MyMediaRole" },
        Action: [
          "mediapackage:DescribeChannel",
          "mediapackage:ListChannels"
        ],
        Resource: "arn:aws:mediapackage:us-west-2:123456789012:channel/myMediaChannel"
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "mediapackage:DeleteChannel",
        Resource: "arn:aws:mediapackage:us-west-2:123456789012:channel/myMediaChannel"
      }
    ]
  },
  ChannelName: "myMediaChannel",
  ChannelGroupName: "myChannelGroup"
});
```

## Specific Use Case: Restricting Access by IP Address

This example demonstrates how to restrict access to the ChannelPolicy based on IP address using a condition in the IAM policy.

```ts
const ipRestrictedChannelPolicy = await AWS.MediaPackageV2.ChannelPolicy("ipRestrictedChannelPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "mediapackage:DescribeChannel",
        Resource: "*",
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "192.0.2.0/24"
          }
        }
      }
    ]
  },
  ChannelName: "myMediaChannel",
  ChannelGroupName: "myChannelGroup"
});
```

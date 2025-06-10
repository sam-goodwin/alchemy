---
title: OriginEndpointPolicy
description: Learn how to create, update, and manage AWS MediaPackageV2 OriginEndpointPolicys using Alchemy Cloud Control.
---


The OriginEndpointPolicy resource allows you to manage [AWS MediaPackageV2 OriginEndpointPolicys](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) which define access control and routing rules for your media content delivery. This resource is crucial for ensuring secure and efficient streaming of media content.

## Minimal Example

Create a basic OriginEndpointPolicy with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.MediaPackageV2.OriginEndpointPolicy("basicPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "mediapackage:DescribeOriginEndpoint",
        Resource: "*"
      }
    ]
  },
  ChannelName: "liveChannel",
  OriginEndpointName: "liveEndpoint",
  ChannelGroupName: "liveChannelGroup"
});
```

## Advanced Configuration

Configure an OriginEndpointPolicy with more detailed access control settings and the option to adopt existing resources:

```ts
const advancedPolicy = await AWS.MediaPackageV2.OriginEndpointPolicy("advancedPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyMediaPackageRole"
        },
        Action: [
          "mediapackage:CreateOriginEndpoint",
          "mediapackage:UpdateOriginEndpoint"
        ],
        Resource: "*"
      }
    ]
  },
  ChannelName: "myLiveChannel",
  OriginEndpointName: "myLiveEndpoint",
  ChannelGroupName: "myChannelGroup",
  adopt: true // Allow adoption of existing resource if present
});
```

## Policy for Restricted Access

Define a policy that restricts access to a specific IP range for enhanced security:

```ts
const restrictedAccessPolicy = await AWS.MediaPackageV2.OriginEndpointPolicy("restrictedAccessPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Principal: "*",
        Action: "mediapackage:*",
        Resource: "*",
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "192.168.1.0/24"
          }
        }
      }
    ]
  },
  ChannelName: "restrictedChannel",
  OriginEndpointName: "restrictedEndpoint",
  ChannelGroupName: "restrictedChannelGroup"
});
```

## Dynamic Policy Update

Implement a policy that can be dynamically updated based on the channel state:

```ts
const dynamicPolicy = await AWS.MediaPackageV2.OriginEndpointPolicy("dynamicPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "mediapackage:GetChannel",
        Resource: "*",
        Condition: {
          "StringEquals": {
            "mediapackage:ChannelState": "ACTIVE"
          }
        }
      }
    ]
  },
  ChannelName: "dynamicChannel",
  OriginEndpointName: "dynamicEndpoint",
  ChannelGroupName: "dynamicChannelGroup"
});
```

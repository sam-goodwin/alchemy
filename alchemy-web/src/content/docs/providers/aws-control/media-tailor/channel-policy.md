---
title: ChannelPolicy
description: Learn how to create, update, and manage AWS MediaTailor ChannelPolicies using Alchemy Cloud Control.
---


The ChannelPolicy resource allows you to manage policies for AWS MediaTailor channels, enabling you to control various settings and permissions for media playback. For more details, refer to the [AWS MediaTailor ChannelPolicies documentation](https://docs.aws.amazon.com/mediatailor/latest/userguide/).

## Minimal Example

Create a basic ChannelPolicy with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicChannelPolicy = await AWS.MediaTailor.ChannelPolicy("basicChannelPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "mediatailor:PutChannelPolicy",
        Resource: "*"
      }
    ]
  },
  ChannelName: "my-media-channel"
});
```

## Advanced Configuration

Configure a ChannelPolicy with more complex IAM permissions and additional settings.

```ts
const advancedChannelPolicy = await AWS.MediaTailor.ChannelPolicy("advancedChannelPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "mediatailor:PutChannelPolicy",
          "mediatailor:GetChannelPolicy"
        ],
        Resource: "*"
      },
      {
        Effect: "Deny",
        Action: "mediatailor:DeleteChannelPolicy",
        Resource: "*",
        Condition: {
          "StringEquals": {
            "mediatailor:ChannelName": "my-media-channel"
          }
        }
      }
    ]
  },
  ChannelName: "my-media-channel",
  adopt: true // Adopt existing resource if it exists
});
```

## Policy with Custom Conditions

Define a ChannelPolicy with specific conditions based on the requester.

```ts
const conditionalChannelPolicy = await AWS.MediaTailor.ChannelPolicy("conditionalChannelPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "mediatailor:PutChannelPolicy",
        Resource: "*",
        Condition: {
          "StringEquals": {
            "aws:PrincipalOrgID": "o-1234567890"
          }
        }
      }
    ]
  },
  ChannelName: "organization-channel"
});
```

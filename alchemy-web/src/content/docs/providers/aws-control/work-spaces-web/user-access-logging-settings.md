---
title: UserAccessLoggingSettings
description: Learn how to create, update, and manage AWS WorkSpacesWeb UserAccessLoggingSettings using Alchemy Cloud Control.
---

The UserAccessLoggingSettings resource allows you to configure logging settings for user access in AWS WorkSpaces Web. This resource helps you manage logs generated by user activities, providing insights into usage patterns and security. For more details, refer to the [AWS WorkSpacesWeb UserAccessLoggingSettings documentation](https://docs.aws.amazon.com/workspacesweb/latest/userguide/).

## Minimal Example

Create a basic UserAccessLoggingSettings resource with the required KinesisStreamArn property and a set of tags.

```ts
import AWS from "alchemy/aws/control";

const userAccessLoggingSettings = await AWS.WorkSpacesWeb.UserAccessLoggingSettings("basicLoggingSettings", {
  KinesisStreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/myKinesisStream",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "WebApp"
    }
  ]
});
```

## Advanced Configuration

Configure UserAccessLoggingSettings with an existing resource adoption option.

```ts
const advancedLoggingSettings = await AWS.WorkSpacesWeb.UserAccessLoggingSettings("advancedLoggingSettings", {
  KinesisStreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/myKinesisStream",
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ],
  adopt: true // Allow adoption of existing resources
});
```

## Logging with Enhanced Tags

Set up logging with additional tags to segment your user access logs for better analysis.

```ts
const taggedLoggingSettings = await AWS.WorkSpacesWeb.UserAccessLoggingSettings("taggedLoggingSettings", {
  KinesisStreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/myKinesisStream",
  Tags: [
    {
      Key: "Application",
      Value: "UserPortal"
    },
    {
      Key: "Department",
      Value: "Engineering"
    },
    {
      Key: "Version",
      Value: "v1.0"
    }
  ]
});
```
---
title: Managing AWS WorkSpacesWeb UserAccessLoggingSettingss with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb UserAccessLoggingSettingss using Alchemy Cloud Control.
---

# UserAccessLoggingSettings

The UserAccessLoggingSettings resource allows you to configure logging settings for user access in AWS WorkSpaces Web, enabling you to track user activity and improve security. For more detailed information, visit the [AWS WorkSpacesWeb UserAccessLoggingSettings documentation](https://docs.aws.amazon.com/workspacesweb/latest/userguide/).

## Minimal Example

Create a basic UserAccessLoggingSettings resource with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const UserAccessLoggingSettingsResource = await AWS.WorkSpacesWeb.UserAccessLoggingSettings("BasicLoggingSettings", {
  KinesisStreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/UserAccessLogs",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure UserAccessLoggingSettings with additional properties such as multiple tags.

```ts
const AdvancedUserAccessLoggingSettings = await AWS.WorkSpacesWeb.UserAccessLoggingSettings("AdvancedLoggingSettings", {
  KinesisStreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/AdvancedUserAccessLogs",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Security" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Custom Tags

Set up UserAccessLoggingSettings with a custom logging configuration and multiple descriptive tags.

```ts
const CustomTaggedUserAccessLoggingSettings = await AWS.WorkSpacesWeb.UserAccessLoggingSettings("CustomTaggedLoggingSettings", {
  KinesisStreamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/CustomUserAccessLogs",
  Tags: [
    { Key: "Project", Value: "WebApp" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```
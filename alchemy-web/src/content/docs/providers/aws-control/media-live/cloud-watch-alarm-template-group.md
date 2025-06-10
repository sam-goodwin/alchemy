---
title: CloudWatchAlarmTemplateGroup
description: Learn how to create, update, and manage AWS MediaLive CloudWatchAlarmTemplateGroups using Alchemy Cloud Control.
---


The CloudWatchAlarmTemplateGroup resource allows you to manage [AWS MediaLive CloudWatch Alarm Template Groups](https://docs.aws.amazon.com/medialive/latest/userguide/). This resource enables you to create and configure CloudWatch alarms for monitoring your MediaLive channels.

## Minimal Example

Create a basic CloudWatchAlarmTemplateGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const alarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("basicAlarmTemplateGroup", {
  name: "BasicAlarmTemplateGroup",
  description: "This group contains alarms for basic monitoring",
  tags: {
    Environment: "Production",
    Project: "MediaStreaming"
  }
});
```

## Advanced Configuration

Configure a CloudWatchAlarmTemplateGroup with additional properties, such as tags for better organization.

```ts
const advancedAlarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("advancedAlarmTemplateGroup", {
  name: "AdvancedAlarmTemplateGroup",
  description: "This group contains advanced monitoring alarms with specific tags",
  tags: {
    Environment: "Staging",
    Department: "MediaServices",
    Owner: "DevTeam"
  },
  adopt: true // Adopt existing resources if they already exist
});
```

## Monitoring Specific Metrics

Create a CloudWatchAlarmTemplateGroup focused on monitoring specific MediaLive metrics.

```ts
const metricsAlarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("metricsAlarmTemplateGroup", {
  name: "MetricsAlarmTemplateGroup",
  description: "Group for monitoring specific MediaLive metrics",
  tags: {
    Environment: "Testing",
    Owner: "QA"
  }
});

// Further configuration can be added here for specific metrics
```

## Utilizing Existing Resources

Adopt an existing CloudWatchAlarmTemplateGroup if it already exists, which can be useful for managing resources across different environments.

```ts
const existingAlarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("existingAlarmTemplateGroup", {
  name: "ExistingAlarmTemplateGroup",
  adopt: true // This allows the resource to adopt if it exists
});
```

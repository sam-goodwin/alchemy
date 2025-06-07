---
title: Managing AWS MediaLive CloudWatchAlarmTemplateGroups with Alchemy
description: Learn how to create, update, and manage AWS MediaLive CloudWatchAlarmTemplateGroups using Alchemy Cloud Control.
---

# CloudWatchAlarmTemplateGroup

The CloudWatchAlarmTemplateGroup resource lets you manage [AWS MediaLive CloudWatch Alarm Template Groups](https://docs.aws.amazon.com/medialive/latest/userguide/). This resource allows you to define groups of CloudWatch alarms that can be used for monitoring your AWS MediaLive resources.

## Minimal Example

Create a basic CloudWatch Alarm Template Group with required properties and a common optional property for tags.

```ts
import AWS from "alchemy/aws/control";

const AlarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("BasicAlarmTemplateGroup", {
  Name: "BasicAlarmGroup",
  Description: "A basic alarm template group for monitoring MediaLive resources",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

Configure a CloudWatch Alarm Template Group with additional properties, including a longer description.

```ts
const AdvancedAlarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("AdvancedAlarmTemplateGroup", {
  Name: "AdvancedAlarmGroup",
  Description: "An advanced alarm template group for comprehensive monitoring of MediaLive applications",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Department", Value: "Engineering" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Use Case: Monitoring Live Stream Quality

Create a CloudWatch Alarm Template Group specifically designed for monitoring the quality of live streams.

```ts
const LiveStreamQualityAlarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("LiveStreamQualityAlarms", {
  Name: "LiveStreamQualityMonitoring",
  Description: "Template group for alarms monitoring live stream quality metrics",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LiveStream" }
  ]
});
```

## Use Case: Automated Scaling Alarms

Set up a CloudWatch Alarm Template Group for automated scaling based on CPU utilization.

```ts
const AutoScalingAlarmTemplateGroup = await AWS.MediaLive.CloudWatchAlarmTemplateGroup("AutoScalingAlarms", {
  Name: "AutoScalingAlarms",
  Description: "Alarm template group for auto-scaling based on CPU metrics",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Purpose", Value: "AutoScaling" }
  ],
  adopt: true // Allows adopting existing resources
});
```
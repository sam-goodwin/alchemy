---
title: Archive
description: Learn how to create, update, and manage AWS Events Archives using Alchemy Cloud Control.
---


The Archive resource allows you to manage [AWS Events Archives](https://docs.aws.amazon.com/events/latest/userguide/) for storing event data from Amazon EventBridge. This enables you to retain and analyze events from various sources over time.

## Minimal Example

Create a basic event archive with required properties including the source ARN and a retention period.

```ts
import AWS from "alchemy/aws/control";

const eventArchive = await AWS.Events.Archive("myEventArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:rule/my-rule",
  RetentionDays: 30 // Store events for 30 days
});
```

## Advanced Configuration

Configure an event archive with a specific event pattern and encryption key.

```ts
const advancedEventArchive = await AWS.Events.Archive("advancedEventArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:rule/my-advanced-rule",
  EventPattern: {
    "source": ["aws.ec2"],
    "detail-type": ["AWS API Call via CloudTrail"],
    "detail": {
      "eventSource": ["ec2.amazonaws.com"],
      "eventName": ["RunInstances", "TerminateInstances"]
    }
  },
  KmsKeyIdentifier: "arn:aws:kms:us-west-2:123456789012:key/my-kms-key",
  RetentionDays: 60 // Store events for 60 days
});
```

## Example with Description

Create an event archive with a description for better identification.

```ts
const descriptiveEventArchive = await AWS.Events.Archive("descriptiveEventArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:rule/my-descriptive-rule",
  Description: "This archive holds EC2 event data for compliance purposes.",
  RetentionDays: 90 // Store events for 90 days
});
```

## Example with Custom Archive Name

Define a custom name for the event archive along with the retention period.

```ts
const customNamedEventArchive = await AWS.Events.Archive("customNamedEventArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:rule/my-custom-name-rule",
  ArchiveName: "MyCustomArchiveName",
  RetentionDays: 45 // Store events for 45 days
});
```

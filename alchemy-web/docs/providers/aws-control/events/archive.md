---
title: Managing AWS Events Archives with Alchemy
description: Learn how to create, update, and manage AWS Events Archives using Alchemy Cloud Control.
---

# Archive

The Archive resource lets you manage [AWS Events Archives](https://docs.aws.amazon.com/events/latest/userguide/) for capturing and storing events from various AWS services for later analysis and auditing.

## Minimal Example

Create a basic event archive with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const eventArchive = await AWS.Events.Archive("MyEventArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  Description: "This archive captures all events from the default event bus",
  RetentionDays: 30
});
```

## Advanced Configuration

Configure an event archive with an event pattern and KMS key for encryption.

```ts
const encryptedEventArchive = await AWS.Events.Archive("EncryptedEventArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  EventPattern: {
    "source": ["aws.ec2"],
    "detail-type": ["AWS API Call via CloudTrail"],
    "detail": {
      "eventSource": ["ec2.amazonaws.com"]
    }
  },
  KmsKeyIdentifier: "arn:aws:kms:us-west-2:123456789012:key/abcdefg-1234-5678-90ab-cdef12345678",
  RetentionDays: 60
});
```

## Using an Archive with Event Patterns

Create an event archive specifically for capturing EC2 instance state changes.

```ts
const ec2StateChangeArchive = await AWS.Events.Archive("EC2StateChangeArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  EventPattern: {
    "source": ["aws.ec2"],
    "detail-type": ["AWS API Call via CloudTrail"],
    "detail": {
      "eventName": ["StartInstances", "StopInstances", "TerminateInstances"]
    }
  },
  Description: "Capture EC2 instance state changes for monitoring",
  RetentionDays: 90
});
```

## Adopting an Existing Archive

If an event archive already exists, you can adopt it instead of creating a new one.

```ts
const adoptedEventArchive = await AWS.Events.Archive("AdoptedEventArchive", {
  SourceArn: "arn:aws:events:us-west-2:123456789012:event-bus/default",
  adopt: true // Adopt existing resource if present
});
```
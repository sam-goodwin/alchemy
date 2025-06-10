---
title: EventStream
description: Learn how to create, update, and manage AWS CustomerProfiles EventStreams using Alchemy Cloud Control.
---


The EventStream resource allows you to manage [AWS CustomerProfiles EventStreams](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) for capturing real-time events related to customer profiles.

## Minimal Example

Create a basic EventStream with required properties and a common tag.

```ts
import AWS from "alchemy/aws/control";

const basicEventStream = await AWS.CustomerProfiles.EventStream("basicEventStream", {
  DomainName: "customerDomain",
  EventStreamName: "customerUpdates",
  Uri: "https://example.com/event-stream",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure an EventStream with additional optional properties like adopting an existing resource.

```ts
const advancedEventStream = await AWS.CustomerProfiles.EventStream("advancedEventStream", {
  DomainName: "customerDomain",
  EventStreamName: "customerActivity",
  Uri: "https://example.com/activity-stream",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Department", Value: "Marketing" }
  ],
  adopt: true // Adopt an existing EventStream if it already exists
});
```

## Custom EventStream with Tags

Create an EventStream with multiple tags for better categorization and management.

```ts
const taggedEventStream = await AWS.CustomerProfiles.EventStream("taggedEventStream", {
  DomainName: "customerDomain",
  EventStreamName: "customerFeedback",
  Uri: "https://example.com/feedback-stream",
  Tags: [
    { Key: "Project", Value: "CustomerInsights" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Priority", Value: "High" }
  ]
});
```

## EventStream for Multiple Environments

Manage EventStreams for different environments, ensuring each stream is uniquely identified.

```ts
const devEventStream = await AWS.CustomerProfiles.EventStream("devEventStream", {
  DomainName: "customerDomain",
  EventStreamName: "devCustomerUpdates",
  Uri: "https://dev.example.com/event-stream",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});

const prodEventStream = await AWS.CustomerProfiles.EventStream("prodEventStream", {
  DomainName: "customerDomain",
  EventStreamName: "prodCustomerUpdates",
  Uri: "https://prod.example.com/event-stream",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

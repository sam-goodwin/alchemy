---
title: Segment
description: Learn how to create, update, and manage AWS Evidently Segments using Alchemy Cloud Control.
---


The Segment resource lets you manage [AWS Evidently Segments](https://docs.aws.amazon.com/evidently/latest/userguide/) for targeting specific user groups in your experiments and feature launches.

## Minimal Example

Create a basic segment with a pattern and description.

```ts
import AWS from "alchemy/aws/control";

const userSegment = await AWS.Evidently.Segment("user-segment", {
  Name: "ActiveUsers",
  Pattern: "{ \"type\": \"user\", \"active\": true }",
  Description: "Segment for users who are currently active."
});
```

## Advanced Configuration

Configure a segment with tags for better organization and management.

```ts
const taggedSegment = await AWS.Evidently.Segment("tagged-segment", {
  Name: "VIPUsers",
  Pattern: "{ \"type\": \"user\", \"status\": \"VIP\" }",
  Description: "Segment for VIP users.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Marketing" }
  ]
});
```

## Adopting an Existing Segment

Use the `adopt` property to adopt an existing segment instead of failing if it already exists.

```ts
const existingSegment = await AWS.Evidently.Segment("existing-segment", {
  Name: "ExistingSegmentName",
  Pattern: "{ \"type\": \"user\", \"existing\": true }",
  Description: "This segment is adopted to avoid conflicts.",
  adopt: true
});
```

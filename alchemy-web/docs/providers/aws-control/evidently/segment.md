---
title: Managing AWS Evidently Segments with Alchemy
description: Learn how to create, update, and manage AWS Evidently Segments using Alchemy Cloud Control.
---

# Segment

The Segment resource lets you create and manage [AWS Evidently Segments](https://docs.aws.amazon.com/evidently/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-segment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const segment = await AWS.Evidently.Segment("segment-example", {
  Name: "segment-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A segment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a segment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSegment = await AWS.Evidently.Segment("advanced-segment", {
  Name: "segment-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A segment resource managed by Alchemy",
});
```


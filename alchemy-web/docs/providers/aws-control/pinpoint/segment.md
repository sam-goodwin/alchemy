---
title: Managing AWS Pinpoint Segments with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint Segments using Alchemy Cloud Control.
---

# Segment

The Segment resource lets you create and manage [AWS Pinpoint Segments](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-segment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const segment = await AWS.Pinpoint.Segment("segment-example", {
  ApplicationId: "example-applicationid",
  Name: "segment-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a segment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSegment = await AWS.Pinpoint.Segment("advanced-segment", {
  ApplicationId: "example-applicationid",
  Name: "segment-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


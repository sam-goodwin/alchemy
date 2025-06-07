---
title: Managing AWS S3 MultiRegionAccessPoints with Alchemy
description: Learn how to create, update, and manage AWS S3 MultiRegionAccessPoints using Alchemy Cloud Control.
---

# MultiRegionAccessPoint

The MultiRegionAccessPoint resource lets you create and manage [AWS S3 MultiRegionAccessPoints](https://docs.aws.amazon.com/s3/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-multiregionaccesspoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const multiregionaccesspoint = await AWS.S3.MultiRegionAccessPoint(
  "multiregionaccesspoint-example",
  { Regions: [] }
);
```


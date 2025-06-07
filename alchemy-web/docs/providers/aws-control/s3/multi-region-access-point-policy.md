---
title: Managing AWS S3 MultiRegionAccessPointPolicys with Alchemy
description: Learn how to create, update, and manage AWS S3 MultiRegionAccessPointPolicys using Alchemy Cloud Control.
---

# MultiRegionAccessPointPolicy

The MultiRegionAccessPointPolicy resource lets you create and manage [AWS S3 MultiRegionAccessPointPolicys](https://docs.aws.amazon.com/s3/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-multiregionaccesspointpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const multiregionaccesspointpolicy = await AWS.S3.MultiRegionAccessPointPolicy(
  "multiregionaccesspointpolicy-example",
  { Policy: {}, MrapName: "multiregionaccesspointpolicy-mrap" }
);
```


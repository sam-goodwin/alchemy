---
title: Managing AWS CloudFront StreamingDistributions with Alchemy
description: Learn how to create, update, and manage AWS CloudFront StreamingDistributions using Alchemy Cloud Control.
---

# StreamingDistribution

The StreamingDistribution resource lets you create and manage [AWS CloudFront StreamingDistributions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-streamingdistribution.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const streamingdistribution = await AWS.CloudFront.StreamingDistribution(
  "streamingdistribution-example",
  {
    StreamingDistributionConfig: "example-streamingdistributionconfig",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```


---
title: Managing AWS CloudFront CachePolicys with Alchemy
description: Learn how to create, update, and manage AWS CloudFront CachePolicys using Alchemy Cloud Control.
---

# CachePolicy

The CachePolicy resource lets you create and manage [AWS CloudFront CachePolicys](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-cachepolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cachepolicy = await AWS.CloudFront.CachePolicy("cachepolicy-example", {
  CachePolicyConfig: "example-cachepolicyconfig",
});
```


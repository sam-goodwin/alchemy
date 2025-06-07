---
title: Managing AWS CloudFront ResponseHeadersPolicys with Alchemy
description: Learn how to create, update, and manage AWS CloudFront ResponseHeadersPolicys using Alchemy Cloud Control.
---

# ResponseHeadersPolicy

The ResponseHeadersPolicy resource lets you create and manage [AWS CloudFront ResponseHeadersPolicys](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-responseheaderspolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const responseheaderspolicy = await AWS.CloudFront.ResponseHeadersPolicy(
  "responseheaderspolicy-example",
  { ResponseHeadersPolicyConfig: "example-responseheaderspolicyconfig" }
);
```


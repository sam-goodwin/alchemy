---
title: Managing AWS CloudFront CloudFrontOriginAccessIdentitys with Alchemy
description: Learn how to create, update, and manage AWS CloudFront CloudFrontOriginAccessIdentitys using Alchemy Cloud Control.
---

# CloudFrontOriginAccessIdentity

The CloudFrontOriginAccessIdentity resource lets you create and manage [AWS CloudFront CloudFrontOriginAccessIdentitys](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-cloudfrontoriginaccessidentity.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cloudfrontoriginaccessidentity = await AWS.CloudFront.CloudFrontOriginAccessIdentity(
  "cloudfrontoriginaccessidentity-example",
  { CloudFrontOriginAccessIdentityConfig: "example-cloudfrontoriginaccessidentityconfig" }
);
```


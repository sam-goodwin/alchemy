---
title: Managing AWS CloudFront PublicKeys with Alchemy
description: Learn how to create, update, and manage AWS CloudFront PublicKeys using Alchemy Cloud Control.
---

# PublicKey

The PublicKey resource lets you create and manage [AWS CloudFront PublicKeys](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-publickey.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const publickey = await AWS.CloudFront.PublicKey("publickey-example", {
  PublicKeyConfig: "example-publickeyconfig",
});
```


---
title: Managing AWS CloudFront KeyGroups with Alchemy
description: Learn how to create, update, and manage AWS CloudFront KeyGroups using Alchemy Cloud Control.
---

# KeyGroup

The KeyGroup resource lets you create and manage [AWS CloudFront KeyGroups](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-keygroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const keygroup = await AWS.CloudFront.KeyGroup("keygroup-example", {
  KeyGroupConfig: "example-keygroupconfig",
});
```


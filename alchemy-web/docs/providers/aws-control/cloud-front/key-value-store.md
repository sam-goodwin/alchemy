---
title: Managing AWS CloudFront KeyValueStores with Alchemy
description: Learn how to create, update, and manage AWS CloudFront KeyValueStores using Alchemy Cloud Control.
---

# KeyValueStore

The KeyValueStore resource lets you create and manage [AWS CloudFront KeyValueStores](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-keyvaluestore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const keyvaluestore = await AWS.CloudFront.KeyValueStore("keyvaluestore-example", {
  Name: "keyvaluestore-",
});
```


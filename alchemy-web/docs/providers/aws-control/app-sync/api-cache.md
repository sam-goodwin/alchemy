---
title: Managing AWS AppSync ApiCaches with Alchemy
description: Learn how to create, update, and manage AWS AppSync ApiCaches using Alchemy Cloud Control.
---

# ApiCache

The ApiCache resource lets you create and manage [AWS AppSync ApiCaches](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-apicache.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apicache = await AWS.AppSync.ApiCache("apicache-example", {
  Type: "example-type",
  ApiId: "example-apiid",
  ApiCachingBehavior: "example-apicachingbehavior",
  Ttl: 1,
});
```


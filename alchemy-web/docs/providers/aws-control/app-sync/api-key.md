---
title: Managing AWS AppSync ApiKeys with Alchemy
description: Learn how to create, update, and manage AWS AppSync ApiKeys using Alchemy Cloud Control.
---

# ApiKey

The ApiKey resource lets you create and manage [AWS AppSync ApiKeys](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-apikey.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apikey = await AWS.AppSync.ApiKey("apikey-example", {
  ApiId: "example-apiid",
  Description: "A apikey resource managed by Alchemy",
});
```

## Advanced Configuration

Create a apikey with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApiKey = await AWS.AppSync.ApiKey("advanced-apikey", {
  ApiId: "example-apiid",
  Description: "A apikey resource managed by Alchemy",
});
```


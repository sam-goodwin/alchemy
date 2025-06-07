---
title: Managing AWS ApiGateway Resources with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway Resources using Alchemy Cloud Control.
---

# Resource

The Resource resource lets you create and manage [AWS ApiGateway Resources](https://docs.aws.amazon.com/apigateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-resource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resource = await AWS.ApiGateway.Resource("resource-example", {
  ParentId: "example-parentid",
  PathPart: "example-pathpart",
  RestApiId: "example-restapiid",
});
```


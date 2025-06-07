---
title: Managing AWS ApiGateway DocumentationParts with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway DocumentationParts using Alchemy Cloud Control.
---

# DocumentationPart

The DocumentationPart resource lets you create and manage [AWS ApiGateway DocumentationParts](https://docs.aws.amazon.com/apigateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-documentationpart.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const documentationpart = await AWS.ApiGateway.DocumentationPart("documentationpart-example", {
  RestApiId: "example-restapiid",
  Properties: "example-properties",
  Location: "example-location",
});
```


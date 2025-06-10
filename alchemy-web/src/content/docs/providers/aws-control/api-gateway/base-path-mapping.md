---
title: BasePathMapping
description: Learn how to create, update, and manage AWS ApiGateway BasePathMappings using Alchemy Cloud Control.
---


The BasePathMapping resource lets you manage [AWS ApiGateway BasePathMappings](https://docs.aws.amazon.com/apigateway/latest/userguide/) to route API requests to specific stages of your API.

## Minimal Example

Create a basic BasePathMapping with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMapping = await AWS.ApiGateway.BasePathMapping("basicMapping", {
  DomainName: "api.example.com",
  RestApiId: "1234567890",
  Stage: "prod"
});
```

## Advanced Configuration

Configure a BasePathMapping with additional options such as a custom BasePath and enabling resource adoption.

```ts
const advancedMapping = await AWS.ApiGateway.BasePathMapping("advancedMapping", {
  DomainName: "api.example.com",
  RestApiId: "1234567890",
  Stage: "dev",
  BasePath: "v1",
  adopt: true // Allows adoption of existing resource
});
```

## Specific Use Case: Custom Base Path

Create a BasePathMapping with a specific custom BasePath to differentiate between API versions.

```ts
const versionedMapping = await AWS.ApiGateway.BasePathMapping("versionedMapping", {
  DomainName: "api.example.com",
  RestApiId: "0987654321",
  Stage: "beta",
  BasePath: "v2"
});
```

## Specific Use Case: Multiple Mappings

Set up multiple BasePathMappings for different stages of the same API using a loop.

```ts
const stages = ["prod", "staging", "dev"];
for (const stage of stages) {
  await AWS.ApiGateway.BasePathMapping(`mapping-${stage}`, {
    DomainName: "api.example.com",
    RestApiId: "1234567890",
    Stage: stage,
    BasePath: `v1/${stage}`
  });
}
```

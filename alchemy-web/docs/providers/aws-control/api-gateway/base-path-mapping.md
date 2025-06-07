---
title: Managing AWS ApiGateway BasePathMappings with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway BasePathMappings using Alchemy Cloud Control.
---

# BasePathMapping

The BasePathMapping resource lets you manage [AWS ApiGateway BasePathMappings](https://docs.aws.amazon.com/apigateway/latest/userguide/) for mapping a custom domain name to a specific API and stage.

## Minimal Example

Create a basic BasePathMapping with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const SimpleBasePathMapping = await AWS.ApiGateway.BasePathMapping("SimpleBasePathMapping", {
  DomainName: "api.example.com",
  RestApiId: "abcdefghij",
  Stage: "prod",
  BasePath: "v1"
});
```

## Advanced Configuration

Configure a BasePathMapping with additional properties such as ID and adoption of an existing resource.

```ts
const AdvancedBasePathMapping = await AWS.ApiGateway.BasePathMapping("AdvancedBasePathMapping", {
  DomainName: "api.example.com",
  RestApiId: "abcdefghij",
  Stage: "prod",
  BasePath: "v1",
  Id: "existing-mapping-id",
  adopt: true
});
```

## Using Different Base Paths

Create multiple BasePathMappings for different versions of an API.

```ts
const V2BasePathMapping = await AWS.ApiGateway.BasePathMapping("V2BasePathMapping", {
  DomainName: "api.example.com",
  RestApiId: "abcdefghij",
  Stage: "prod",
  BasePath: "v2"
});

const V3BasePathMapping = await AWS.ApiGateway.BasePathMapping("V3BasePathMapping", {
  DomainName: "api.example.com",
  RestApiId: "abcdefghij",
  Stage: "prod",
  BasePath: "v3"
});
```

## Mapping to a Staging Environment

Map a BasePath to a staging environment for testing purposes.

```ts
const StagingBasePathMapping = await AWS.ApiGateway.BasePathMapping("StagingBasePathMapping", {
  DomainName: "staging.api.example.com",
  RestApiId: "abcdefghij",
  Stage: "staging",
  BasePath: "v1"
});
```
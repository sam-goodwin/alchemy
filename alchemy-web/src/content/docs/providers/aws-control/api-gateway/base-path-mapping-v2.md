---
title: BasePathMappingV2
description: Learn how to create, update, and manage AWS ApiGateway BasePathMappingV2s using Alchemy Cloud Control.
---


The BasePathMappingV2 resource allows you to manage [AWS ApiGateway BasePathMappingV2s](https://docs.aws.amazon.com/apigateway/latest/userguide/) that define the mapping between a custom domain name and a specific API Gateway REST API.

## Minimal Example

Create a basic BasePathMappingV2 linking a domain name to an API Gateway REST API:

```ts
import AWS from "alchemy/aws/control";

const basePathMapping = await AWS.ApiGateway.BasePathMappingV2("basicMapping", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/example.com",
  RestApiId: "abcdefghij",
  Stage: "prod", // Optional stage
  BasePath: "v1" // Optional base path
});
```

## Advanced Configuration

Configure a BasePathMappingV2 for an API with an optional base path and adopt existing resources:

```ts
const advancedBasePathMapping = await AWS.ApiGateway.BasePathMappingV2("advancedMapping", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/api.example.com",
  RestApiId: "klmnopqrst",
  Stage: "dev", // Optional stage
  BasePath: "v2", // Optional base path
  adopt: true // Adopt existing resource if it exists
});
```

## Custom Base Path Example

Create a BasePathMappingV2 that uses a custom base path to route requests effectively:

```ts
const customBasePathMapping = await AWS.ApiGateway.BasePathMappingV2("customMapping", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/api.example.com",
  RestApiId: "uvwxyz1234",
  BasePath: "api/v1", // Custom base path for API versioning
  Stage: "prod" // Specify the production stage
});
```

## Using a Stage Without a Base Path

Set up a BasePathMappingV2 that uses the default base path and a specified stage only:

```ts
const defaultBasePathMapping = await AWS.ApiGateway.BasePathMappingV2("defaultMapping", {
  DomainNameArn: "arn:aws:apigateway:us-west-2::/domainnames/example.com",
  RestApiId: "mnopqrstuv",
  Stage: "test" // Stage without a custom base path
});
```

---
title: ApiMapping
description: Learn how to create, update, and manage AWS ApiGatewayV2 ApiMappings using Alchemy Cloud Control.
---


The ApiMapping resource allows you to create and manage API mappings for your AWS ApiGatewayV2 instances. API mappings define how your API is exposed on a custom domain name. For more information, visit the [AWS ApiGatewayV2 ApiMappings](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) documentation.

## Minimal Example

Create a basic API mapping with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicApiMapping = await AWS.ApiGatewayV2.ApiMapping("basicApiMapping", {
  DomainName: "api.example.com",
  Stage: "production",
  ApiId: "1234567890",
  ApiMappingKey: "/v1" // Optional
});
```

## Advanced Configuration

Configure an API mapping with additional options, such as a specific mapping key.

```ts
const advancedApiMapping = await AWS.ApiGatewayV2.ApiMapping("advancedApiMapping", {
  DomainName: "api.example.com",
  Stage: "dev",
  ApiId: "0987654321",
  ApiMappingKey: "v2", // Optional, defines the path for the mapping
  adopt: true // Optional, if true, adopts existing resource if it already exists
});
```

## Use Case: Multiple Mappings

Create multiple API mappings for different stages of your application.

```ts
const productionApiMapping = await AWS.ApiGatewayV2.ApiMapping("productionApiMapping", {
  DomainName: "api.example.com",
  Stage: "production",
  ApiId: "1234567890",
  ApiMappingKey: "/prod" // Maps the production stage
});

const stagingApiMapping = await AWS.ApiGatewayV2.ApiMapping("stagingApiMapping", {
  DomainName: "api.example.com",
  Stage: "staging",
  ApiId: "1234567890",
  ApiMappingKey: "/staging" // Maps the staging stage
});
```

## Use Case: Custom Domain Name

Create an API mapping for a custom domain with a specific API ID and stage.

```ts
const customDomainApiMapping = await AWS.ApiGatewayV2.ApiMapping("customDomainApiMapping", {
  DomainName: "custom.api.example.com",
  Stage: "beta",
  ApiId: "1122334455",
  ApiMappingKey: "beta" // Custom path for the beta stage
});
```

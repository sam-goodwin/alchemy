---
title: Managing AWS ApiGateway BasePathMappingV2s with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway BasePathMappingV2s using Alchemy Cloud Control.
---

# BasePathMappingV2

The BasePathMappingV2 resource allows you to define a base path mapping for an API Gateway, enabling you to route requests to your API correctly. For more information, visit the [AWS ApiGateway BasePathMappingV2s](https://docs.aws.amazon.com/apigateway/latest/userguide/) documentation.

## Minimal Example

This example demonstrates how to create a basic base path mapping for an API Gateway with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicBasePathMapping = await AWS.ApiGateway.BasePathMappingV2("BasicMapping", {
  DomainNameArn: "arn:aws:apigateway:us-east-1::/domainnames/example.com",
  RestApiId: "abcd1234efgh5678",
  Stage: "prod",
  BasePath: "v1"
});
```

## Advanced Configuration

In this example, we will configure a base path mapping with additional options including adopting an existing resource.

```ts
const AdvancedBasePathMapping = await AWS.ApiGateway.BasePathMappingV2("AdvancedMapping", {
  DomainNameArn: "arn:aws:apigateway:us-east-1::/domainnames/api.example.com",
  RestApiId: "ijkl9012mnop3456",
  Stage: "dev",
  BasePath: "v2",
  adopt: true // Adopt existing resource if it exists
});
```

## Additional Use Case: Custom Base Path

This example shows how to set up a base path mapping with a custom base path for a specific API version.

```ts
const CustomBasePathMapping = await AWS.ApiGateway.BasePathMappingV2("CustomMapping", {
  DomainNameArn: "arn:aws:apigateway:us-east-1::/domainnames/custom.example.com",
  RestApiId: "qrst7890uvwx1234",
  Stage: "staging",
  BasePath: "api/v2"
});
```
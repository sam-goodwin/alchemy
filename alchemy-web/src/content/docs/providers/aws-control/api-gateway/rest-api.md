---
title: RestApi
description: Learn how to create, update, and manage AWS ApiGateway RestApis using Alchemy Cloud Control.
---


The RestApi resource allows you to create and manage [AWS ApiGateway RestApis](https://docs.aws.amazon.com/apigateway/latest/userguide/) for building and deploying APIs for your applications.

## Minimal Example

This example demonstrates how to create a basic RestApi with essential properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicApi = await AWS.ApiGateway.RestApi("basicApi", {
  name: "BasicAPI",
  description: "This is a basic API for demonstration purposes.",
  binaryMediaTypes: ["application/octet-stream"],
  tags: [
    { key: "Project", value: "Demo" }
  ]
});
```

## Advanced Configuration

Here is an example of creating a RestApi with advanced configuration options, including a policy and endpoint configuration.

```ts
const advancedApi = await AWS.ApiGateway.RestApi("advancedApi", {
  name: "AdvancedAPI",
  description: "This API includes advanced settings.",
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "execute-api:Invoke",
        Resource: "arn:aws:execute-api:us-east-1:123456789012:advancedApi/*"
      }
    ]
  },
  endpointConfiguration: {
    types: ["REGIONAL"],
    vpcEndpointIds: ["vpce-12345678"]
  },
  minimumCompressionSize: 1024,
  tags: [
    { key: "Environment", value: "Production" }
  ]
});
```

## Importing an Existing API

This example demonstrates how to clone an existing RestApi and adopt it into your management.

```ts
const clonedApi = await AWS.ApiGateway.RestApi("clonedApi", {
  cloneFrom: "arn:aws:execute-api:us-east-1:123456789012:existingApi/*",
  adopt: true
});
```

## Disabling Execute API Endpoint

In this example, we create a RestApi with the execute API endpoint disabled, useful for internal APIs.

```ts
const internalApi = await AWS.ApiGateway.RestApi("internalApi", {
  name: "InternalAPI",
  description: "This API is internal and does not expose an endpoint.",
  disableExecuteApiEndpoint: true,
  tags: [
    { key: "Access", value: "Internal" }
  ]
});
```

## Configuration with S3 Body Location

This example shows how to create a RestApi that specifies an S3 location for the API definition body.

```ts
const s3BodyApi = await AWS.ApiGateway.RestApi("s3BodyApi", {
  name: "S3BodyAPI",
  bodyS3Location: {
    bucket: "my-api-definitions",
    key: "api-definition.json",
    version: "latest"
  },
  tags: [
    { key: "Source", value: "S3" }
  ]
});
```

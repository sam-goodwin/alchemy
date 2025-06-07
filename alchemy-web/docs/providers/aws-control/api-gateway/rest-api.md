---
title: Managing AWS ApiGateway RestApis with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway RestApis using Alchemy Cloud Control.
---

# RestApi

The RestApi resource lets you manage [AWS ApiGateway RestApis](https://docs.aws.amazon.com/apigateway/latest/userguide/) for creating, deploying, and managing secure APIs at scale.

## Minimal Example

Create a basic RestApi with a name and description, along with a policy for access control.

```ts
import AWS from "alchemy/aws/control";

const basicRestApi = await AWS.ApiGateway.RestApi("BasicRestApi", {
  Name: "MyBasicApi",
  Description: "This is a basic API for demonstration purposes.",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "execute-api:Invoke",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure a RestApi with more advanced settings including binary media types and a minimum compression size.

```ts
const advancedRestApi = await AWS.ApiGateway.RestApi("AdvancedRestApi", {
  Name: "MyAdvancedApi",
  Description: "This API supports binary data and compression.",
  MinimumCompressionSize: 1024, // Compress responses larger than 1KB
  BinaryMediaTypes: ["image/png", "application/octet-stream"],
  EndpointConfiguration: {
    Types: ["REGIONAL"] // Use REGIONAL endpoint type
  },
  FailOnWarnings: true
});
```

## Clone from Existing Api

Demonstrate how to clone an existing RestApi configuration.

```ts
const clonedRestApi = await AWS.ApiGateway.RestApi("ClonedRestApi", {
  CloneFrom: "arn:aws:apigateway:us-east-1::/restapis/abcdefghij", // Replace with existing API ARN
  Name: "MyClonedApi",
  Description: "Cloned API from an existing configuration."
});
```

## Disable Execute API Endpoint

Create a RestApi with the execute API endpoint disabled for enhanced security.

```ts
const secureRestApi = await AWS.ApiGateway.RestApi("SecureRestApi", {
  Name: "MySecureApi",
  Description: "This API has the execute API endpoint disabled.",
  DisableExecuteApiEndpoint: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Compliance", Value: "PCI-DSS" }
  ]
});
```
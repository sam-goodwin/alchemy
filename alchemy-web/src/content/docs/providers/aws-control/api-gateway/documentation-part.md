---
title: DocumentationPart
description: Learn how to create, update, and manage AWS ApiGateway DocumentationParts using Alchemy Cloud Control.
---


The DocumentationPart resource allows you to manage [AWS ApiGateway DocumentationParts](https://docs.aws.amazon.com/apigateway/latest/userguide/) which are used to add documentation to your API Gateway APIs.

## Minimal Example

Create a basic DocumentationPart for an API Gateway with essential properties.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayDocumentationPart = await AWS.ApiGateway.DocumentationPart("basicDocumentationPart", {
  RestApiId: "myApiGatewayId",
  Properties: "This is the documentation for my API.",
  Location: {
    Type: "API",
    Path: "/resource"
  },
  adopt: true // Optional: adopts existing resource if present
});
```

## Advanced Configuration

Configure a DocumentationPart with more detailed location specifications and properties.

```ts
const advancedDocumentationPart = await AWS.ApiGateway.DocumentationPart("advancedDocumentationPart", {
  RestApiId: "myAdvancedApiGatewayId",
  Properties: "Detailed documentation for my advanced API endpoint.",
  Location: {
    Type: "RESOURCE", // Specify the type of the documentation part
    Path: "/resource/{id}" // Path for a specific resource
  },
  adopt: false // Optional: do not adopt existing resource
});
```

## Adding Documentation to Methods

Demonstrate how to add documentation to a specific method of a resource.

```ts
const methodDocumentationPart = await AWS.ApiGateway.DocumentationPart("methodDocumentationPart", {
  RestApiId: "myApiGatewayId",
  Properties: "This documentation describes the GET method for the resource.",
  Location: {
    Type: "METHOD",
    Path: "/resource/{id}",
    Method: "GET"
  }
});
```

## Updating Documentation Properties

Show how to update an existing DocumentationPart's properties.

```ts
const updatedDocumentationPart = await AWS.ApiGateway.DocumentationPart("updatedDocumentationPart", {
  RestApiId: "myApiGatewayId",
  Properties: "Updated documentation for the existing resource.",
  Location: {
    Type: "API",
    Path: "/resource"
  },
  adopt: true // Optional: adopt if already exists
});
```

---
title: DocumentationVersion
description: Learn how to create, update, and manage AWS ApiGateway DocumentationVersions using Alchemy Cloud Control.
---


The DocumentationVersion resource allows you to manage [AWS ApiGateway DocumentationVersions](https://docs.aws.amazon.com/apigateway/latest/userguide/) for your APIs, enabling you to document various stages of your API development.

## Minimal Example

Create a basic DocumentationVersion for an API.

```ts
import AWS from "alchemy/aws/control";

const documentationVersion = await AWS.ApiGateway.DocumentationVersion("apiDocumentationVersion", {
  DocumentationVersion: "v1.0",
  RestApiId: "1234567890",
  Description: "Initial version of the API documentation"
});
```

## Advanced Configuration

Create a DocumentationVersion with an optional description and adopt existing resources.

```ts
const advancedDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("advancedApiDocumentationVersion", {
  DocumentationVersion: "v2.0",
  RestApiId: "0987654321",
  Description: "Updated API documentation with additional endpoints",
  adopt: true
});
```

## Versioning for Staging

Manage different versions of the API documentation for staging environments.

```ts
const stagingDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("stagingApiDocumentationVersion", {
  DocumentationVersion: "staging-v1.0",
  RestApiId: "1122334455",
  Description: "Staging version of the API documentation"
});
```

## Versioning for Production

Create a documentation version specifically for the production environment.

```ts
const productionDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("productionApiDocumentationVersion", {
  DocumentationVersion: "prod-v1.0",
  RestApiId: "5566778899",
  Description: "Production version of the API documentation",
  adopt: false // Do not adopt existing resources
});
```

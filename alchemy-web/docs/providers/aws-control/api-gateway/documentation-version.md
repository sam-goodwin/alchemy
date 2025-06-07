---
title: Managing AWS ApiGateway DocumentationVersions with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway DocumentationVersions using Alchemy Cloud Control.
---

# DocumentationVersion

The DocumentationVersion resource allows you to manage [AWS ApiGateway DocumentationVersions](https://docs.aws.amazon.com/apigateway/latest/userguide/) which are used to represent a specific version of the API documentation.

## Minimal Example

Create a basic DocumentationVersion with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("BasicDocumentationVersion", {
  DocumentationVersion: "v1.0",
  RestApiId: "1234567890",
  Description: "Initial version of the API documentation"
});
```

## Advanced Configuration

Configure a DocumentationVersion with additional properties like adopting an existing resource.

```ts
const AdvancedDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("AdvancedDocumentationVersion", {
  DocumentationVersion: "v2.0",
  RestApiId: "0987654321",
  Description: "Updated version of the API documentation",
  adopt: true
});
```

## Multiple Versions Management

Create multiple DocumentationVersions for different stages of the API.

```ts
const AlphaDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("AlphaDocumentationVersion", {
  DocumentationVersion: "v0.1",
  RestApiId: "1234567890",
  Description: "Alpha release of the API documentation"
});

const BetaDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("BetaDocumentationVersion", {
  DocumentationVersion: "v0.2",
  RestApiId: "1234567890",
  Description: "Beta release of the API documentation"
});
```

## Version Rollback

Create a DocumentationVersion that allows for easy rollback to a previous state.

```ts
const RollbackDocumentationVersion = await AWS.ApiGateway.DocumentationVersion("RollbackDocumentationVersion", {
  DocumentationVersion: "v0.1",
  RestApiId: "1234567890",
  Description: "Rolling back to the previous version of API documentation"
});
```
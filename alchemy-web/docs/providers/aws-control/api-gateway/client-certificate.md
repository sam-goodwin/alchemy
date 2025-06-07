---
title: Managing AWS ApiGateway ClientCertificates with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway ClientCertificates using Alchemy Cloud Control.
---

# ClientCertificate

The ClientCertificate resource allows you to manage client certificates for AWS API Gateway, providing secure communication between clients and your API. For more detailed information, refer to the [AWS ApiGateway ClientCertificates](https://docs.aws.amazon.com/apigateway/latest/userguide/) documentation.

## Minimal Example

This example demonstrates creating a basic client certificate with a description.

```ts
import AWS from "alchemy/aws/control";

const BasicClientCertificate = await AWS.ApiGateway.ClientCertificate("BasicClientCert", {
  Description: "Basic client certificate for API Gateway",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "API" }
  ]
});
```

## Advanced Configuration

This example shows how to create a client certificate with additional tagging for better resource management.

```ts
const AdvancedClientCertificate = await AWS.ApiGateway.ClientCertificate("AdvancedClientCert", {
  Description: "Advanced client certificate with extra tags",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Project", Value: "APIProject" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Resource Adoption Example

In situations where you may want to adopt an existing client certificate without creating a new one, use the following example.

```ts
const AdoptedClientCertificate = await AWS.ApiGateway.ClientCertificate("AdoptedClientCert", {
  Description: "This resource adopts an existing client certificate",
  adopt: true
});
```
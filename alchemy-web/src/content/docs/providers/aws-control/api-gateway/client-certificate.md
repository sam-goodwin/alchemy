---
title: ClientCertificate
description: Learn how to create, update, and manage AWS ApiGateway ClientCertificates using Alchemy Cloud Control.
---


The ClientCertificate resource allows you to manage [AWS ApiGateway ClientCertificates](https://docs.aws.amazon.com/apigateway/latest/userguide/) which are used to enable mutual TLS authentication for your APIs.

## Minimal Example

Create a basic client certificate with a description:

```ts
import AWS from "alchemy/aws/control";

const clientCertificate = await AWS.ApiGateway.ClientCertificate("basicClientCert", {
  description: "Basic client certificate for mutual TLS",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Service", value: "API" }
  ]
});
```

## Advanced Configuration

Create a client certificate with additional properties such as tags:

```ts
const advancedClientCertificate = await AWS.ApiGateway.ClientCertificate("advancedClientCert", {
  description: "Advanced client certificate with detailed tags",
  tags: [
    { key: "Owner", value: "DevTeam" },
    { key: "Project", value: "API-Project" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Updating an Existing Client Certificate

Update the description of an existing client certificate:

```ts
const updatedClientCertificate = await AWS.ApiGateway.ClientCertificate("existingClientCert", {
  description: "Updated client certificate description for enhanced security",
  tags: [
    { key: "Updated", value: "true" }
  ],
  adopt: true // Adopt the existing resource
});
```

## Listing Client Certificates

Retrieve information about existing client certificates:

```ts
const clientCertificatesList = await AWS.ApiGateway.ClientCertificate("listClientCerts", {
  // This example assumes a function that lists existing certificates
  // Note: Actual listing may involve a different approach in practice
});
```

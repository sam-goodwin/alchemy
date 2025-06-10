---
title: HttpNamespace
description: Learn how to create, update, and manage AWS ServiceDiscovery HttpNamespaces using Alchemy Cloud Control.
---


The HttpNamespace resource lets you manage [AWS ServiceDiscovery HttpNamespaces](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic HttpNamespace with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const httpNamespace = await AWS.ServiceDiscovery.HttpNamespace("myHttpNamespace", {
  name: "my-http-namespace",
  description: "This namespace is used for HTTP service discovery."
});
```

## Advanced Configuration

Configure an HttpNamespace with tags for resource management.

```ts
const taggedHttpNamespace = await AWS.ServiceDiscovery.HttpNamespace("taggedHttpNamespace", {
  name: "tagged-http-namespace",
  description: "This namespace is used for HTTP service discovery with tags.",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Department", value: "Engineering" }
  ]
});
```

## Adoption of Existing Resources

Create an HttpNamespace and adopt an existing resource if it already exists.

```ts
const existingHttpNamespace = await AWS.ServiceDiscovery.HttpNamespace("existingHttpNamespace", {
  name: "existing-http-namespace",
  adopt: true // Adopt the existing namespace if it already exists
});
```

## Updating an HttpNamespace

Update an existing HttpNamespace by modifying its description.

```ts
const updatedHttpNamespace = await AWS.ServiceDiscovery.HttpNamespace("updatedHttpNamespace", {
  name: "my-http-namespace",
  description: "Updated description for the HTTP namespace."
});
```

---
title: PrivateDnsNamespace
description: Learn how to create, update, and manage AWS ServiceDiscovery PrivateDnsNamespaces using Alchemy Cloud Control.
---


The PrivateDnsNamespace resource lets you manage [AWS ServiceDiscovery PrivateDnsNamespaces](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) for defining private DNS namespaces within your VPC.

## Minimal Example

Create a basic PrivateDnsNamespace with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const privateDnsNamespace = await AWS.ServiceDiscovery.PrivateDnsNamespace("myPrivateDnsNamespace", {
  name: "internal.example.com",
  vpc: "vpc-12345678",
  description: "This is my internal DNS namespace for service discovery.",
  tags: [
    { key: "Environment", value: "Development" },
    { key: "Project", value: "ServiceDiscoveryDemo" }
  ]
});
```

## Advanced Configuration

Configure a PrivateDnsNamespace with additional properties, such as tags and properties for enhanced functionality.

```ts
const advancedPrivateDnsNamespace = await AWS.ServiceDiscovery.PrivateDnsNamespace("advancedPrivateDnsNamespace", {
  name: "prod.internal.example.com",
  vpc: "vpc-87654321",
  description: "Production DNS namespace for internal services.",
  properties: {
    // Add any specific properties as necessary
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "ServiceDiscovery" }
  ]
});
```

## Adoption of Existing Resource

Use the adopt option to create a PrivateDnsNamespace that adopts an existing resource if it already exists.

```ts
const adoptedPrivateDnsNamespace = await AWS.ServiceDiscovery.PrivateDnsNamespace("adoptedPrivateDnsNamespace", {
  name: "existing.internal.example.com",
  vpc: "vpc-12345678",
  description: "Adopting an existing DNS namespace.",
  adopt: true // This will adopt the existing resource if it exists
});
```

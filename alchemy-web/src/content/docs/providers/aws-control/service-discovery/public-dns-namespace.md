---
title: PublicDnsNamespace
description: Learn how to create, update, and manage AWS ServiceDiscovery PublicDnsNamespaces using Alchemy Cloud Control.
---


The PublicDnsNamespace resource allows you to create and manage public DNS namespaces in AWS Service Discovery. This enables you to register services and manage DNS records for those services. For more information, visit the [AWS ServiceDiscovery PublicDnsNamespaces documentation](https://docs.aws.amazon.com/servicediscovery/latest/userguide/).

## Minimal Example

Create a basic Public DNS Namespace with a name and description.

```ts
import AWS from "alchemy/aws/control";

const publicDnsNamespace = await AWS.ServiceDiscovery.PublicDnsNamespace("myPublicDnsNamespace", {
  name: "my-public-namespace",
  description: "A public DNS namespace for my services",
  tags: [
    { key: "Environment", value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a Public DNS Namespace with additional properties and tags.

```ts
const advancedPublicDnsNamespace = await AWS.ServiceDiscovery.PublicDnsNamespace("advancedPublicDnsNamespace", {
  name: "advanced-public-namespace",
  description: "An advanced public DNS namespace for services",
  properties: {
    dnsProperties: {
      dnsRecords: [
        {
          type: "A",
          ttl: 300
        },
        {
          type: "CNAME",
          ttl: 300
        }
      ]
    }
  },
  tags: [
    { key: "Project", value: "ServiceDiscovery" },
    { key: "Owner", value: "DevTeam" }
  ]
});
```

## Using Existing Resources

Adopt an existing Public DNS Namespace instead of failing if it already exists.

```ts
const adoptedPublicDnsNamespace = await AWS.ServiceDiscovery.PublicDnsNamespace("adoptedPublicDnsNamespace", {
  name: "existing-public-namespace",
  adopt: true // This will adopt the existing resource if it exists
});
```

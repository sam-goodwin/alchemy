---
title: Managing AWS ServiceDiscovery PublicDnsNamespaces with Alchemy
description: Learn how to create, update, and manage AWS ServiceDiscovery PublicDnsNamespaces using Alchemy Cloud Control.
---

# PublicDnsNamespace

The PublicDnsNamespace resource allows you to manage a [Public DNS namespace](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) in AWS Service Discovery, which can be used to manage the DNS records for your services.

## Minimal Example

Create a basic Public DNS namespace with a name and description.

```ts
import AWS from "alchemy/aws/control";

const basicNamespace = await AWS.ServiceDiscovery.PublicDnsNamespace("basicNamespace", {
  Name: "example.com",
  Description: "A public DNS namespace for example.com",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a Public DNS namespace with additional properties such as tags for better resource management.

```ts
const advancedNamespace = await AWS.ServiceDiscovery.PublicDnsNamespace("advancedNamespace", {
  Name: "advanced.example.com",
  Description: "An advanced public DNS namespace for example.com",
  Properties: {
    // Additional properties can be specified here as per requirements
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "ServiceDiscovery" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing Public DNS namespace instead of creating a new one, you can specify the adopt parameter.

```ts
const adoptNamespace = await AWS.ServiceDiscovery.PublicDnsNamespace("adoptNamespace", {
  Name: "existing.example.com",
  Description: "Adopting an existing Public DNS namespace",
  adopt: true
});
```
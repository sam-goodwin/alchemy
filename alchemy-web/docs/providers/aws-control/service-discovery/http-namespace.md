---
title: Managing AWS ServiceDiscovery HttpNamespaces with Alchemy
description: Learn how to create, update, and manage AWS ServiceDiscovery HttpNamespaces using Alchemy Cloud Control.
---

# HttpNamespace

The HttpNamespace resource allows you to create and manage HTTP namespaces in AWS Service Discovery, enabling service discovery for HTTP services. For more information, refer to the [AWS ServiceDiscovery HttpNamespaces documentation](https://docs.aws.amazon.com/servicediscovery/latest/userguide/).

## Minimal Example

Create a basic HTTP namespace with a name and description.

```ts
import AWS from "alchemy/aws/control";

const basicHttpNamespace = await AWS.ServiceDiscovery.HttpNamespace("BasicHttpNamespace", {
  Name: "example-http-namespace",
  Description: "This namespace is used for HTTP services.",
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure an HTTP namespace with additional tags for better organization.

```ts
const advancedHttpNamespace = await AWS.ServiceDiscovery.HttpNamespace("AdvancedHttpNamespace", {
  Name: "advanced-http-namespace",
  Description: "This namespace is used for advanced HTTP services.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "ServiceDiscovery" }
  ],
  adopt: true // Adopt an existing resource if it exists
});
```

## Using Existing Resources

Set up an HTTP namespace that adopts an existing resource if one is found.

```ts
const existingHttpNamespace = await AWS.ServiceDiscovery.HttpNamespace("ExistingHttpNamespace", {
  Name: "existing-http-namespace",
  Description: "This namespace adopts an existing HTTP namespace.",
  adopt: true
});
```
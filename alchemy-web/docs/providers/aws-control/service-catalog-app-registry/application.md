---
title: Managing AWS ServiceCatalogAppRegistry Applications with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry Applications using Alchemy Cloud Control.
---

# Application

The Application resource allows you to manage [AWS ServiceCatalogAppRegistry Applications](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/) which are used to register and manage applications in AWS Service Catalog.

## Minimal Example

Create a basic application with a name and description.

```ts
import AWS from "alchemy/aws/control";

const BasicApplication = await AWS.ServiceCatalogAppRegistry.Application("BasicApp", {
  Name: "MyWebApplication",
  Description: "A web application hosted on AWS.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure an application with additional properties, such as tags for better resource management.

```ts
const AdvancedApplication = await AWS.ServiceCatalogAppRegistry.Application("AdvancedApp", {
  Name: "MyAdvancedWebApplication",
  Description: "A more complex web application with additional configurations.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevOps" },
    { Key: "Version", Value: "1.0.0" }
  ],
  adopt: true // Adopt the resource if it already exists
});
```

## Application with No Description

Create an application without a description, showcasing the optional nature of the property.

```ts
const NoDescriptionApplication = await AWS.ServiceCatalogAppRegistry.Application("NoDescApp", {
  Name: "MySimpleApplication",
  Tags: [
    { Key: "Environment", Value: "Testing" }
  ]
});
```
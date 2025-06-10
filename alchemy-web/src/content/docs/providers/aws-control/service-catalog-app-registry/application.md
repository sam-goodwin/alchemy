---
title: Application
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS ServiceCatalogAppRegistry Applications](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/) and their associated configurations.

## Minimal Example

Create a basic application with a name and description:

```ts
import AWS from "alchemy/aws/control";

const basicApplication = await AWS.ServiceCatalogAppRegistry.Application("basicApp", {
  name: "BasicApplication",
  description: "This is a basic application for demonstration purposes."
});
```

## Advanced Configuration

Configure an application with tags and enable resource adoption:

```ts
const advancedApplication = await AWS.ServiceCatalogAppRegistry.Application("advancedApp", {
  name: "AdvancedApplication",
  description: "An advanced application with tags.",
  tags: {
    Environment: "Development",
    Team: "Engineering"
  },
  adopt: true // Allow adoption of existing resources
});
```

## Example with Additional Tags

Create an application that includes additional metadata through tags:

```ts
const taggedApplication = await AWS.ServiceCatalogAppRegistry.Application("taggedApp", {
  name: "TaggedApplication",
  description: "An application with multiple tags for tracking.",
  tags: {
    Owner: "DevOps",
    Project: "Migration",
    Version: "1.0"
  }
});
```

## Adoption of Existing Resources

Create an application that adopts an existing resource without failing:

```ts
const adoptExistingApp = await AWS.ServiceCatalogAppRegistry.Application("adoptExistingApp", {
  name: "AdoptExistingApplication",
  description: "This application adopts an existing resource.",
  adopt: true
});
```

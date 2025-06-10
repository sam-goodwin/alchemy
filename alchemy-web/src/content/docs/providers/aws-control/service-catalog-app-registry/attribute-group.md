---
title: AttributeGroup
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry AttributeGroups using Alchemy Cloud Control.
---


The AttributeGroup resource lets you manage [AWS ServiceCatalogAppRegistry AttributeGroups](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/) which are used to group application attributes in AWS Service Catalog App Registry.

## Minimal Example

Create a basic AttributeGroup with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicAttributeGroup = await AWS.ServiceCatalogAppRegistry.AttributeGroup("basicAttributeGroup", {
  name: "MyApplicationAttributes",
  description: "This group contains attributes for my application.",
  attributes: {
    Environment: "Production",
    Owner: "DevTeam",
    Version: "1.0.0"
  }
});
```

## Advanced Configuration

Configure an AttributeGroup with tags for better resource management.

```ts
const advancedAttributeGroup = await AWS.ServiceCatalogAppRegistry.AttributeGroup("advancedAttributeGroup", {
  name: "MyAdvancedApplicationAttributes",
  description: "This group contains advanced attributes for my application.",
  attributes: {
    Environment: "Staging",
    Owner: "DevOpsTeam",
    Version: "2.0.0",
    LastUpdated: new Date().toISOString()
  },
  tags: {
    Project: "MyProject",
    Team: "Development"
  }
});
```

## Adopting Existing Resources

Create an AttributeGroup that adopts an existing resource if it already exists.

```ts
const adoptAttributeGroup = await AWS.ServiceCatalogAppRegistry.AttributeGroup("adoptAttributeGroup", {
  name: "MyAdoptedApplicationAttributes",
  description: "This group adopts existing resource attributes.",
  attributes: {
    Environment: "Testing",
    Owner: "QA Team",
    Version: "1.2.3"
  },
  adopt: true
});
```

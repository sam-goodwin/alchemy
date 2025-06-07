---
title: Managing AWS ServiceCatalogAppRegistry AttributeGroups with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry AttributeGroups using Alchemy Cloud Control.
---

# AttributeGroup

The AttributeGroup resource lets you manage [AWS ServiceCatalogAppRegistry AttributeGroups](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/) which are collections of attributes that describe application resources.

## Minimal Example

Create a basic AttributeGroup with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const BasicAttributeGroup = await AWS.ServiceCatalogAppRegistry.AttributeGroup("BasicAttributeGroup", {
  Name: "MyApplicationAttributes",
  Description: "Attributes for my application",
  Attributes: {
    Version: "1.0",
    Owner: "DevTeam"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure an AttributeGroup with complex attributes and multiple tags:

```ts
const AdvancedAttributeGroup = await AWS.ServiceCatalogAppRegistry.AttributeGroup("AdvancedAttributeGroup", {
  Name: "AdvancedApplicationAttributes",
  Description: "Advanced attributes for my application",
  Attributes: {
    Version: "2.0",
    Owner: "DevTeam",
    Framework: "React",
    Database: {
      Engine: "PostgreSQL",
      Version: "13"
    }
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" },
    { Key: "Service", Value: "WebApp" }
  ]
});
```

## Adoption of Existing Resources

Create an AttributeGroup that adopts an existing resource if it already exists:

```ts
const AdoptedAttributeGroup = await AWS.ServiceCatalogAppRegistry.AttributeGroup("AdoptedAttributeGroup", {
  Name: "ExistingAttributes",
  Description: "Adopts existing attributes if available",
  Attributes: {
    Version: "1.5",
    Owner: "LegacyTeam"
  },
  adopt: true
});
```
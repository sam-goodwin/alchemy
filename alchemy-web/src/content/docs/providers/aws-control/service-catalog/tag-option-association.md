---
title: TagOptionAssociation
description: Learn how to create, update, and manage AWS ServiceCatalog TagOptionAssociations using Alchemy Cloud Control.
---


The TagOptionAssociation resource lets you manage [AWS ServiceCatalog TagOption Associations](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) which are used to associate TagOptions with resources in AWS Service Catalog.

## Minimal Example

Create a basic TagOptionAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const tagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("basicTagOptionAssociation", {
  TagOptionId: "tag-option-1234",
  ResourceId: "portfolio-5678",
  adopt: false // Default is false: Fail if the resource already exists
});
```

## Advanced Configuration

This example demonstrates how to create a TagOptionAssociation and adopt an existing resource if it already exists.

```ts
const advancedTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("advancedTagOptionAssociation", {
  TagOptionId: "tag-option-4321",
  ResourceId: "product-8765",
  adopt: true // Adopt existing resource instead of failing
});
```

## Use Case: Associating Multiple TagOptions

You can manage multiple TagOption associations by creating separate instances. 

```ts
const firstTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("firstTagOptionAssociation", {
  TagOptionId: "tag-option-1111",
  ResourceId: "portfolio-2222"
});

const secondTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("secondTagOptionAssociation", {
  TagOptionId: "tag-option-3333",
  ResourceId: "portfolio-2222"
});
```

## Use Case: Updating an Existing Association

While the TagOptionAssociation resource does not directly support updates, you can manage them by re-creating the association if needed.

```ts
const updateTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("updateTagOptionAssociation", {
  TagOptionId: "tag-option-2222",
  ResourceId: "portfolio-3333",
  adopt: true // Adopt existing resource
});
```

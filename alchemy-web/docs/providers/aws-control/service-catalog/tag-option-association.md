---
title: Managing AWS ServiceCatalog TagOptionAssociations with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog TagOptionAssociations using Alchemy Cloud Control.
---

# TagOptionAssociation

The TagOptionAssociation resource lets you associate tag options with AWS Service Catalog resources, enabling better organization and management of resources. For more details, refer to the [AWS ServiceCatalog TagOptionAssociations documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic TagOptionAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("BasicTagOptionAssociation", {
  TagOptionId: "tag-option-id-12345",
  ResourceId: "prod-portfolio-67890"
});
```

## Advanced Configuration

In this example, we add an optional `adopt` property to adopt an existing resource if it already exists.

```ts
const AdvancedTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("AdvancedTagOptionAssociation", {
  TagOptionId: "tag-option-id-67890",
  ResourceId: "dev-portfolio-12345",
  adopt: true
});
```

## Multiple Tag Options

Here’s how to associate multiple tag options with a resource for better categorization.

```ts
const MultiTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("MultiTagOptionAssociation", {
  TagOptionId: "tag-option-id-11111",
  ResourceId: "test-portfolio-22222",
  adopt: true
});

// Additional tag options can be associated similarly
const AdditionalTagOptionAssociation = await AWS.ServiceCatalog.TagOptionAssociation("AdditionalTagOptionAssociation", {
  TagOptionId: "tag-option-id-22222",
  ResourceId: "test-portfolio-22222"
});
```
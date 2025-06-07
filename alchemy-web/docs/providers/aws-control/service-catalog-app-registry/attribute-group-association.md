---
title: Managing AWS ServiceCatalogAppRegistry AttributeGroupAssociations with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry AttributeGroupAssociations using Alchemy Cloud Control.
---

# AttributeGroupAssociation

The AttributeGroupAssociation resource allows you to associate a specified attribute group with an application in AWS Service Catalog App Registry. This resource is crucial for organizing and managing application attributes effectively. For more information, refer to the [AWS ServiceCatalogAppRegistry AttributeGroupAssociations](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/) documentation.

## Minimal Example

Create a basic Attribute Group Association with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicAttributeGroupAssociation = await AWS.ServiceCatalogAppRegistry.AttributeGroupAssociation("BasicAssociation", {
  AttributeGroup: "my-attribute-group",
  Application: "my-application",
  adopt: true // Optionally adopt existing resource
});
```

## Advanced Configuration

Configure an Attribute Group Association with additional properties for adoption scenarios.

```ts
const AdvancedAttributeGroupAssociation = await AWS.ServiceCatalogAppRegistry.AttributeGroupAssociation("AdvancedAssociation", {
  AttributeGroup: "my-advanced-attribute-group",
  Application: "my-advanced-application",
  adopt: false // Set to false to fail if resource exists
});
```

## Attributes Management

Use the Attribute Group Association to manage multiple attributes for an application.

```ts
const MultiAttributeGroupAssociation = await AWS.ServiceCatalogAppRegistry.AttributeGroupAssociation("MultiAssociation", {
  AttributeGroup: "my-multi-attribute-group",
  Application: "my-multi-application",
  adopt: true // Adopt existing resource if applicable
});
```

## Error Handling Example

Demonstrate error handling when creating an association that already exists.

```ts
try {
  const ErrorHandlingAssociation = await AWS.ServiceCatalogAppRegistry.AttributeGroupAssociation("ErrorHandlingAssociation", {
    AttributeGroup: "my-existing-attribute-group",
    Application: "my-existing-application",
    adopt: false // This will throw an error if the resource already exists
  });
} catch (error) {
  console.error("Error creating association:", error);
}
```
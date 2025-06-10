---
title: AttributeGroupAssociation
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry AttributeGroupAssociations using Alchemy Cloud Control.
---


The AttributeGroupAssociation resource allows you to associate an attribute group with an application in AWS Service Catalog App Registry. This association helps in organizing and managing application metadata effectively. For more information, refer to the [AWS ServiceCatalogAppRegistry AttributeGroupAssociations documentation](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/).

## Minimal Example

Create a basic Attribute Group Association between an attribute group and an application with required properties.

```ts
import AWS from "alchemy/aws/control";

const attributeGroupAssociation = await AWS.ServiceCatalogAppRegistry.AttributeGroupAssociation("myAttributeGroupAssociation", {
  AttributeGroup: "arn:aws:servicecatalog:us-west-2:123456789012:attribute-group/myAttributeGroup",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/myApplication",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

This example demonstrates how to create an association while ensuring that the existing resource is adopted if it already exists.

```ts
const advancedAttributeGroupAssociation = await AWS.ServiceCatalogAppRegistry.AttributeGroupAssociation("advancedAttributeGroupAssociation", {
  AttributeGroup: "arn:aws:servicecatalog:us-west-2:123456789012:attribute-group/advancedAttributeGroup",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/advancedApplication",
  adopt: true // Adopts existing resource instead of failing
});
```

## Use Case: Updating an Existing Association

If you need to ensure that an association is updated when an application or attribute group changes, you can use the following configuration:

```ts
const updateAttributeGroupAssociation = await AWS.ServiceCatalogAppRegistry.AttributeGroupAssociation("updateAttributeGroupAssociation", {
  AttributeGroup: "arn:aws:servicecatalog:us-west-2:123456789012:attribute-group/updateAttributeGroup",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/updateApplication",
  adopt: false // Do not adopt; fail if the resource exists
});
```

This allows you to manage changes effectively while keeping your application metadata organized.

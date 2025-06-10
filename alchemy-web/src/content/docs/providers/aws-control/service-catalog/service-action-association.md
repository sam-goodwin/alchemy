---
title: ServiceActionAssociation
description: Learn how to create, update, and manage AWS ServiceCatalog ServiceActionAssociations using Alchemy Cloud Control.
---


The ServiceActionAssociation resource allows you to associate a service action with a product in AWS Service Catalog. This enables you to define and manage the actions that can be performed on products in your catalog. For more information, see the [AWS ServiceCatalog ServiceActionAssociations documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic ServiceActionAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const serviceActionAssociation = await AWS.ServiceCatalog.ServiceActionAssociation("basicAssociation", {
  ServiceActionId: "action-12345678",
  ProductId: "prod-98765432",
  ProvisioningArtifactId: "artifact-11223344",
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

Associate a service action with additional configurations that may include more optional properties.

```ts
const advancedServiceActionAssociation = await AWS.ServiceCatalog.ServiceActionAssociation("advancedAssociation", {
  ServiceActionId: "action-87654321",
  ProductId: "prod-12345678",
  ProvisioningArtifactId: "artifact-44332211",
  adopt: false // Optional: do not adopt existing resource
});
```

## Handling Existing Associations

Demonstrate how to handle an existing association without failing the process.

```ts
const existingAssociation = await AWS.ServiceCatalog.ServiceActionAssociation("existingAssociation", {
  ServiceActionId: "action-56781234",
  ProductId: "prod-87654321",
  ProvisioningArtifactId: "artifact-33445566",
  adopt: true // Allow adoption of the existing resource
});
```

## Creating Multiple Associations

Show how to create multiple associations in a loop for batch processing.

```ts
const serviceActionIds = ["action-11111111", "action-22222222"];
const productId = "prod-33333333";
const provisioningArtifactId = "artifact-44444444";

for (const serviceActionId of serviceActionIds) {
  const batchAssociation = await AWS.ServiceCatalog.ServiceActionAssociation(`batchAssociation-${serviceActionId}`, {
    ServiceActionId: serviceActionId,
    ProductId: productId,
    ProvisioningArtifactId: provisioningArtifactId,
    adopt: false // Do not adopt existing resources
  });
}
```

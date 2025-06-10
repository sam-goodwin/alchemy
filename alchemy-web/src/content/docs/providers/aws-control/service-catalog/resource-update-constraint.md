---
title: ResourceUpdateConstraint
description: Learn how to create, update, and manage AWS ServiceCatalog ResourceUpdateConstraints using Alchemy Cloud Control.
---


The ResourceUpdateConstraint resource allows you to manage resource update constraints in the AWS Service Catalog, enabling you to control how resources can be updated. For more details, refer to the [AWS ServiceCatalog ResourceUpdateConstraints documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic ResourceUpdateConstraint with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const minimalConstraint = await AWS.ServiceCatalog.ResourceUpdateConstraint("basicConstraint", {
  PortfolioId: "portfolio-123456",
  ProductId: "product-abcdef",
  TagUpdateOnProvisionedProduct: "ALLOWED",
  Description: "Basic update constraint for the product"
});
```

## Advanced Configuration

Configure a ResourceUpdateConstraint with additional settings, including accept language and more detailed constraints:

```ts
const advancedConstraint = await AWS.ServiceCatalog.ResourceUpdateConstraint("advancedConstraint", {
  PortfolioId: "portfolio-654321",
  ProductId: "product-fedcba",
  TagUpdateOnProvisionedProduct: "NOT_ALLOWED",
  Description: "Advanced update constraint with strict tag update rules",
  AcceptLanguage: "en"
});
```

## Adoption of Existing Resource

If you want to adopt an existing ResourceUpdateConstraint instead of failing when it already exists, you can set the `adopt` property to `true`:

```ts
const adoptConstraint = await AWS.ServiceCatalog.ResourceUpdateConstraint("adoptExistingConstraint", {
  PortfolioId: "portfolio-112233",
  ProductId: "product-abc123",
  TagUpdateOnProvisionedProduct: "ALLOWED",
  adopt: true // This allows for the adoption of an existing resource
});
```

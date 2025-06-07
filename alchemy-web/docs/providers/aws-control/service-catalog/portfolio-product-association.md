---
title: Managing AWS ServiceCatalog PortfolioProductAssociations with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog PortfolioProductAssociations using Alchemy Cloud Control.
---

# PortfolioProductAssociation

The PortfolioProductAssociation resource allows you to associate a product with a portfolio in AWS Service Catalog. This enables you to manage products effectively within your portfolios. For more detailed information, refer to the [AWS ServiceCatalog PortfolioProductAssociations documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic association of a product with a portfolio using required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const PortfolioProductAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("MyPortfolioProductAssociation", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-87654321",
  SourcePortfolioId: "source-portfolio-12345678"
});
```

## Advanced Configuration

Configure an association with multiple options, including accept language for localization.

```ts
const AdvancedPortfolioProductAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("AdvancedPortfolioProductAssociation", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-87654321",
  SourcePortfolioId: "source-portfolio-12345678",
  AcceptLanguage: "en"
});
```

## Adoption of Existing Resource

Adopt an existing resource if it already exists instead of failing the operation.

```ts
const AdoptExistingPortfolioProductAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("AdoptExistingPortfolioProductAssociation", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-87654321",
  SourcePortfolioId: "source-portfolio-12345678",
  adopt: true
});
```

## Association without Source Portfolio

Create an association without specifying a source portfolio, which may be useful in certain scenarios.

```ts
const NoSourcePortfolioAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("NoSourcePortfolioAssociation", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-87654321"
});
```
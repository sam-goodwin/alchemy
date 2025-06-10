---
title: PortfolioProductAssociation
description: Learn how to create, update, and manage AWS ServiceCatalog PortfolioProductAssociations using Alchemy Cloud Control.
---


The PortfolioProductAssociation resource allows you to associate a product with a portfolio in AWS Service Catalog. This resource is crucial for managing access to products within portfolios. For more information, refer to the [AWS ServiceCatalog PortfolioProductAssociations documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic association between a portfolio and a product with required properties.

```ts
import AWS from "alchemy/aws/control";

const portfolioProductAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("basicAssociation", {
  PortfolioId: "portfolio-12345",
  ProductId: "product-67890",
  SourcePortfolioId: "source-portfolio-12345", // optional
  AcceptLanguage: "en" // optional
});
```

## Advanced Configuration

Configure an association while adopting an existing resource to avoid failure if it already exists.

```ts
const advancedPortfolioProductAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("advancedAssociation", {
  PortfolioId: "portfolio-54321",
  ProductId: "product-09876",
  SourcePortfolioId: "source-portfolio-54321", // optional
  AcceptLanguage: "fr", // optional
  adopt: true // adopt existing resource
});
```

## Adoption of Existing Resource

Use the adopt option to ensure that the association will succeed even if the resource already exists.

```ts
const adoptedPortfolioProductAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("adoptedAssociation", {
  PortfolioId: "portfolio-11111",
  ProductId: "product-22222",
  adopt: true // true to adopt existing resource
});
```

## Multi-language Support

Create an association while specifying a different language for the operation.

```ts
const multilingualPortfolioProductAssociation = await AWS.ServiceCatalog.PortfolioProductAssociation("multilingualAssociation", {
  PortfolioId: "portfolio-99999",
  ProductId: "product-88888",
  AcceptLanguage: "es" // Spanish
});
```

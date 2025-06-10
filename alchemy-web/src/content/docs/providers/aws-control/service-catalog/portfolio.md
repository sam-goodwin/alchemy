---
title: Portfolio
description: Learn how to create, update, and manage AWS ServiceCatalog Portfolios using Alchemy Cloud Control.
---


The Portfolio resource allows you to manage [AWS ServiceCatalog Portfolios](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) for organizing and managing product offerings within your AWS environment.

## Minimal Example

Create a basic portfolio with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicPortfolio = await AWS.ServiceCatalog.Portfolio("basic-portfolio", {
  ProviderName: "Tech Innovations Inc.",
  DisplayName: "Tech Innovations Portfolio",
  Description: "A portfolio for managing innovative tech products",
  AcceptLanguage: "en",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "Project", Value: "Cloud Solutions" }
  ]
});
```

## Advanced Configuration

Configure a portfolio with additional properties like tags and language preferences.

```ts
const advancedPortfolio = await AWS.ServiceCatalog.Portfolio("advanced-portfolio", {
  ProviderName: "Global Solutions Corp.",
  DisplayName: "Global Solutions Portfolio",
  Description: "A comprehensive portfolio for global solutions",
  AcceptLanguage: "fr",
  Tags: [
    { Key: "Region", Value: "EMEA" },
    { Key: "Compliance", Value: "GDPR" }
  ],
  adopt: true // Adopt an existing resource if one already exists
});
```

## Collaboration with Product

Create a portfolio and associate it with multiple products for better management.

```ts
import AWS from "alchemy/aws/control";

const productPortfolio = await AWS.ServiceCatalog.Portfolio("product-portfolio", {
  ProviderName: "Innovative Designs LLC",
  DisplayName: "Design Products Portfolio",
  Description: "A portfolio for managing design-related products",
  AcceptLanguage: "es",
  Tags: [
    { Key: "Category", Value: "Design" }
  ]
});

// Assuming you have a product created already
const productId = "prod-123456";
await AWS.ServiceCatalog.AssociateProductWithPortfolio("associate-product", {
  PortfolioId: productPortfolio.id, // Reference the generated portfolio ID
  ProductId: productId
});
```

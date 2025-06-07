---
title: Managing AWS ServiceCatalog AcceptedPortfolioShares with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog AcceptedPortfolioShares using Alchemy Cloud Control.
---

# AcceptedPortfolioShare

The AcceptedPortfolioShare resource allows you to manage accepted portfolio shares within AWS Service Catalog. This resource is essential for organizations looking to share portfolios across AWS accounts. For more details, refer to the [AWS ServiceCatalog AcceptedPortfolioShares](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) documentation.

## Minimal Example

This example demonstrates how to create a basic AcceptedPortfolioShare with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicPortfolioShare = await AWS.ServiceCatalog.AcceptedPortfolioShare("BasicPortfolioShareId", {
  PortfolioId: "portfolio-12345678",
  AcceptLanguage: "en"
});
```

## Advanced Configuration

In this example, we adopt an existing resource if it already exists, which can help streamline resource management in certain scenarios.

```ts
const AdvancedPortfolioShare = await AWS.ServiceCatalog.AcceptedPortfolioShare("AdvancedPortfolioShareId", {
  PortfolioId: "portfolio-87654321",
  AcceptLanguage: "en",
  adopt: true
});
```

## Handling Multiple Portfolio Shares

This example illustrates how to handle multiple portfolio shares by creating several AcceptedPortfolioShare resources.

```ts
const PortfolioShare1 = await AWS.ServiceCatalog.AcceptedPortfolioShare("PortfolioShare1Id", {
  PortfolioId: "portfolio-abcde1234",
  AcceptLanguage: "en"
});

const PortfolioShare2 = await AWS.ServiceCatalog.AcceptedPortfolioShare("PortfolioShare2Id", {
  PortfolioId: "portfolio-xyz98765",
  AcceptLanguage: "fr"
});
```
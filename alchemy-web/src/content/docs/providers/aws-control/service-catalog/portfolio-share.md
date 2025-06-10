---
title: PortfolioShare
description: Learn how to create, update, and manage AWS ServiceCatalog PortfolioShares using Alchemy Cloud Control.
---


The PortfolioShare resource lets you manage [AWS ServiceCatalog PortfolioShares](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) for sharing portfolios across AWS accounts.

## Minimal Example

Create a basic PortfolioShare with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const portfolioShare = await AWS.ServiceCatalog.PortfolioShare("basicPortfolioShare", {
  AccountId: "123456789012",
  PortfolioId: "portfolio-abc-123",
  AcceptLanguage: "en"
});
```

## Advanced Configuration

Configure a PortfolioShare to enable sharing of tag options.

```ts
const advancedPortfolioShare = await AWS.ServiceCatalog.PortfolioShare("advancedPortfolioShare", {
  AccountId: "123456789013",
  PortfolioId: "portfolio-def-456",
  ShareTagOptions: true
});
```

## Adopting Existing Resources

Configure a PortfolioShare to adopt existing resources instead of failing if the resource already exists.

```ts
const adoptPortfolioShare = await AWS.ServiceCatalog.PortfolioShare("adoptExistingPortfolioShare", {
  AccountId: "123456789014",
  PortfolioId: "portfolio-ghi-789",
  adopt: true
});
```

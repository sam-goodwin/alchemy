---
title: AcceptedPortfolioShare
description: Learn how to create, update, and manage AWS ServiceCatalog AcceptedPortfolioShares using Alchemy Cloud Control.
---


The AcceptedPortfolioShare resource allows you to manage the acceptance of portfolio shares in AWS Service Catalog. For more details, you can refer to the AWS documentation: [AWS ServiceCatalog AcceptedPortfolioShares](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic accepted portfolio share with required properties and an optional language setting.

```ts
import AWS from "alchemy/aws/control";

const portfolioShare = await AWS.ServiceCatalog.AcceptedPortfolioShare("portfolioShare1", {
  PortfolioId: "port-1234abcd",
  AcceptLanguage: "en"
});
```

## Advanced Configuration

In this example, we show how to adopt an existing resource instead of failing when the resource already exists.

```ts
const adoptedPortfolioShare = await AWS.ServiceCatalog.AcceptedPortfolioShare("portfolioShare2", {
  PortfolioId: "port-5678efgh",
  adopt: true
});
```

## Handling Multiple Portfolio Shares

You can create multiple accepted portfolio shares in a single project, each configured with different parameters.

```ts
const portfolioShare1 = await AWS.ServiceCatalog.AcceptedPortfolioShare("portfolioShare1", {
  PortfolioId: "port-1234abcd",
  AcceptLanguage: "en"
});

const portfolioShare2 = await AWS.ServiceCatalog.AcceptedPortfolioShare("portfolioShare2", {
  PortfolioId: "port-5678efgh",
  AcceptLanguage: "fr",
  adopt: true
});
```

## Working with Additional Properties

This example illustrates how to access additional properties such as ARN and timestamps after creating the accepted portfolio share.

```ts
const acceptedShareDetails = await AWS.ServiceCatalog.AcceptedPortfolioShare("portfolioShareDetails", {
  PortfolioId: "port-91011ijkl"
});

// Accessing additional properties
console.log(`ARN: ${acceptedShareDetails.Arn}`);
console.log(`Created At: ${acceptedShareDetails.CreationTime}`);
console.log(`Last Updated At: ${acceptedShareDetails.LastUpdateTime}`);
```

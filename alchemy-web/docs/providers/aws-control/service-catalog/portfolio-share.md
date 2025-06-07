---
title: Managing AWS ServiceCatalog PortfolioShares with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog PortfolioShares using Alchemy Cloud Control.
---

# PortfolioShare

The PortfolioShare resource allows you to share AWS Service Catalog portfolios with other AWS accounts. This is a crucial feature for organizations that want to manage and share product offerings across multiple accounts efficiently. For more details, refer to the [AWS ServiceCatalog PortfolioShares documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic portfolio share with required properties:

```ts
import AWS from "alchemy/aws/control";

const BasicPortfolioShare = await AWS.ServiceCatalog.PortfolioShare("BasicPortfolioShare", {
  AccountId: "123456789012", // Target account ID to share the portfolio with
  PortfolioId: "portfolio-abc123", // ID of the portfolio to share
  AcceptLanguage: "en", // Optional: Language for the response
  ShareTagOptions: false // Optional: Whether to share tag options
});
```

## Advanced Configuration

Share a portfolio with additional settings, including tag options and a specified language:

```ts
const AdvancedPortfolioShare = await AWS.ServiceCatalog.PortfolioShare("AdvancedPortfolioShare", {
  AccountId: "987654321098", // Target account ID
  PortfolioId: "portfolio-def456", // Portfolio ID to be shared
  AcceptLanguage: "fr", // Optional: French language for the response
  ShareTagOptions: true, // Optional: Share tag options
  adopt: true // Optional: Adopt existing resource if it exists
});
```

## Using Tag Options

Configure a portfolio share that includes specific tag options to enhance resource management:

```ts
const TaggedPortfolioShare = await AWS.ServiceCatalog.PortfolioShare("TaggedPortfolioShare", {
  AccountId: "112233445566", // Target account ID
  PortfolioId: "portfolio-ghi789", // Portfolio ID to share
  AcceptLanguage: "es", // Optional: Spanish language for the response
  ShareTagOptions: true, // Enable sharing of tag options
  adopt: false // Do not adopt existing resources
});
```

## Handling Errors

When sharing a portfolio, you may want to handle errors gracefully, especially if the resource already exists. Here's how you can implement that:

```ts
try {
  const ErrorHandledShare = await AWS.ServiceCatalog.PortfolioShare("ErrorHandledShare", {
    AccountId: "445566778899", // Target account ID
    PortfolioId: "portfolio-jkl012", // Portfolio ID to share
    AcceptLanguage: "en", // Optional: Language for the response
    ShareTagOptions: true, // Optional: Share tag options
    adopt: true // Attempt to adopt if the resource exists
  });
} catch (error) {
  console.error("Error sharing portfolio:", error);
}
```
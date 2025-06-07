---
title: Managing AWS ServiceCatalog Portfolios with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog Portfolios using Alchemy Cloud Control.
---

# Portfolio

The Portfolio resource allows you to manage [AWS ServiceCatalog Portfolios](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) which serve as containers for organizing and managing your AWS service offerings.

## Minimal Example

Create a basic portfolio with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicPortfolio = await AWS.ServiceCatalog.Portfolio("BasicPortfolio", {
  ProviderName: "MyCompany",
  DisplayName: "My Company Portfolio",
  Description: "A portfolio for managing our company offerings",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Product" }
  ]
});
```

## Advanced Configuration

Configure a portfolio with additional properties such as language support.

```ts
const AdvancedPortfolio = await AWS.ServiceCatalog.Portfolio("AdvancedPortfolio", {
  ProviderName: "MyCompany",
  DisplayName: "Advanced Portfolio",
  Description: "An advanced portfolio with multiple features",
  AcceptLanguage: "en",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Adoption of Existing Resources

Create a portfolio that adopts existing resources instead of failing if the resource already exists.

```ts
const AdoptedPortfolio = await AWS.ServiceCatalog.Portfolio("AdoptedPortfolio", {
  ProviderName: "MyCompany",
  DisplayName: "Adopted Portfolio",
  Description: "This portfolio adopts existing resources",
  adopt: true
});
```

## Portfolio with No Tags

Here’s how to create a portfolio without any tags.

```ts
const UntaggedPortfolio = await AWS.ServiceCatalog.Portfolio("UntaggedPortfolio", {
  ProviderName: "MyCompany",
  DisplayName: "Untagged Portfolio",
  Description: "A portfolio without any tags"
});
```
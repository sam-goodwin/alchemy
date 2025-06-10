---
title: PortfolioPrincipalAssociation
description: Learn how to create, update, and manage AWS ServiceCatalog PortfolioPrincipalAssociations using Alchemy Cloud Control.
---


The PortfolioPrincipalAssociation resource allows you to associate a principal, such as a user or a group, with a portfolio in AWS Service Catalog. This enables the principal to have the necessary permissions to access the portfolio's products. For more details, refer to the [AWS ServiceCatalog PortfolioPrincipalAssociations documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic association between a portfolio and a principal with required properties.

```ts
import AWS from "alchemy/aws/control";

const principalAssociation = await AWS.ServiceCatalog.PortfolioPrincipalAssociation("myPrincipalAssociation", {
  PrincipalARN: "arn:aws:iam::123456789012:user/Alice",
  PortfolioId: "portfolio-123456",
  PrincipalType: "IAM",
  AcceptLanguage: "en"
});
```

## Advanced Configuration

Configure the association while adopting an existing resource instead of failing when the resource already exists.

```ts
const advancedPrincipalAssociation = await AWS.ServiceCatalog.PortfolioPrincipalAssociation("myAdvancedPrincipalAssociation", {
  PrincipalARN: "arn:aws:iam::123456789012:role/ProjectRole",
  PortfolioId: "portfolio-654321",
  PrincipalType: "IAM",
  AcceptLanguage: "fr",
  adopt: true
});
```

## Use Case: Associating a Group with a Portfolio

Demonstrate how to associate an IAM group with a portfolio, allowing all group members access to the portfolio.

```ts
const groupPrincipalAssociation = await AWS.ServiceCatalog.PortfolioPrincipalAssociation("myGroupPrincipalAssociation", {
  PrincipalARN: "arn:aws:iam::123456789012:group/Developers",
  PortfolioId: "portfolio-abcde",
  PrincipalType: "IAM",
  AcceptLanguage: "en"
});
```

## Use Case: Associating a Service Role with a Portfolio

Create an association for a service role, granting it permissions to manage the portfolio.

```ts
const serviceRolePrincipalAssociation = await AWS.ServiceCatalog.PortfolioPrincipalAssociation("myServiceRolePrincipalAssociation", {
  PrincipalARN: "arn:aws:iam::123456789012:role/ServiceRole",
  PortfolioId: "portfolio-fghij",
  PrincipalType: "IAM",
  AcceptLanguage: "en"
});
```

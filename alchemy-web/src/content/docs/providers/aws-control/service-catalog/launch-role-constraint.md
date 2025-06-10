---
title: LaunchRoleConstraint
description: Learn how to create, update, and manage AWS ServiceCatalog LaunchRoleConstraints using Alchemy Cloud Control.
---


The LaunchRoleConstraint resource allows you to manage the launch role constraints for AWS Service Catalog products. This enables you to specify the IAM role that users can assume when launching a product from a portfolio. For more information, visit the [AWS ServiceCatalog LaunchRoleConstraints](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) documentation.

## Minimal Example

Create a basic LaunchRoleConstraint specifying the portfolio ID, product ID, and a role ARN.

```ts
import AWS from "alchemy/aws/control";

const launchRoleConstraint = await AWS.ServiceCatalog.LaunchRoleConstraint("basicLaunchRoleConstraint", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-87654321",
  RoleArn: "arn:aws:iam::123456789012:role/LaunchRole",
  Description: "Launch role constraint for my product."
});
```

## Advanced Configuration

Configure a LaunchRoleConstraint with additional options such as accept language and a local role name.

```ts
const advancedLaunchRoleConstraint = await AWS.ServiceCatalog.LaunchRoleConstraint("advancedLaunchRoleConstraint", {
  PortfolioId: "portfolio-87654321",
  ProductId: "product-12345678",
  RoleArn: "arn:aws:iam::123456789012:role/AdvancedLaunchRole",
  LocalRoleName: "AdvancedLaunchRoleName",
  AcceptLanguage: "en"
});
```

## Adopting Existing Resources

If you want to adopt an existing LaunchRoleConstraint without failing if it already exists, you can set the adopt property to true.

```ts
const adoptExistingLaunchRoleConstraint = await AWS.ServiceCatalog.LaunchRoleConstraint("adoptLaunchRoleConstraint", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-87654321",
  RoleArn: "arn:aws:iam::123456789012:role/AdoptLaunchRole",
  adopt: true
});
```

---
title: Managing AWS ServiceCatalog LaunchRoleConstraints with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog LaunchRoleConstraints using Alchemy Cloud Control.
---

# LaunchRoleConstraint

The LaunchRoleConstraint resource allows you to manage [AWS ServiceCatalog LaunchRoleConstraints](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) that define the permissions related to launching products from a portfolio. 

## Minimal Example

Create a basic LaunchRoleConstraint with the required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const LaunchRoleConstraint = await AWS.ServiceCatalog.LaunchRoleConstraint("BasicLaunchRoleConstraint", {
  PortfolioId: "port-12345abcd",
  ProductId: "prod-67890efgh",
  Description: "This constraint allows users to launch the product with specified IAM roles."
});
```

## Advanced Configuration

Configure a LaunchRoleConstraint with additional properties, such as a local role name and accept language.

```ts
const AdvancedLaunchRoleConstraint = await AWS.ServiceCatalog.LaunchRoleConstraint("AdvancedLaunchRoleConstraint", {
  PortfolioId: "port-12345abcd",
  ProductId: "prod-67890efgh",
  LocalRoleName: "CustomLaunchRole",
  AcceptLanguage: "en"
});
```

## Adoption of Existing Resources

If you want to adopt an existing LaunchRoleConstraint instead of failing when it already exists, you can set the adopt property to true.

```ts
const AdoptExistingLaunchRoleConstraint = await AWS.ServiceCatalog.LaunchRoleConstraint("AdoptLaunchRoleConstraint", {
  PortfolioId: "port-12345abcd",
  ProductId: "prod-67890efgh",
  adopt: true
});
```

## Specifying RoleArn

Here’s how to specify a RoleArn in your LaunchRoleConstraint configuration for more controlled access.

```ts
const RoleArnLaunchRoleConstraint = await AWS.ServiceCatalog.LaunchRoleConstraint("RoleArnLaunchRoleConstraint", {
  PortfolioId: "port-12345abcd",
  ProductId: "prod-67890efgh",
  RoleArn: "arn:aws:iam::123456789012:role/MyLaunchRole",
  Description: "This constraint uses a specific IAM role for launching products."
});
```
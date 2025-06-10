---
title: StackSetConstraint
description: Learn how to create, update, and manage AWS ServiceCatalog StackSetConstraints using Alchemy Cloud Control.
---


The StackSetConstraint resource allows you to manage AWS ServiceCatalog StackSetConstraints, which help enforce constraints on AWS CloudFormation StackSets. For more information, refer to the [AWS ServiceCatalog StackSetConstraints documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic StackSetConstraint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicConstraint = await AWS.ServiceCatalog.StackSetConstraint("basicConstraint", {
  Description: "This is a basic StackSetConstraint for the demo.",
  StackInstanceControl: "SERVICE_MANAGED",
  PortfolioId: "port-12345678",
  ProductId: "prod-87654321",
  RegionList: ["us-east-1", "us-west-2"],
  AdminRole: "arn:aws:iam::123456789012:role/StackSetAdminRole",
  AccountList: ["123456789012", "987654321098"],
  ExecutionRole: "arn:aws:iam::123456789012:role/StackSetExecutionRole"
});
```

## Advanced Configuration

Configure a StackSetConstraint with all properties, including optional ones.

```ts
const advancedConstraint = await AWS.ServiceCatalog.StackSetConstraint("advancedConstraint", {
  Description: "This StackSetConstraint includes all properties for advanced configuration.",
  StackInstanceControl: "SERVICE_MANAGED",
  AcceptLanguage: "en",
  PortfolioId: "port-abcdefgh",
  ProductId: "prod-hgfedcba",
  RegionList: ["eu-central-1", "ap-southeast-1"],
  AdminRole: "arn:aws:iam::123456789012:role/StackSetAdminRole",
  AccountList: ["123456789012", "987654321098"],
  ExecutionRole: "arn:aws:iam::123456789012:role/StackSetExecutionRole",
  adopt: true
});
```

## Resource Adoption Example

Demonstrate how to adopt an existing resource rather than failing on creation.

```ts
const adoptExistingConstraint = await AWS.ServiceCatalog.StackSetConstraint("adoptExistingConstraint", {
  Description: "Adopting an existing StackSetConstraint without failing.",
  StackInstanceControl: "SERVICE_MANAGED",
  PortfolioId: "port-abcdefg123",
  ProductId: "prod-9876543210",
  RegionList: ["us-west-1", "us-east-2"],
  AdminRole: "arn:aws:iam::123456789012:role/StackSetAdminRole",
  AccountList: ["123456789012"],
  ExecutionRole: "arn:aws:iam::123456789012:role/StackSetExecutionRole",
  adopt: true
});
```

---
title: LaunchTemplateConstraint
description: Learn how to create, update, and manage AWS ServiceCatalog LaunchTemplateConstraints using Alchemy Cloud Control.
---


The LaunchTemplateConstraint resource allows you to manage [AWS ServiceCatalog LaunchTemplateConstraints](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) that define rules for launch template constraints in your service catalog.

## Minimal Example

Create a LaunchTemplateConstraint with the required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const minimalConstraint = await AWS.ServiceCatalog.LaunchTemplateConstraint("myLaunchTemplateConstraint", {
  PortfolioId: "portfolio-12345",
  ProductId: "product-67890",
  Rules: JSON.stringify({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "ec2:RunInstances",
        "Resource": "*",
        "Condition": {
          "StringEquals": {
            "ec2:InstanceType": "t2.micro"
          }
        }
      }
    ]
  }),
  Description: "Constraint for launching EC2 instances with specific rules"
});
```

## Advanced Configuration

Configure a LaunchTemplateConstraint with additional properties, including accept language and rules for multiple instance types.

```ts
const advancedConstraint = await AWS.ServiceCatalog.LaunchTemplateConstraint("advancedLaunchTemplateConstraint", {
  PortfolioId: "portfolio-54321",
  ProductId: "product-09876",
  Rules: JSON.stringify({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "ec2:RunInstances",
        "Resource": "*",
        "Condition": {
          "StringEquals": {
            "ec2:InstanceType": ["t2.micro", "t3.micro"]
          }
        }
      }
    ]
  }),
  Description: "Advanced constraint for allowing multiple instance types",
  AcceptLanguage: "en"
});
```

## Adoption of Existing Resources

Create a LaunchTemplateConstraint that adopts an existing resource if it already exists.

```ts
const adoptExistingConstraint = await AWS.ServiceCatalog.LaunchTemplateConstraint("adoptExistingConstraint", {
  PortfolioId: "portfolio-11111",
  ProductId: "product-22222",
  Rules: JSON.stringify({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "ec2:RunInstances",
        "Resource": "*",
        "Condition": {
          "StringEquals": {
            "ec2:InstanceType": "t2.small"
          }
        }
      }
    ]
  }),
  adopt: true,
  Description: "Constraint that adopts existing resource"
});
```

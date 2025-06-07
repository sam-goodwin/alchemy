---
title: Managing AWS ServiceCatalog ResourceUpdateConstraints with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog ResourceUpdateConstraints using Alchemy Cloud Control.
---

# ResourceUpdateConstraint

The ResourceUpdateConstraint resource lets you create and manage [AWS ServiceCatalog ResourceUpdateConstraints](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-resourceupdateconstraint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourceupdateconstraint = await AWS.ServiceCatalog.ResourceUpdateConstraint(
  "resourceupdateconstraint-example",
  {
    TagUpdateOnProvisionedProduct: "example-tagupdateonprovisionedproduct",
    PortfolioId: "example-portfolioid",
    ProductId: "example-productid",
    Description: "A resourceupdateconstraint resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a resourceupdateconstraint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResourceUpdateConstraint = await AWS.ServiceCatalog.ResourceUpdateConstraint(
  "advanced-resourceupdateconstraint",
  {
    TagUpdateOnProvisionedProduct: "example-tagupdateonprovisionedproduct",
    PortfolioId: "example-portfolioid",
    ProductId: "example-productid",
    Description: "A resourceupdateconstraint resource managed by Alchemy",
  }
);
```


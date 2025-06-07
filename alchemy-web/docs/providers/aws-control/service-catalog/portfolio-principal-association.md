---
title: Managing AWS ServiceCatalog PortfolioPrincipalAssociations with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog PortfolioPrincipalAssociations using Alchemy Cloud Control.
---

# PortfolioPrincipalAssociation

The PortfolioPrincipalAssociation resource lets you create and manage [AWS ServiceCatalog PortfolioPrincipalAssociations](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-portfolioprincipalassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const portfolioprincipalassociation = await AWS.ServiceCatalog.PortfolioPrincipalAssociation(
  "portfolioprincipalassociation-example",
  {
    PrincipalARN: "example-principalarn",
    PortfolioId: "example-portfolioid",
    PrincipalType: "example-principaltype",
  }
);
```


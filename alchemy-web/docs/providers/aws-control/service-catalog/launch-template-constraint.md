---
title: Managing AWS ServiceCatalog LaunchTemplateConstraints with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog LaunchTemplateConstraints using Alchemy Cloud Control.
---

# LaunchTemplateConstraint

The LaunchTemplateConstraint resource lets you create and manage [AWS ServiceCatalog LaunchTemplateConstraints](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-launchtemplateconstraint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const launchtemplateconstraint = await AWS.ServiceCatalog.LaunchTemplateConstraint(
  "launchtemplateconstraint-example",
  {
    PortfolioId: "example-portfolioid",
    ProductId: "example-productid",
    Rules: "example-rules",
    Description: "A launchtemplateconstraint resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a launchtemplateconstraint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLaunchTemplateConstraint = await AWS.ServiceCatalog.LaunchTemplateConstraint(
  "advanced-launchtemplateconstraint",
  {
    PortfolioId: "example-portfolioid",
    ProductId: "example-productid",
    Rules: "example-rules",
    Description: "A launchtemplateconstraint resource managed by Alchemy",
  }
);
```


---
title: Managing AWS ServiceCatalog StackSetConstraints with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog StackSetConstraints using Alchemy Cloud Control.
---

# StackSetConstraint

The StackSetConstraint resource lets you create and manage [AWS ServiceCatalog StackSetConstraints](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-stacksetconstraint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const stacksetconstraint = await AWS.ServiceCatalog.StackSetConstraint(
  "stacksetconstraint-example",
  {
    Description: "A stacksetconstraint resource managed by Alchemy",
    StackInstanceControl: "example-stackinstancecontrol",
    PortfolioId: "example-portfolioid",
    ProductId: "example-productid",
    RegionList: ["example-regionlist-1"],
    AdminRole: "example-adminrole",
    AccountList: ["example-accountlist-1"],
    ExecutionRole: "example-executionrole",
  }
);
```


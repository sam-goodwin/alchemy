---
title: Managing AWS BillingConductor CustomLineItems with Alchemy
description: Learn how to create, update, and manage AWS BillingConductor CustomLineItems using Alchemy Cloud Control.
---

# CustomLineItem

The CustomLineItem resource lets you create and manage [AWS BillingConductor CustomLineItems](https://docs.aws.amazon.com/billingconductor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const customlineitem = await AWS.BillingConductor.CustomLineItem("customlineitem-example", {
  BillingGroupArn: "example-billinggrouparn",
  Name: "customlineitem-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A customlineitem resource managed by Alchemy",
});
```

## Advanced Configuration

Create a customlineitem with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCustomLineItem = await AWS.BillingConductor.CustomLineItem(
  "advanced-customlineitem",
  {
    BillingGroupArn: "example-billinggrouparn",
    Name: "customlineitem-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A customlineitem resource managed by Alchemy",
  }
);
```


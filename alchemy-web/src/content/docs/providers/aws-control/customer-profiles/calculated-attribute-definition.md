---
title: CalculatedAttributeDefinition
description: Learn how to create, update, and manage AWS CustomerProfiles CalculatedAttributeDefinitions using Alchemy Cloud Control.
---


The CalculatedAttributeDefinition resource allows you to define calculated attributes within the AWS Customer Profiles service, enabling the aggregation of various data points into meaningful metrics. For more information, refer to the [AWS CustomerProfiles CalculatedAttributeDefinitions documentation](https://docs.aws.amazon.com/customerprofiles/latest/userguide/).

## Minimal Example

Create a basic calculated attribute definition with required properties and one optional description:

```ts
import AWS from "alchemy/aws/control";

const calculatedAttribute = await AWS.CustomerProfiles.CalculatedAttributeDefinition("basicCalculatedAttribute", {
  DomainName: "customerDomain",
  CalculatedAttributeName: "totalPurchases",
  Statistic: "SUM",
  AttributeDetails: {
    // Details regarding the attribute to be calculated
    AttributeType: "NUMBER",
    SourceAttributes: ["purchaseAmount"]
  },
  Description: "Calculates the total purchases made by a customer"
});
```

## Advanced Configuration

Define a calculated attribute with additional options such as conditions and tags:

```ts
const advancedCalculatedAttribute = await AWS.CustomerProfiles.CalculatedAttributeDefinition("advancedCalculatedAttribute", {
  DomainName: "customerDomain",
  CalculatedAttributeName: "averageOrderValue",
  Statistic: "AVERAGE",
  AttributeDetails: {
    AttributeType: "NUMBER",
    SourceAttributes: ["orderValue"]
  },
  Conditions: {
    // Define conditions for the calculation
    ConditionType: "EQUALS",
    AttributeName: "status",
    AttributeValue: "completed"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Sales" }
  ]
});
```

## Conditional Calculation Example

Create a calculated attribute that only considers orders marked as 'completed':

```ts
const conditionalCalculatedAttribute = await AWS.CustomerProfiles.CalculatedAttributeDefinition("conditionalCalculatedAttribute", {
  DomainName: "customerDomain",
  CalculatedAttributeName: "completedOrderCount",
  Statistic: "COUNT",
  AttributeDetails: {
    AttributeType: "NUMBER",
    SourceAttributes: ["orderId"]
  },
  Conditions: {
    ConditionType: "EQUALS",
    AttributeName: "orderStatus",
    AttributeValue: "completed"
  }
});
```

---
title: RouteCalculator
description: Learn how to create, update, and manage AWS Location RouteCalculators using Alchemy Cloud Control.
---


The RouteCalculator resource lets you manage [AWS Location RouteCalculators](https://docs.aws.amazon.com/location/latest/userguide/) for routing and navigation services.

## Minimal Example

Create a basic RouteCalculator with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicRouteCalculator = await AWS.Location.RouteCalculator("basicRouteCalculator", {
  CalculatorName: "MyRouteCalculator",
  Description: "An example RouteCalculator for basic routing",
  DataSource: "Here",
  PricingPlan: "RequestBasedUsage"
});
```

## Advanced Configuration

Configure a RouteCalculator with additional tags for resource organization.

```ts
const advancedRouteCalculator = await AWS.Location.RouteCalculator("advancedRouteCalculator", {
  CalculatorName: "AdvancedRouteCalculator",
  Description: "A RouteCalculator with advanced options",
  DataSource: "Here",
  PricingPlan: "RequestBasedUsage",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Navigation" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing RouteCalculator instead of failing when it already exists, you can specify the adopt property.

```ts
const adoptedRouteCalculator = await AWS.Location.RouteCalculator("adoptedRouteCalculator", {
  CalculatorName: "ExistingRouteCalculator",
  DataSource: "Here",
  adopt: true // Adopt the existing resource
});
```

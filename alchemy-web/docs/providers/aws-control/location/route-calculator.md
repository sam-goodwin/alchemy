---
title: Managing AWS Location RouteCalculators with Alchemy
description: Learn how to create, update, and manage AWS Location RouteCalculators using Alchemy Cloud Control.
---

# RouteCalculator

The RouteCalculator resource allows you to manage [AWS Location RouteCalculators](https://docs.aws.amazon.com/location/latest/userguide/) for calculating routes between locations based on specified data sources.

## Minimal Example

Create a basic RouteCalculator with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const BasicRouteCalculator = await AWS.Location.RouteCalculator("BasicRouteCalculator", {
  CalculatorName: "MyRouteCalculator",
  DataSource: "Here",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure a RouteCalculator with an optional description and pricing plan.

```ts
const AdvancedRouteCalculator = await AWS.Location.RouteCalculator("AdvancedRouteCalculator", {
  CalculatorName: "AdvancedRouteCalculator",
  Description: "This calculator uses HERE data to compute optimal routes.",
  DataSource: "Here",
  PricingPlan: "RequestBased",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Adoption of Existing Resource

Adopt an existing RouteCalculator resource instead of failing if it already exists.

```ts
const AdoptedRouteCalculator = await AWS.Location.RouteCalculator("AdoptedRouteCalculator", {
  CalculatorName: "ExistingRouteCalculator",
  DataSource: "Here",
  adopt: true
});
```

## Route Calculator with Multiple Tags

Create a RouteCalculator with multiple tags for better resource management.

```ts
const MultiTagRouteCalculator = await AWS.Location.RouteCalculator("MultiTagRouteCalculator", {
  CalculatorName: "MultiTagCalculator",
  DataSource: "Here",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "TeamA" },
    { Key: "Project", Value: "RouteOptimization" }
  ]
});
```
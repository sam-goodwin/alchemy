---
title: Managing AWS Location Maps with Alchemy
description: Learn how to create, update, and manage AWS Location Maps using Alchemy Cloud Control.
---

# Map

The Map resource lets you manage [AWS Location Maps](https://docs.aws.amazon.com/location/latest/userguide/) for displaying geographic data in your applications.

## Minimal Example

Create a basic map with a specified name and configuration.

```ts
import AWS from "alchemy/aws/control";

const BasicMap = await AWS.Location.Map("MyBasicMap", {
  MapName: "MyFirstMap",
  Configuration: {
    Style: "VectorEsriDarkGray", // Use a predefined style for the map
  },
  Tags: [
    { Key: "Project", Value: "LocationTracking" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a map with a description and a pricing plan.

```ts
const AdvancedMap = await AWS.Location.Map("MyAdvancedMap", {
  MapName: "AdvancedMapWithDescription",
  Description: "This map is used for tracking user locations in the application.",
  Configuration: {
    Style: "VectorEsriLightGray", // Another map style option
  },
  PricingPlan: "RequestBasedUsage", // Define the pricing plan
  Tags: [
    { Key: "Project", Value: "UserTracking" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Updating an Existing Map

Adopt an existing resource instead of failing when the resource already exists.

```ts
const ExistingMap = await AWS.Location.Map("MyExistingMap", {
  MapName: "ExistingMap",
  Configuration: {
    Style: "VectorEsriSatellite",
  },
  adopt: true // Adopt the existing resource
});
```

## Detailed Configuration Example

Create a more detailed map configuration including a custom description and pricing plan.

```ts
const DetailedMap = await AWS.Location.Map("MyDetailedMap", {
  MapName: "DetailedMapWithCustomConfig",
  Description: "This is a detailed map for advanced location services.",
  Configuration: {
    Style: "VectorEsriImagery", // Custom style for detailed views
  },
  PricingPlan: "MobileAssetTracking", // Specific pricing plan for mobile asset tracking
  Tags: [
    { Key: "Department", Value: "Logistics" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```
---
title: Map
description: Learn how to create, update, and manage AWS Location Maps using Alchemy Cloud Control.
---


The Map resource lets you manage [AWS Location Maps](https://docs.aws.amazon.com/location/latest/userguide/) for geospatial applications and services.

## Minimal Example

Create a basic map with essential properties including a name and configuration:

```ts
import AWS from "alchemy/aws/control";

const basicMap = await AWS.Location.Map("basicMap", {
  MapName: "BasicMap",
  Configuration: {
    Style: "VectorEsriStreet"
  }
});
```

## Advanced Configuration

Configure a map with a description and a pricing plan for enhanced features:

```ts
const advancedMap = await AWS.Location.Map("advancedMap", {
  MapName: "AdvancedMap",
  Description: "An advanced map for geospatial services.",
  Configuration: {
    Style: "VectorEsriImagery"
  },
  PricingPlan: "RequestBased"
});
```

## Using Tags

Create a map with tags to help organize and manage resources:

```ts
const taggedMap = await AWS.Location.Map("taggedMap", {
  MapName: "TaggedMap",
  Configuration: {
    Style: "VectorEsriTopographic"
  },
  Tags: [
    { Key: "Project", Value: "GeospatialAnalysis" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adopting Existing Resources

If you need to adopt an existing map without creating a new one, you can set the `adopt` property to true:

```ts
const adoptedMap = await AWS.Location.Map("adoptedMap", {
  MapName: "ExistingMap",
  Configuration: {
    Style: "VectorEsriNavigation"
  },
  adopt: true
});
```

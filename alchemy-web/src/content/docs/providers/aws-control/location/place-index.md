---
title: PlaceIndex
description: Learn how to create, update, and manage AWS Location PlaceIndexs using Alchemy Cloud Control.
---


The PlaceIndex resource lets you manage [AWS Location PlaceIndexs](https://docs.aws.amazon.com/location/latest/userguide/) for geocoding and reverse geocoding address data.

## Minimal Example

Create a basic PlaceIndex with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const placeIndex = await AWS.Location.PlaceIndex("myPlaceIndex", {
  IndexName: "MyGeocodingIndex",
  Description: "A place index for geocoding addresses",
  DataSource: "Esri",
  PricingPlan: "RequestBasedUsage",
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure a PlaceIndex with a custom data source configuration and pricing plan.

```ts
import AWS from "alchemy/aws/control";

const customPlaceIndex = await AWS.Location.PlaceIndex("customPlaceIndex", {
  IndexName: "CustomGeocodingIndex",
  Description: "A custom place index with specific settings",
  DataSource: "Here",
  PricingPlan: "RequestBasedUsage",
  DataSourceConfiguration: {
    IntendedUse: "Consumer",
    DataSource: "Here"
  },
  Tags: [{ Key: "Project", Value: "MappingApp" }]
});
```

## Using Tags for Resource Management

Create a PlaceIndex while including multiple tags for better resource management and identification.

```ts
import AWS from "alchemy/aws/control";

const taggedPlaceIndex = await AWS.Location.PlaceIndex("taggedPlaceIndex", {
  IndexName: "TaggedGeocodingIndex",
  Description: "A place index with multiple tags",
  DataSource: "Esri",
  PricingPlan: "RequestBasedUsage",
  Tags: [
    { Key: "Department", Value: "Geospatial" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```

## Adopting an Existing PlaceIndex

If you want to adopt an existing PlaceIndex instead of creating a new one, you can set the adopt property to true.

```ts
import AWS from "alchemy/aws/control";

const adoptedPlaceIndex = await AWS.Location.PlaceIndex("existingPlaceIndex", {
  IndexName: "ExistingGeocodingIndex",
  DataSource: "Esri",
  adopt: true
});
```

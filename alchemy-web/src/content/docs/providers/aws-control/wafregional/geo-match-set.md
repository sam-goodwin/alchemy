---
title: GeoMatchSet
description: Learn how to create, update, and manage AWS WAFRegional GeoMatchSets using Alchemy Cloud Control.
---


The GeoMatchSet resource allows you to manage [AWS WAFRegional GeoMatchSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) that specify the countries from which you want to allow or block incoming web requests.

## Minimal Example

Create a basic GeoMatchSet with a name and a country constraint.

```ts
import AWS from "alchemy/aws/control";

const geoMatchSet = await AWS.WAFRegional.GeoMatchSet("basicGeoMatchSet", {
  Name: "BasicGeoMatchSet",
  GeoMatchConstraints: [
    {
      Type: "Country",
      Value: "US"
    },
    {
      Type: "Country",
      Value: "CA"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a GeoMatchSet with multiple geographic constraints.

```ts
const advancedGeoMatchSet = await AWS.WAFRegional.GeoMatchSet("advancedGeoMatchSet", {
  Name: "AdvancedGeoMatchSet",
  GeoMatchConstraints: [
    {
      Type: "Country",
      Value: "FR"
    },
    {
      Type: "Country",
      Value: "GB"
    },
    {
      Type: "Country",
      Value: "DE"
    }
  ]
});
```

## Updating GeoMatchSet

Update an existing GeoMatchSet to add an additional country constraint.

```ts
const updatedGeoMatchSet = await AWS.WAFRegional.GeoMatchSet("updatedGeoMatchSet", {
  Name: "AdvancedGeoMatchSet",
  GeoMatchConstraints: [
    {
      Type: "Country",
      Value: "FR"
    },
    {
      Type: "Country",
      Value: "GB"
    },
    {
      Type: "Country",
      Value: "DE"
    },
    {
      Type: "Country",
      Value: "JP"
    }
  ]
});
```

## Deleting a GeoMatchSet

Remove a GeoMatchSet when it is no longer needed.

```ts
await AWS.WAFRegional.GeoMatchSet("deleteGeoMatchSet", {
  Name: "BasicGeoMatchSet",
  adopt: false // Do not adopt existing resource
});
```

---
title: Managing AWS Location PlaceIndexs with Alchemy
description: Learn how to create, update, and manage AWS Location PlaceIndexs using Alchemy Cloud Control.
---

# PlaceIndex

The PlaceIndex resource lets you create and manage [AWS Location PlaceIndexs](https://docs.aws.amazon.com/location/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const placeindex = await AWS.Location.PlaceIndex("placeindex-example", {
  IndexName: "placeindex-index",
  DataSource: "example-datasource",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A placeindex resource managed by Alchemy",
});
```

## Advanced Configuration

Create a placeindex with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPlaceIndex = await AWS.Location.PlaceIndex("advanced-placeindex", {
  IndexName: "placeindex-index",
  DataSource: "example-datasource",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A placeindex resource managed by Alchemy",
});
```


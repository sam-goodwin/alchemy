---
title: Managing AWS InspectorV2 Filters with Alchemy
description: Learn how to create, update, and manage AWS InspectorV2 Filters using Alchemy Cloud Control.
---

# Filter

The Filter resource lets you create and manage [AWS InspectorV2 Filters](https://docs.aws.amazon.com/inspectorv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-inspectorv2-filter.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const filter = await AWS.InspectorV2.Filter("filter-example", {
  FilterCriteria: "example-filtercriteria",
  FilterAction: "example-filteraction",
  Name: "filter-",
  Description: "A filter resource managed by Alchemy",
});
```

## Advanced Configuration

Create a filter with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFilter = await AWS.InspectorV2.Filter("advanced-filter", {
  FilterCriteria: "example-filtercriteria",
  FilterAction: "example-filteraction",
  Name: "filter-",
  Description: "A filter resource managed by Alchemy",
});
```


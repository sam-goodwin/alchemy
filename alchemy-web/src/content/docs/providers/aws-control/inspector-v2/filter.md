---
title: Filter
description: Learn how to create, update, and manage AWS InspectorV2 Filters using Alchemy Cloud Control.
---


The Filter resource allows you to create and manage [AWS InspectorV2 Filters](https://docs.aws.amazon.com/inspectorv2/latest/userguide/) that help define criteria for the assessment of your AWS resources.

## Minimal Example

Create a basic filter with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicFilter = await AWS.InspectorV2.Filter("basic-filter", {
  Name: "Critical Vulnerabilities Filter",
  Description: "Filter for critical vulnerabilities",
  FilterCriteria: {
    // Define filter criteria here
  },
  FilterAction: "Exclude"
});
```

## Advanced Configuration

Set up a more complex filter with additional criteria and a detailed description.

```ts
const advancedFilter = await AWS.InspectorV2.Filter("advanced-filter", {
  Name: "High Severity Vulnerabilities Filter",
  Description: "Filter for high severity vulnerabilities affecting EC2 instances",
  FilterCriteria: {
    // Example filter criteria for severity level
    Severity: {
      Equals: ["HIGH"]
    },
    // Add additional criteria as needed
  },
  FilterAction: "Include"
});
```

## Adopt Existing Resource

Create a filter that adopts an existing resource instead of failing if it already exists.

```ts
const existingFilter = await AWS.InspectorV2.Filter("existing-filter", {
  Name: "Existing Filter",
  Description: "This filter adopts an existing resource",
  FilterCriteria: {
    // Define filter criteria here
  },
  FilterAction: "Exclude",
  adopt: true
});
```

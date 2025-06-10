---
title: AnomalyMonitor
description: Learn how to create, update, and manage AWS CE AnomalyMonitors using Alchemy Cloud Control.
---


The AnomalyMonitor resource lets you create and manage AWS Cost Explorer Anomaly Monitors, which help track unusual spending patterns in your AWS accounts. For more details, refer to the official AWS documentation: [AWS CE AnomalyMonitors](https://docs.aws.amazon.com/ce/latest/userguide/).

## Minimal Example

Create a basic anomaly monitor with required properties and a common optional tag:

```ts
import AWS from "alchemy/aws/control";

const basicMonitor = await AWS.CE.AnomalyMonitor("basicMonitor", {
  MonitorType: "SERVICE", // Monitor by service
  MonitorName: "Basic Service Monitor",
  ResourceTags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an anomaly monitor with a specification and dimension for more granular tracking:

```ts
const advancedMonitor = await AWS.CE.AnomalyMonitor("advancedMonitor", {
  MonitorType: "COST_CATEGORY", // Monitor by cost category
  MonitorName: "Advanced Cost Category Monitor",
  MonitorSpecification: JSON.stringify({
    CostCategory: {
      CostCategoryName: "Marketing",
      // Additional specifications can be added here
    }
  }),
  MonitorDimension: "SERVICE"
});
```

## Adoption of Existing Resource

If you want to adopt an existing anomaly monitor instead of creating a new one, set the `adopt` property to `true`:

```ts
const adoptedMonitor = await AWS.CE.AnomalyMonitor("adoptedMonitor", {
  MonitorType: "SERVICE",
  MonitorName: "Adopted Service Monitor",
  adopt: true // This will adopt the existing resource if it exists
});
```

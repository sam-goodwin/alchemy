---
title: Group
description: Learn how to create, update, and manage AWS XRay Groups using Alchemy Cloud Control.
---


The Group resource lets you manage [AWS XRay Groups](https://docs.aws.amazon.com/xray/latest/userguide/) for organizing and analyzing traces from your applications.

## Minimal Example

Create a basic XRay Group with a specified name and a filter expression.

```ts
import AWS from "alchemy/aws/control";

const xrayGroup = await AWS.XRay.Group("myXRayGroup", {
  GroupName: "MyApplicationGroup",
  FilterExpression: "service('MyService')"
});
```

## Advanced Configuration

Configure a group with insights enabled and additional tags.

```ts
const insightsGroup = await AWS.XRay.Group("insightsXRayGroup", {
  GroupName: "InsightsEnabledGroup",
  FilterExpression: "service('MyService')",
  InsightsConfiguration: {
    InsightsEnabled: true,
    NotificationsEnabled: false
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing XRay Group instead of failing when the resource already exists.

```ts
const existingGroup = await AWS.XRay.Group("existingXRayGroup", {
  GroupName: "ExistingGroup",
  adopt: true
});
```

## Group with Custom Insights Configuration

Define a group with customized insights configuration.

```ts
const customInsightsGroup = await AWS.XRay.Group("customInsightsXRayGroup", {
  GroupName: "CustomInsightsGroup",
  InsightsConfiguration: {
    InsightsEnabled: true,
    NotificationsEnabled: true
  }
});
```

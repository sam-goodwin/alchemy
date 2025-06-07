---
title: Managing AWS XRay Groups with Alchemy
description: Learn how to create, update, and manage AWS XRay Groups using Alchemy Cloud Control.
---

# Group

The Group resource lets you manage [AWS XRay Groups](https://docs.aws.amazon.com/xray/latest/userguide/) for organizing and analyzing your trace data efficiently.

## Minimal Example

Create a basic XRay Group with a name and a filter expression for trace data.

```ts
import AWS from "alchemy/aws/control";

const xrayGroup = await AWS.XRay.Group("MyXRayGroup", {
  GroupName: "MyApplicationGroup",
  FilterExpression: "service() = 'MyService'",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Backend" }
  ]
});
```

## Advanced Configuration

Configure a group with insights enabled to gather more analytical data.

```ts
const insightsGroup = await AWS.XRay.Group("InsightsXRayGroup", {
  GroupName: "MyInsightsGroup",
  FilterExpression: "service() = 'MyService'",
  InsightsConfiguration: {
    InsightsEnabled: true,
    NotificationsEnabled: true
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Custom Filter Expression

Create a group with a custom filter expression for more specific data analysis.

```ts
const customFilterGroup = await AWS.XRay.Group("CustomFilterGroup", {
  GroupName: "CustomFilterGroup",
  FilterExpression: "http.status >= 500",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing XRay group instead of creating a new one if it already exists.

```ts
const adoptExistingGroup = await AWS.XRay.Group("AdoptExistingGroup", {
  GroupName: "ExistingGroupName",
  adopt: true
});
```
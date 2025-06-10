---
title: Feature
description: Learn how to create, update, and manage AWS Evidently Features using Alchemy Cloud Control.
---


The Feature resource lets you manage [AWS Evidently Features](https://docs.aws.amazon.com/evidently/latest/userguide/) used for feature flagging and experimentation.

## Minimal Example

Create a basic Evidently Feature with required properties and some common optional settings:

```ts
import AWS from "alchemy/aws/control";

const basicFeature = await AWS.Evidently.Feature("basicFeature", {
  project: "myEvidentlyProject",
  name: "UserExperienceImprovement",
  description: "A feature to improve user experience based on feedback.",
  variations: [
    { value: "enabled" },
    { value: "disabled" }
  ],
  defaultVariation: "enabled"
});
```

## Advanced Configuration

Configure a feature with custom evaluation strategy and entity overrides:

```ts
const advancedFeature = await AWS.Evidently.Feature("advancedFeature", {
  project: "myEvidentlyProject",
  name: "NewHomepageDesign",
  description: "Testing the new homepage design for user feedback.",
  evaluationStrategy: "ALL_RULES",
  variations: [
    { value: "designA" },
    { value: "designB" }
  ],
  defaultVariation: "designA",
  entityOverrides: [
    {
      entityId: "user123",
      override: "designB"
    }
  ],
  tags: [
    { key: "environment", value: "staging" },
    { key: "team", value: "frontend" }
  ]
});
```

## Feature with Entity Overrides

Demonstrate using entity overrides to customize feature behavior for specific users:

```ts
const featureWithOverrides = await AWS.Evidently.Feature("featureWithOverrides", {
  project: "myEvidentlyProject",
  name: "BetaAccessFeature",
  description: "A feature only available to beta users.",
  variations: [
    { value: "betaAccess" },
    { value: "noAccess" }
  ],
  defaultVariation: "noAccess",
  entityOverrides: [
    {
      entityId: "betaUser456",
      override: "betaAccess"
    },
    {
      entityId: "betaUser789",
      override: "betaAccess"
    }
  ]
});
```

## Feature with Tags

Create a feature that includes tagging for better organization:

```ts
const taggedFeature = await AWS.Evidently.Feature("taggedFeature", {
  project: "myEvidentlyProject",
  name: "PerformanceMonitoring",
  description: "Feature to monitor application performance.",
  variations: [
    { value: "enabled" },
    { value: "disabled" }
  ],
  defaultVariation: "enabled",
  tags: [
    { key: "project", value: "monitoring" },
    { key: "priority", value: "high" }
  ]
});
```

---
title: Managing AWS SageMaker FeatureGroups with Alchemy
description: Learn how to create, update, and manage AWS SageMaker FeatureGroups using Alchemy Cloud Control.
---

# FeatureGroup

The FeatureGroup resource lets you create and manage [AWS SageMaker FeatureGroups](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const featuregroup = await AWS.SageMaker.FeatureGroup("featuregroup-example", {
  FeatureDefinitions: [],
  RecordIdentifierFeatureName: "featuregroup-recordidentifierfeature",
  EventTimeFeatureName: "featuregroup-eventtimefeature",
  FeatureGroupName: "featuregroup-featuregroup",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A featuregroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a featuregroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFeatureGroup = await AWS.SageMaker.FeatureGroup("advanced-featuregroup", {
  FeatureDefinitions: [],
  RecordIdentifierFeatureName: "featuregroup-recordidentifierfeature",
  EventTimeFeatureName: "featuregroup-eventtimefeature",
  FeatureGroupName: "featuregroup-featuregroup",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A featuregroup resource managed by Alchemy",
});
```


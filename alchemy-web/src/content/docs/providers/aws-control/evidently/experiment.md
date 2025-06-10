---
title: Experiment
description: Learn how to create, update, and manage AWS Evidently Experiments using Alchemy Cloud Control.
---


The Experiment resource lets you manage [AWS Evidently Experiments](https://docs.aws.amazon.com/evidently/latest/userguide/) for A/B testing and feature management.

## Resource Documentation

The AWS Evidently Experiment resource allows you to define and manage experiments to test variations of your applications and features effectively. It includes capabilities for setting up treatments, metrics, and configurations for online A/B testing.

## Minimal Example

Create a basic experiment with required properties and some common optional properties.

```ts
import AWS from "alchemy/aws/control";

const basicExperiment = await AWS.Evidently.Experiment("basicExperiment", {
  Project: "myEvidentlyProject",
  Name: "Basic Experiment",
  MetricGoals: [
    {
      MetricName: "ConversionRate",
      Value: 0.5
    }
  ],
  OnlineAbConfig: {
    ControlTreatment: "treatmentA",
    EvaluationPeriods: 3
  },
  Treatments: [
    {
      Name: "treatmentA",
      Weight: 50,
      Variations: ["Variant A"]
    },
    {
      Name: "treatmentB",
      Weight: 50,
      Variations: ["Variant B"]
    }
  ]
});
```

## Advanced Configuration

Configure an experiment with additional properties such as sampling rate and randomization salt.

```ts
const advancedExperiment = await AWS.Evidently.Experiment("advancedExperiment", {
  Project: "myEvidentlyProject",
  Name: "Advanced Experiment",
  MetricGoals: [
    {
      MetricName: "UserEngagement",
      Value: 0.7
    }
  ],
  OnlineAbConfig: {
    ControlTreatment: "treatmentA",
    EvaluationPeriods: 5
  },
  Treatments: [
    {
      Name: "treatmentA",
      Weight: 30,
      Variations: ["Variant A"]
    },
    {
      Name: "treatmentB",
      Weight: 70,
      Variations: ["Variant B"]
    }
  ],
  SamplingRate: 0.1,
  RandomizationSalt: "uniqueSalt123"
});
```

## Experiment with Segmentation

Create an experiment that includes segmentation to target specific user groups.

```ts
const segmentedExperiment = await AWS.Evidently.Experiment("segmentedExperiment", {
  Project: "myEvidentlyProject",
  Name: "Segmented Experiment",
  MetricGoals: [
    {
      MetricName: "RetentionRate",
      Value: 0.6
    }
  ],
  OnlineAbConfig: {
    ControlTreatment: "treatmentA",
    EvaluationPeriods: 4
  },
  Treatments: [
    {
      Name: "treatmentA",
      Weight: 40,
      Variations: ["Variant A"]
    },
    {
      Name: "treatmentB",
      Weight: 60,
      Variations: ["Variant B"]
    }
  ],
  Segment: "highValueUsers"
});
```

## Experiment with Tags

Create an experiment that includes tagging for better resource management.

```ts
const taggedExperiment = await AWS.Evidently.Experiment("taggedExperiment", {
  Project: "myEvidentlyProject",
  Name: "Tagged Experiment",
  MetricGoals: [
    {
      MetricName: "PurchaseConversion",
      Value: 0.4
    }
  ],
  OnlineAbConfig: {
    ControlTreatment: "treatmentA",
    EvaluationPeriods: 6
  },
  Treatments: [
    {
      Name: "treatmentA",
      Weight: 20,
      Variations: ["Variant A"]
    },
    {
      Name: "treatmentB",
      Weight: 80,
      Variations: ["Variant B"]
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    },
    {
      Key: "Version",
      Value: "v1.0"
    }
  ]
});
```

---
title: Launch
description: Learn how to create, update, and manage AWS Evidently Launchs using Alchemy Cloud Control.
---


The Launch resource lets you create and manage [AWS Evidently Launches](https://docs.aws.amazon.com/evidently/latest/userguide/) for running experiments and feature launches.

## Minimal Example

Create a basic launch with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicLaunch = await AWS.Evidently.Launch("basicLaunch", {
  project: "MyEvidentlyProject",
  description: "A simple launch for testing features.",
  groups: [
    {
      name: "GroupA",
      trafficAllocation: 50,
      variation: "VariationA"
    },
    {
      name: "GroupB",
      trafficAllocation: 50,
      variation: "VariationB"
    }
  ],
  scheduledSplitsConfig: [
    {
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 86400000).toISOString(),
      splits: [
        {
          weight: 50,
          variation: "VariationA"
        },
        {
          weight: 50,
          variation: "VariationB"
        }
      ]
    }
  ],
  name: "BasicLaunch"
});
```

## Advanced Configuration

Configure a launch with additional properties including tags and a randomization salt for more complex experiments.

```ts
const advancedLaunch = await AWS.Evidently.Launch("advancedLaunch", {
  project: "MyEvidentlyProject",
  description: "An advanced launch configuration.",
  groups: [
    {
      name: "GroupA",
      trafficAllocation: 30,
      variation: "VariationA"
    },
    {
      name: "GroupB",
      trafficAllocation: 70,
      variation: "VariationB"
    }
  ],
  randomizationSalt: "uniqueSalt123",
  metricMonitors: [
    {
      metricName: "UserEngagement",
      valueKey: "engagementCount"
    }
  ],
  scheduledSplitsConfig: [
    {
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 86400000).toISOString(),
      splits: [
        {
          weight: 30,
          variation: "VariationA"
        },
        {
          weight: 70,
          variation: "VariationB"
        }
      ]
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Team",
      value: "Development"
    }
  ],
  name: "AdvancedLaunch"
});
```

## Scheduled Launch with Multiple Splits

Demonstrate creating a launch with multiple scheduled splits for a phased rollout.

```ts
const phasedLaunch = await AWS.Evidently.Launch("phasedLaunch", {
  project: "MyEvidentlyProject",
  description: "Phased rollout of a new feature.",
  groups: [
    {
      name: "EarlyAdopters",
      trafficAllocation: 20,
      variation: "VariationA"
    },
    {
      name: "GeneralUsers",
      trafficAllocation: 80,
      variation: "VariationB"
    }
  ],
  scheduledSplitsConfig: [
    {
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 604800000).toISOString(), // 7 days
      splits: [
        {
          weight: 20,
          variation: "VariationA"
        },
        {
          weight: 80,
          variation: "VariationB"
        }
      ]
    },
    {
      startTime: new Date(Date.now() + 604800000).toISOString(), // 7 days later
      endTime: new Date(Date.now() + 1209600000).toISOString(), // 14 days later
      splits: [
        {
          weight: 50,
          variation: "VariationA"
        },
        {
          weight: 50,
          variation: "VariationB"
        }
      ]
    }
  ],
  name: "PhasedLaunch"
});
```

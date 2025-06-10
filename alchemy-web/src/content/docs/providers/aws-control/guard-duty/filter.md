---
title: Filter
description: Learn how to create, update, and manage AWS GuardDuty Filters using Alchemy Cloud Control.
---


The Filter resource lets you manage [AWS GuardDuty Filters](https://docs.aws.amazon.com/guardduty/latest/userguide/) that help in defining which findings should be included in the detection of threats. Filters allow you to take specific actions on the findings based on the defined criteria.

## Minimal Example

Create a basic GuardDuty Filter with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleFilter = await AWS.GuardDuty.Filter("simpleFilter", {
  DetectorId: "12abcdef34gh567ijkl890mnopqrstu",
  FindingCriteria: {
    Criterion: {
      severity: {
        Eq: ["HIGH"]
      }
    }
  },
  Name: "HighSeverityFilter"
});
```

## Advanced Configuration

Configure a filter with an action and a rank to prioritize it:

```ts
const advancedFilter = await AWS.GuardDuty.Filter("advancedFilter", {
  DetectorId: "12abcdef34gh567ijkl890mnopqrstu",
  FindingCriteria: {
    Criterion: {
      severity: {
        Eq: ["MEDIUM", "HIGH"]
      },
      type: {
        Eq: ["UnauthorizedAccess:Root", "UnauthorizedAccess:AWSAccount"]
      }
    }
  },
  Name: "MediumAndHighSeverityFilter",
  Action: "NOOP",
  Rank: 1
});
```

## Tagging for Organization

Create a filter with tags for better organization and management:

```ts
const taggedFilter = await AWS.GuardDuty.Filter("taggedFilter", {
  DetectorId: "12abcdef34gh567ijkl890mnopqrstu",
  FindingCriteria: {
    Criterion: {
      severity: {
        Eq: ["LOW", "MEDIUM"]
      }
    }
  },
  Name: "LowAndMediumSeverityFilter",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Adoption of Existing Filter

Create a filter that adopts an existing one instead of failing if it exists:

```ts
const adoptFilter = await AWS.GuardDuty.Filter("adoptFilter", {
  DetectorId: "12abcdef34gh567ijkl890mnopqrstu",
  FindingCriteria: {
    Criterion: {
      severity: {
        Eq: ["HIGH"]
      }
    }
  },
  Name: "AdoptHighSeverityFilter",
  adopt: true
});
```

---
title: Managing AWS GuardDuty Filters with Alchemy
description: Learn how to create, update, and manage AWS GuardDuty Filters using Alchemy Cloud Control.
---

# Filter

The Filter resource lets you manage [AWS GuardDuty Filters](https://docs.aws.amazon.com/guardduty/latest/userguide/) to define which findings to include or exclude in your security alerts.

## Minimal Example

Create a basic GuardDuty filter with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicFilter = await AWS.GuardDuty.Filter("BasicFilter", {
  DetectorId: "12abc34de5678f90123456789ab0cdef",
  Name: "CriticalFindingsFilter",
  FindingCriteria: {
    Criterion: {
      "severity": {
        "Eq": ["HIGH", "CRITICAL"]
      }
    }
  },
  Description: "Filter for high and critical severity findings",
  Rank: 1
});
```

## Advanced Configuration

Configure a filter to include tags for better organization and management:

```ts
const taggedFilter = await AWS.GuardDuty.Filter("TaggedFilter", {
  DetectorId: "12abc34de5678f90123456789ab0cdef",
  Name: "FilteredByTags",
  FindingCriteria: {
    Criterion: {
      "resource.accessKeyDetails.userName": {
        "Eq": ["admin"]
      }
    }
  },
  Description: "Filter for findings related to admin access",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ],
  Rank: 2
});
```

## Adoption of Existing Resources

Use the adopt option to create a filter while adopting an existing resource:

```ts
const existingFilter = await AWS.GuardDuty.Filter("ExistingFilter", {
  DetectorId: "12abc34de5678f90123456789ab0cdef",
  Name: "AdoptedFilter",
  FindingCriteria: {
    Criterion: {
      "type": {
        "Eq": ["UnauthorizedAccess:EC2/SSHBruteForce"]
      }
    }
  },
  Description: "Filter for SSH brute force attempts",
  adopt: true
});
``` 

## Dynamic Filter Configuration

Create a filter dynamically based on runtime parameters for flexibility:

```ts
const dynamicFilter = await AWS.GuardDuty.Filter("DynamicFilter", {
  DetectorId: "12abc34de5678f90123456789ab0cdef",
  Name: `DynamicFilter-${new Date().getTime()}`,
  FindingCriteria: {
    Criterion: {
      "resource.type": {
        "Eq": ["AWS::EC2::Instance"]
      }
    }
  },
  Description: "Filter for EC2 instance related findings",
  Tags: [
    { Key: "Project", Value: "SecurityEnhancement" }
  ],
  Rank: 3
});
```
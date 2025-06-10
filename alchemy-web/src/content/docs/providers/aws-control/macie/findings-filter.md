---
title: FindingsFilter
description: Learn how to create, update, and manage AWS Macie FindingsFilters using Alchemy Cloud Control.
---


The FindingsFilter resource lets you manage [AWS Macie FindingsFilters](https://docs.aws.amazon.com/macie/latest/userguide/) to filter out sensitive data findings based on specified criteria.

## Minimal Example

Create a basic FindingsFilter with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicFindingsFilter = await AWS.Macie.FindingsFilter("basicFindingsFilter", {
  Name: "SensitiveDataFilter",
  FindingCriteria: {
    Criterion: {
      "sensitivityScore": {
        "eq": [5]
      }
    }
  },
  Action: "ARCHIVE",
  Description: "Filter for highly sensitive data findings",
  Position: 1
});
```

## Advanced Configuration

Configure a FindingsFilter with tags for better resource management and a more complex finding criteria.

```ts
const advancedFindingsFilter = await AWS.Macie.FindingsFilter("advancedFindingsFilter", {
  Name: "ConfidentialDataFilter",
  FindingCriteria: {
    Criterion: {
      "sensitivityScore": {
        "gte": [3]
      },
      "resourceType": {
        "eq": ["AWS::S3::Bucket"]
      }
    }
  },
  Action: "ARCHIVE",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Department",
    Value: "Finance"
  }],
  Description: "Filter for sensitive data in production S3 buckets",
  Position: 2
});
```

## Filtering by Custom Criteria

Demonstrate how to create a FindingsFilter that uses custom criteria for filtering findings based on specific tags.

```ts
const customCriteriaFindingsFilter = await AWS.Macie.FindingsFilter("customCriteriaFindingsFilter", {
  Name: "TagBasedFilter",
  FindingCriteria: {
    Criterion: {
      "tags": {
        "contains": ["PII"]
      }
    }
  },
  Action: "ARCHIVE",
  Description: "Filter for findings that contain PII tags",
  Position: 3,
  Tags: [{
    Key: "Purpose",
    Value: "Compliance"
  }]
});
```

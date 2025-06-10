---
title: AllowList
description: Learn how to create, update, and manage AWS Macie AllowLists using Alchemy Cloud Control.
---


The AllowList resource lets you manage [AWS Macie AllowLists](https://docs.aws.amazon.com/macie/latest/userguide/) for identifying and allowing specific S3 objects based on defined criteria.

## Minimal Example

Create a basic AllowList with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicAllowList = await AWS.Macie.AllowList("basicAllowList", {
  name: "MyAllowList",
  description: "This is a simple allow list for sensitive data.",
  criteria: {
    s3BucketCriteria: {
      includes: ["arn:aws:s3:::my-sensitive-bucket"]
    }
  }
});
```

## Advanced Configuration

Configure an AllowList with specific tags and additional criteria for S3 buckets.

```ts
const advancedAllowList = await AWS.Macie.AllowList("advancedAllowList", {
  name: "AdvancedAllowList",
  description: "This allow list includes sensitive buckets and specific tags.",
  criteria: {
    s3BucketCriteria: {
      includes: ["arn:aws:s3:::my-other-bucket"],
      excludes: ["arn:aws:s3:::my-excluded-bucket"]
    }
  },
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Team",
      value: "Security"
    }
  ]
});
```

## Using Existing Resources

Create an AllowList that adopts an existing resource if it already exists.

```ts
const adoptAllowList = await AWS.Macie.AllowList("adoptAllowList", {
  name: "ExistingAllowList",
  description: "This allow list adopts an existing resource if available.",
  criteria: {
    s3BucketCriteria: {
      includes: ["arn:aws:s3:::my-legacy-bucket"]
    }
  },
  adopt: true
});
```

## Multi-Criteria AllowList

Create an AllowList that specifies multiple criteria for more granular control.

```ts
const multiCriteriaAllowList = await AWS.Macie.AllowList("multiCriteriaAllowList", {
  name: "MultiCriteriaAllowList",
  description: "Allow list with multiple criteria for various S3 buckets.",
  criteria: {
    s3BucketCriteria: {
      includes: [
        "arn:aws:s3:::my-first-bucket",
        "arn:aws:s3:::my-second-bucket"
      ],
      excludes: [
        "arn:aws:s3:::my-third-bucket"
      ]
    },
    objectCriteria: {
      includes: ["*.confidential"],
      excludes: ["*.tmp"]
    }
  }
});
```

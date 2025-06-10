---
title: AccessGrant
description: Learn how to create, update, and manage AWS S3 AccessGrants using Alchemy Cloud Control.
---


The AccessGrant resource lets you manage [AWS S3 AccessGrants](https://docs.aws.amazon.com/s3/latest/userguide/) for granting permissions to objects in S3 buckets.

## Minimal Example

Create an AccessGrant that allows a specified grantee to read objects in an S3 bucket.

```ts
import AWS from "alchemy/aws/control";

const accessGrant = await AWS.S3.AccessGrant("basicAccessGrant", {
  Grantee: {
    Type: "CanonicalUser",
    Id: "12345abcde67890fghij12345klmnopqrstuvwx"
  },
  Permission: "READ",
  AccessGrantsLocationId: "myBucketLocationId",
  AccessGrantsLocationConfiguration: {
    Bucket: "my-example-bucket",
    Prefix: "documents/"
  }
});
```

## Advanced Configuration

Set up an AccessGrant with additional properties including a specific application ARN and tags.

```ts
const advancedAccessGrant = await AWS.S3.AccessGrant("advancedAccessGrant", {
  Grantee: {
    Type: "Group",
    URI: "http://acs.amazonaws.com/groups/global/AllUsers"
  },
  Permission: "WRITE",
  AccessGrantsLocationId: "myBucketLocationId",
  ApplicationArn: "arn:aws:lambda:us-east-1:123456789012:function:myFunction",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "DataAnalytics"
    }
  ]
});
```

## Custom Prefix Type

Create an AccessGrant with a custom S3 prefix type for specific object path limitations.

```ts
const prefixAccessGrant = await AWS.S3.AccessGrant("prefixAccessGrant", {
  Grantee: {
    Type: "CanonicalUser",
    Id: "abcde12345fghij67890klmnopqrstuvwx"
  },
  Permission: "FULL_CONTROL",
  AccessGrantsLocationId: "myBucketLocationId",
  S3PrefixType: "SpecificPrefix",
  AccessGrantsLocationConfiguration: {
    Bucket: "my-example-bucket",
    Prefix: "images/uploads/"
  }
});
```

## Adoption of Existing Resource

Adopt an existing AccessGrant instead of failing if it already exists.

```ts
const adoptAccessGrant = await AWS.S3.AccessGrant("adoptedAccessGrant", {
  Grantee: {
    Type: "CanonicalUser",
    Id: "zyxwvutsrqponmlkjihgfedcba9876543210"
  },
  Permission: "READ",
  AccessGrantsLocationId: "myBucketLocationId",
  adopt: true
});
```

---
title: SequenceStore
description: Learn how to create, update, and manage AWS Omics SequenceStores using Alchemy Cloud Control.
---


The SequenceStore resource lets you manage [AWS Omics SequenceStores](https://docs.aws.amazon.com/omics/latest/userguide/) for storing and processing genomic data effectively.

## Minimal Example

Create a basic SequenceStore with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicSequenceStore = await AWS.Omics.SequenceStore("basic-sequence-store", {
  name: "HumanGenomes",
  description: "A SequenceStore for human genomic data"
});
```

## Advanced Configuration

Configure a SequenceStore with additional options such as access logging and SSE configuration.

```ts
const advancedSequenceStore = await AWS.Omics.SequenceStore("advanced-sequence-store", {
  name: "HumanGenomesSecure",
  description: "A secure SequenceStore for human genomic data",
  accessLogLocation: "s3://my-log-bucket/access-logs/",
  sseConfig: {
    sseAlgorithm: "AES256"
  },
  propagatedSetLevelTags: ["ProjectA", "Research"],
  tags: {
    Environment: "Production",
    Department: "Genomics"
  }
});
```

## Using S3 Access Policies

Create a SequenceStore with a specific S3 access policy to control permissions for data access.

```ts
const sequenceStoreWithPolicy = await AWS.Omics.SequenceStore("policy-sequence-store", {
  name: "SecureGenomicsStore",
  s3AccessPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyGenomicsRole"
        },
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-genomics-bucket/*"
      }
    ]
  }
});
```

## Fallback Location Example

Create a SequenceStore with a fallback location for data storage.

```ts
const sequenceStoreWithFallback = await AWS.Omics.SequenceStore("fallback-sequence-store", {
  name: "FallbackGenomicsStore",
  fallbackLocation: "s3://my-fallback-bucket/",
  description: "A SequenceStore with a fallback location for data storage"
});
``` 

## Adoption of Existing Resource

Create a SequenceStore that adopts an existing resource if it already exists.

```ts
const adoptedSequenceStore = await AWS.Omics.SequenceStore("adopted-sequence-store", {
  name: "AdoptedGenomicsStore",
  adopt: true,
  description: "This SequenceStore will adopt an existing resource if found"
});
```

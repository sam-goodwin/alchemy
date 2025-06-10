---
title: VariantStore
description: Learn how to create, update, and manage AWS Omics VariantStores using Alchemy Cloud Control.
---


The VariantStore resource lets you manage [AWS Omics VariantStores](https://docs.aws.amazon.com/omics/latest/userguide/) for storing and querying genomic variant data.

## Minimal Example

Create a basic VariantStore with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicVariantStore = await AWS.Omics.VariantStore("basic-variant-store", {
  name: "human-genome-variant-store",
  reference: {
    referenceArn: "arn:aws:omics:us-west-2:123456789012:reference/my-reference",
    referenceType: "GRCh38"
  },
  description: "A variant store for the human genome."
});
```

## Advanced Configuration

Configure a VariantStore with server-side encryption and tags for better organization.

```ts
const secureVariantStore = await AWS.Omics.VariantStore("secure-variant-store", {
  name: "secure-genome-variant-store",
  reference: {
    referenceArn: "arn:aws:omics:us-west-2:123456789012:reference/my-secure-reference",
    referenceType: "GRCh37"
  },
  sseConfig: {
    sseType: "AWS_KMS",
    kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-kms-key"
  },
  tags: {
    Project: "Genomics Research",
    Environment: "Production"
  }
});
```

## Adoption of Existing Resources

If you want to adopt an existing VariantStore instead of creating a new one, you can set the adopt property.

```ts
const adoptVariantStore = await AWS.Omics.VariantStore("adopt-variant-store", {
  name: "adopted-genome-variant-store",
  reference: {
    referenceArn: "arn:aws:omics:us-west-2:123456789012:reference/my-adopted-reference",
    referenceType: "GRCh38"
  },
  adopt: true // Adopts an existing resource if it already exists
});
```

## Tags for Organization

Create a VariantStore with multiple tags for enhanced management.

```ts
const taggedVariantStore = await AWS.Omics.VariantStore("tagged-variant-store", {
  name: "tagged-genome-variant-store",
  reference: {
    referenceArn: "arn:aws:omics:us-west-2:123456789012:reference/my-tagged-reference",
    referenceType: "GRCh38"
  },
  tags: {
    Department: "Genomics",
    Owner: "Dr. Smith",
    Status: "Active"
  }
});
```

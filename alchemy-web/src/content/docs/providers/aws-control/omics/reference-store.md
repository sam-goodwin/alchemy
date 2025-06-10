---
title: ReferenceStore
description: Learn how to create, update, and manage AWS Omics ReferenceStores using Alchemy Cloud Control.
---


The ReferenceStore resource allows you to manage [AWS Omics ReferenceStores](https://docs.aws.amazon.com/omics/latest/userguide/) for storing and organizing reference data used in genomics workflows.

## Minimal Example

Create a basic ReferenceStore with the required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const referenceStore = await AWS.Omics.ReferenceStore("myReferenceStore", {
  name: "HumanGenome",
  description: "A reference store for the human genome"
});
```

## Advanced Configuration

Configure a ReferenceStore with server-side encryption settings and tags for better organization.

```ts
const secureReferenceStore = await AWS.Omics.ReferenceStore("secureReferenceStore", {
  name: "SecureHumanGenome",
  description: "A reference store for the human genome with encryption",
  sseConfig: {
    type: "AWS_KMS",
    keyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-ef00-1234-5678-9abcdef01234"
  },
  tags: {
    Environment: "Production",
    Project: "Genomics"
  }
});
```

## Using Existing Resources

If you need to adopt an existing ReferenceStore instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const existingReferenceStore = await AWS.Omics.ReferenceStore("existingReferenceStore", {
  name: "ExistingHumanGenome",
  adopt: true
});
```

## Custom Tagging Strategy

Create a ReferenceStore with a comprehensive tagging strategy for better resource management.

```ts
const taggedReferenceStore = await AWS.Omics.ReferenceStore("taggedReferenceStore", {
  name: "TaggedHumanGenome",
  description: "A reference store for the human genome with extensive tagging",
  tags: {
    Owner: "DataScienceTeam",
    Purpose: "Research",
    Compliance: "Regulatory"
  }
});
```

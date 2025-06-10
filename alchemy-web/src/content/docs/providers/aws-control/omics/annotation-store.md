---
title: AnnotationStore
description: Learn how to create, update, and manage AWS Omics AnnotationStores using Alchemy Cloud Control.
---


The AnnotationStore resource lets you manage [AWS Omics AnnotationStores](https://docs.aws.amazon.com/omics/latest/userguide/) for storing genomic annotations and enhancing data analysis workflows.

## Minimal Example

Create a basic AnnotationStore with required properties and an optional description:

```ts
import AWS from "alchemy/aws/control";

const basicAnnotationStore = await AWS.Omics.AnnotationStore("basicAnnotationStore", {
  name: "HumanGenomeAnnotations",
  storeFormat: "JSON",
  description: "A store for human genome annotations"
});
```

## Advanced Configuration

Configure an AnnotationStore with additional settings like server-side encryption and reference items:

```ts
const advancedAnnotationStore = await AWS.Omics.AnnotationStore("advancedAnnotationStore", {
  name: "CancerGenomeAnnotations",
  storeFormat: "JSON",
  description: "A store for cancer-related genomic annotations",
  sseConfig: {
    type: "AES256"
  },
  reference: {
    referenceArn: "arn:aws:omics:us-west-2:123456789012:reference/my-reference"
  },
  tags: {
    project: "CancerResearch",
    owner: "genomics-team"
  }
});
```

## Using Store Options

Create an AnnotationStore with specific store options to customize performance and storage:

```ts
const optionsAnnotationStore = await AWS.Omics.AnnotationStore("optionsAnnotationStore", {
  name: "OptionsBasedAnnotations",
  storeFormat: "JSON",
  storeOptions: {
    maxSize: 1024, // Size in MB
    compression: "GZIP"
  },
  description: "An annotation store with specific options for performance optimization"
});
```

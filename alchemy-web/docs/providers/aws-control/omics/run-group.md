---
title: Managing AWS Omics RunGroups with Alchemy
description: Learn how to create, update, and manage AWS Omics RunGroups using Alchemy Cloud Control.
---

# RunGroup

The RunGroup resource lets you manage [AWS Omics RunGroups](https://docs.aws.amazon.com/omics/latest/userguide/) for running genomics workflows with specific resource configurations.

## Minimal Example

Create a basic RunGroup with required properties and some common optional parameters.

```ts
import AWS from "alchemy/aws/control";

const basicRunGroup = await AWS.Omics.RunGroup("BasicRunGroup", {
  Name: "GenomicsAnalysisGroup",
  MaxDuration: 3600, // Duration in seconds
  MaxCpus: 4, // Maximum number of CPUs
  MaxGpus: 1 // Maximum number of GPUs
});
```

## Advanced Configuration

Configure a RunGroup with additional resource limits and tags for better management.

```ts
const advancedRunGroup = await AWS.Omics.RunGroup("AdvancedRunGroup", {
  Name: "AdvancedGenomicsGroup",
  MaxDuration: 7200, // Duration in seconds
  MaxCpus: 8, // Maximum number of CPUs
  MaxGpus: 2, // Maximum number of GPUs
  MaxRuns: 5, // Maximum number of concurrent runs
  Tags: [
    { Key: "Project", Value: "GenomicsResearch" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Using Adoption Feature

Create a RunGroup that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedRunGroup = await AWS.Omics.RunGroup("AdoptedRunGroup", {
  Name: "ExistingGenomicsGroup",
  MaxDuration: 1800, // Duration in seconds
  MaxCpus: 2, // Maximum number of CPUs
  MaxGpus: 1, // Maximum number of GPUs
  adopt: true // Adopt existing resource if it exists
});
```

## Example with Custom Resource Limits

Define a RunGroup with custom resource limits to optimize performance for a specific workload.

```ts
const customLimitsRunGroup = await AWS.Omics.RunGroup("CustomLimitsRunGroup", {
  Name: "CustomResourceGroup",
  MaxDuration: 5400, // Duration in seconds
  MaxCpus: 16, // Maximum number of CPUs
  MaxGpus: 4, // Maximum number of GPUs
  MaxRuns: 10, // Maximum number of concurrent runs
  Tags: [
    { Key: "Application", Value: "GenomicsPipeline" },
    { Key: "Owner", Value: "BioinformaticsTeam" }
  ]
});
```
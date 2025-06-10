---
title: RunGroup
description: Learn how to create, update, and manage AWS Omics RunGroups using Alchemy Cloud Control.
---


The RunGroup resource allows you to manage AWS Omics RunGroups, which are essential for organizing and executing bioinformatics workflows. For more details, refer to the [AWS Omics RunGroups documentation](https://docs.aws.amazon.com/omics/latest/userguide/).

## Minimal Example

Create a basic RunGroup with essential properties such as maximum runs and CPUs.

```ts
import AWS from "alchemy/aws/control";

const basicRunGroup = await AWS.Omics.RunGroup("basicRunGroup", {
  maxRuns: 5,
  maxCpus: 4,
  name: "Basic Run Group"
});
```

## Advanced Configuration

Configure a RunGroup with additional parameters like maximum GPUs and duration for more complex workflows.

```ts
const advancedRunGroup = await AWS.Omics.RunGroup("advancedRunGroup", {
  maxRuns: 10,
  maxCpus: 8,
  maxGpus: 2,
  maxDuration: 3600, // Max duration in seconds
  name: "Advanced Run Group"
});
```

## Tagging for Resource Management

Utilize tags to help manage and categorize your RunGroup resources effectively.

```ts
const taggedRunGroup = await AWS.Omics.RunGroup("taggedRunGroup", {
  maxRuns: 3,
  tags: {
    Environment: "Production",
    Project: "GenomicAnalysis"
  }
});
```

## Adoption of Existing Resources

Adopt an existing RunGroup resource if it already exists in the environment, avoiding failure during creation.

```ts
const adoptRunGroup = await AWS.Omics.RunGroup("adoptRunGroup", {
  maxRuns: 7,
  adopt: true, // Allows adopting existing resources
  name: "Adopted Run Group"
});
```

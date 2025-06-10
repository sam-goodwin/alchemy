---
title: Workflow
description: Learn how to create, update, and manage AWS Glue Workflows using Alchemy Cloud Control.
---


The Workflow resource lets you manage [AWS Glue Workflows](https://docs.aws.amazon.com/glue/latest/userguide/) for orchestrating complex ETL (Extract, Transform, Load) processes.

## Minimal Example

Create a basic AWS Glue Workflow with a name and description:

```ts
import AWS from "alchemy/aws/control";

const basicWorkflow = await AWS.Glue.Workflow("basicWorkflow", {
  name: "DataProcessingWorkflow",
  description: "A workflow for processing data from various sources.",
  maxConcurrentRuns: 2
});
```

## Advanced Configuration

Configure an AWS Glue Workflow with additional properties like default run properties and tags:

```ts
const advancedWorkflow = await AWS.Glue.Workflow("advancedWorkflow", {
  name: "AdvancedDataWorkflow",
  description: "An advanced workflow with custom properties.",
  defaultRunProperties: {
    "key1": "value1",
    "key2": "value2"
  },
  tags: {
    "Environment": "Production",
    "Team": "DataScience"
  },
  maxConcurrentRuns: 5
});
```

## Adoption of Existing Resource

Create a workflow that adopts an existing resource instead of failing if it already exists:

```ts
const adoptedWorkflow = await AWS.Glue.Workflow("adoptedWorkflow", {
  name: "ExistingWorkflow",
  description: "This workflow adopts an existing Glue Workflow.",
  adopt: true
});
```

## Workflow with Detailed Run Properties

Set up a workflow that utilizes detailed run properties for customized execution:

```ts
const detailedRunPropertiesWorkflow = await AWS.Glue.Workflow("detailedRunPropertiesWorkflow", {
  name: "DetailedRunPropertiesWorkflow",
  description: "Workflow with specific run properties.",
  defaultRunProperties: {
    "source": "S3Bucket",
    "format": "CSV"
  },
  maxConcurrentRuns: 3
});
```

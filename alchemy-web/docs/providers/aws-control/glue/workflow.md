---
title: Managing AWS Glue Workflows with Alchemy
description: Learn how to create, update, and manage AWS Glue Workflows using Alchemy Cloud Control.
---

# Workflow

The Workflow resource allows you to manage [AWS Glue Workflows](https://docs.aws.amazon.com/glue/latest/userguide/) for orchestrating ETL (Extract, Transform, Load) activities in a serverless environment.

## Minimal Example

Create a basic AWS Glue Workflow with a name and description.

```ts
import AWS from "alchemy/aws/control";

const GlueWorkflow = await AWS.Glue.Workflow("BasicGlueWorkflow", {
  Name: "ETLWorkflow",
  Description: "Workflow to manage ETL processes",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure a Glue Workflow with default run properties and maximum concurrent runs.

```ts
const AdvancedGlueWorkflow = await AWS.Glue.Workflow("AdvancedGlueWorkflow", {
  Name: "AdvancedETLWorkflow",
  Description: "Advanced workflow for complex ETL processes",
  DefaultRunProperties: {
    "Property1": "Value1",
    "Property2": "Value2"
  },
  MaxConcurrentRuns: 5,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Adoption of Existing Resource

Create a Glue Workflow and adopt an existing resource if it already exists.

```ts
const ExistingGlueWorkflow = await AWS.Glue.Workflow("ExistingGlueWorkflow", {
  Name: "ExistingETLWorkflow",
  Description: "Workflow that adopts an existing Glue Workflow",
  adopt: true
});
```

## Workflow with Default Run Properties

Create a Glue Workflow that utilizes specific default run properties.

```ts
const WorkflowWithRunProperties = await AWS.Glue.Workflow("RunPropertiesWorkflow", {
  Name: "RunPropertiesETLWorkflow",
  Description: "Workflow with specific default run properties.",
  DefaultRunProperties: {
    "Timeout": "600", // Maximum timeout in seconds
    "RetryAttempts": "3" // Number of retry attempts on failure
  }
});
```
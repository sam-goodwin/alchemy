---
title: Pipeline
description: Learn how to create, update, and manage AWS SageMaker Pipelines using Alchemy Cloud Control.
---


The Pipeline resource lets you create and manage [AWS SageMaker Pipelines](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for orchestrating complex machine learning workflows.

## Minimal Example

Create a basic SageMaker Pipeline with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const simplePipeline = await AWS.SageMaker.Pipeline("simplePipeline", {
  PipelineName: "SimplePipeline",
  PipelineDescription: "A simple pipeline for demonstration purposes.",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerRole",
  PipelineDefinition: {
    // Define the pipeline steps and configurations here
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "Machine Learning" }
  ]
});
```

## Advanced Configuration

Configure a pipeline with parallelism settings and a display name.

```ts
const advancedPipeline = await AWS.SageMaker.Pipeline("advancedPipeline", {
  PipelineName: "AdvancedPipeline",
  PipelineDisplayName: "Advanced ML Pipeline",
  PipelineDescription: "An advanced pipeline with parallel tasks.",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerRole",
  ParallelismConfiguration: {
    MaxParallelExecution: 5, // Limit the maximum parallel executions
    MaxConcurrentExecutions: 10 // Limit the number of concurrent executions
  },
  PipelineDefinition: {
    // Define the pipeline steps and configurations here
  }
});
```

## Adoption of Existing Resources

Adopt an existing pipeline instead of creating a new one if it already exists.

```ts
const adoptPipeline = await AWS.SageMaker.Pipeline("adoptPipeline", {
  PipelineName: "ExistingPipeline",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerRole",
  adopt: true, // Set to true to adopt the existing resource
  PipelineDefinition: {
    // Define the pipeline steps and configurations here
  }
});
```

## Complete Pipeline Definition

Demonstrate a pipeline with a complete definition including steps and parameters.

```ts
const completePipeline = await AWS.SageMaker.Pipeline("completePipeline", {
  PipelineName: "CompleteMLPipeline",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerRole",
  PipelineDefinition: {
    PipelineDefinition: {
      PipelineSteps: [
        {
          Name: "DataPreprocessing",
          Type: "Processing",
          Arguments: {
            // Specify arguments for processing step
          }
        },
        {
          Name: "ModelTraining",
          Type: "Training",
          Arguments: {
            // Specify arguments for training step
          }
        },
        {
          Name: "ModelEvaluation",
          Type: "Evaluation",
          Arguments: {
            // Specify arguments for evaluation step
          }
        }
      ]
    }
  }
});
```

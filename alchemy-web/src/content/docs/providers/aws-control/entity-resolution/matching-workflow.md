---
title: MatchingWorkflow
description: Learn how to create, update, and manage AWS EntityResolution MatchingWorkflows using Alchemy Cloud Control.
---


The MatchingWorkflow resource allows you to create and manage [AWS EntityResolution MatchingWorkflows](https://docs.aws.amazon.com/entityresolution/latest/userguide/) for identifying and resolving entities within your data sets.

## Minimal Example

Create a basic matching workflow with required properties and one optional description:

```ts
import AWS from "alchemy/aws/control";

const basicMatchingWorkflow = await AWS.EntityResolution.MatchingWorkflow("basicMatchingWorkflow", {
  ResolutionTechniques: {
    Matching: {
      Threshold: 0.8,
      Similarity: "Jaccard"
    }
  },
  Description: "A basic matching workflow to resolve entities.",
  InputSourceConfig: [
    {
      SourceType: "S3",
      SourcePath: "s3://my-bucket/input-data/"
    }
  ],
  WorkflowName: "BasicMatchingWorkflow",
  OutputSourceConfig: [
    {
      DestinationType: "S3",
      DestinationPath: "s3://my-bucket/output-data/"
    }
  ],
  RoleArn: "arn:aws:iam::123456789012:role/MyMatchingWorkflowRole"
});
```

## Advanced Configuration

Configure a matching workflow with incremental run configuration and tags for better organization:

```ts
const advancedMatchingWorkflow = await AWS.EntityResolution.MatchingWorkflow("advancedMatchingWorkflow", {
  ResolutionTechniques: {
    Matching: {
      Threshold: 0.85,
      Similarity: "Cosine"
    }
  },
  Description: "An advanced matching workflow with incremental run configuration.",
  InputSourceConfig: [
    {
      SourceType: "S3",
      SourcePath: "s3://my-bucket/input-data/"
    }
  ],
  WorkflowName: "AdvancedMatchingWorkflow",
  IncrementalRunConfig: {
    StartTime: "2023-01-01T00:00:00Z",
    EndTime: "2023-12-31T23:59:59Z"
  },
  OutputSourceConfig: [
    {
      DestinationType: "S3",
      DestinationPath: "s3://my-bucket/output-data/"
    }
  ],
  RoleArn: "arn:aws:iam::123456789012:role/MyMatchingWorkflowRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "EntityResolution" }
  ]
});
```

## Using Existing Resources

Set the `adopt` property to true to adopt an existing matching workflow instead of failing if it already exists:

```ts
const adoptedMatchingWorkflow = await AWS.EntityResolution.MatchingWorkflow("adoptedMatchingWorkflow", {
  ResolutionTechniques: {
    Matching: {
      Threshold: 0.75,
      Similarity: "Levenshtein"
    }
  },
  WorkflowName: "AdoptedMatchingWorkflow",
  InputSourceConfig: [
    {
      SourceType: "RDS",
      SourcePath: "my-database-instance"
    }
  ],
  OutputSourceConfig: [
    {
      DestinationType: "RDS",
      DestinationPath: "my-output-database"
    }
  ],
  RoleArn: "arn:aws:iam::123456789012:role/MyMatchingWorkflowRole",
  adopt: true
});
```

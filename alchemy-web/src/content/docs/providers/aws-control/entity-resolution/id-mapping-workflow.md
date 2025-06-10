---
title: IdMappingWorkflow
description: Learn how to create, update, and manage AWS EntityResolution IdMappingWorkflows using Alchemy Cloud Control.
---


The IdMappingWorkflow resource allows you to create and manage workflows for mapping entity identifiers in AWS EntityResolution. For more detailed information, refer to the [AWS EntityResolution IdMappingWorkflows documentation](https://docs.aws.amazon.com/entityresolution/latest/userguide/).

## Minimal Example

Create a basic IdMappingWorkflow with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicIdMappingWorkflow = await AWS.EntityResolution.IdMappingWorkflow("basicIdMappingWorkflow", {
  WorkflowName: "BasicIdMappingWorkflow",
  InputSourceConfig: [
    {
      SourceType: "S3",
      SourceUri: "s3://my-bucket/input-data/"
    }
  ],
  IdMappingTechniques: {
    Technique: "FuzzyMatching"
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyEntityResolutionRole",
  Description: "A basic IdMappingWorkflow for demonstration purposes."
});
```

## Advanced Configuration

Configure an IdMappingWorkflow with output source settings and multiple input sources:

```ts
const advancedIdMappingWorkflow = await AWS.EntityResolution.IdMappingWorkflow("advancedIdMappingWorkflow", {
  WorkflowName: "AdvancedIdMappingWorkflow",
  InputSourceConfig: [
    {
      SourceType: "S3",
      SourceUri: "s3://my-bucket/input-data/"
    },
    {
      SourceType: "Database",
      SourceUri: "jdbc:mysql://my-database:3306/mydb"
    }
  ],
  IdMappingTechniques: {
    Technique: "ExactMatching"
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyEntityResolutionRole",
  OutputSourceConfig: [
    {
      DestinationType: "S3",
      DestinationUri: "s3://my-bucket/output-data/"
    }
  ],
  Tags: [
    { Key: "Project", Value: "EntityResolution" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Using Existing Resources

If you want to create a workflow that adopts an existing resource instead of failing, set the adopt property to true:

```ts
const adoptIdMappingWorkflow = await AWS.EntityResolution.IdMappingWorkflow("adoptIdMappingWorkflow", {
  WorkflowName: "AdoptExistingWorkflow",
  InputSourceConfig: [
    {
      SourceType: "S3",
      SourceUri: "s3://my-bucket/input-data/"
    }
  ],
  IdMappingTechniques: {
    Technique: "FuzzyMatching"
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyEntityResolutionRole",
  adopt: true
});
```

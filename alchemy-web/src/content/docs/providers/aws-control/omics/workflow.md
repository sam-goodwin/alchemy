---
title: Workflow
description: Learn how to create, update, and manage AWS Omics Workflows using Alchemy Cloud Control.
---


The Workflow resource allows you to create, manage, and update [AWS Omics Workflows](https://docs.aws.amazon.com/omics/latest/userguide/) for executing bioinformatics applications and data processing tasks.

## Minimal Example

Create a basic Omics Workflow with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicWorkflow = await AWS.Omics.Workflow("basicWorkflow", {
  Name: "RNASeqAnalysis",
  DefinitionUri: "s3://my-bucket/definitions/rnaseq.cwl",
  Main: "main.cwl",
  ParameterTemplate: {
    readFiles: ["s3://my-bucket/reads/sample1.fastq", "s3://my-bucket/reads/sample2.fastq"]
  }
});
```

## Advanced Configuration

Configure a Workflow with additional options, such as storage capacity and tags.

```ts
const advancedWorkflow = await AWS.Omics.Workflow("advancedWorkflow", {
  Name: "WholeGenomeSequencing",
  DefinitionUri: "s3://my-bucket/definitions/wgs.cwl",
  Main: "main.cwl",
  ParameterTemplate: {
    genomeReference: "s3://my-bucket/references/genome.fa",
    qualityThreshold: 30
  },
  StorageCapacity: 100, // in GiB
  Tags: {
    project: "Genomics",
    owner: "bioinformatics_team"
  }
});
```

## Using Accelerators

Create a Workflow that utilizes AWS Omics accelerators for improved performance.

```ts
const acceleratedWorkflow = await AWS.Omics.Workflow("acceleratedWorkflow", {
  Name: "VariantCalling",
  DefinitionUri: "s3://my-bucket/definitions/variant_calling.cwl",
  Main: "main.cwl",
  ParameterTemplate: {
    inputBam: "s3://my-bucket/aligned/sample.bam",
    outputVcf: "s3://my-bucket/variants/sample.vcf"
  },
  Accelerators: "SAGEMAKER" // Using SageMaker for acceleration
});
```

## Resource Adoption

If you want to adopt an existing Workflow resource instead of failing if it already exists, use the adopt property.

```ts
const adoptedWorkflow = await AWS.Omics.Workflow("adoptedWorkflow", {
  Name: "AdoptedWorkflow",
  DefinitionUri: "s3://my-bucket/definitions/adopted_workflow.cwl",
  Main: "main.cwl",
  ParameterTemplate: {
    inputData: "s3://my-bucket/input/data.json"
  },
  adopt: true // Adopt existing resource
});
```

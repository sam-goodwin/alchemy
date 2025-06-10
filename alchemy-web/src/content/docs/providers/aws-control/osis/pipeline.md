---
title: Pipeline
description: Learn how to create, update, and manage AWS OSIS Pipelines using Alchemy Cloud Control.
---


The Pipeline resource lets you create and manage [AWS OSIS Pipelines](https://docs.aws.amazon.com/osis/latest/userguide/) for orchestrating data processing workflows.

## Minimal Example

Create a basic OSIS Pipeline with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPipeline = await AWS.OSIS.Pipeline("basicPipeline", {
  PipelineName: "DataProcessingPipeline",
  PipelineConfigurationBody: JSON.stringify({
    source: {
      type: "s3",
      uri: "s3://my-data-bucket/input/"
    },
    destination: {
      type: "s3",
      uri: "s3://my-data-bucket/output/"
    }
  }),
  MinUnits: 1,
  MaxUnits: 10,
  BufferOptions: {
    BufferSize: 100,
    BufferInterval: 60
  }
});
```

## Advanced Configuration

Configure a pipeline with encryption at rest and logging options for better security and monitoring.

```ts
const advancedPipeline = await AWS.OSIS.Pipeline("advancedPipeline", {
  PipelineName: "SecureDataProcessingPipeline",
  PipelineConfigurationBody: JSON.stringify({
    source: {
      type: "kinesis",
      streamName: "myKinesisStream"
    },
    destination: {
      type: "redshift",
      clusterId: "myRedshiftCluster",
      database: "myDatabase",
      table: "myTable"
    }
  }),
  MinUnits: 2,
  MaxUnits: 20,
  EncryptionAtRestOptions: {
    Enabled: true,
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd1234"
  },
  LogPublishingOptions: {
    PipelineLogLevel: "INFO",
    CloudWatchLogGroup: "myLogGroup",
    CloudWatchLogStream: "myLogStream"
  }
});
```

## Using VPC Options

Create a pipeline that uses VPC options for enhanced security by restricting access to a specific VPC.

```ts
const vpcPipeline = await AWS.OSIS.Pipeline("vpcPipeline", {
  PipelineName: "VpcRestrictedPipeline",
  PipelineConfigurationBody: JSON.stringify({
    source: {
      type: "http",
      uri: "https://api.example.com/data"
    },
    destination: {
      type: "s3",
      uri: "s3://my-secure-bucket/output/"
    }
  }),
  MinUnits: 1,
  MaxUnits: 5,
  VpcOptions: {
    SubnetIds: ["subnet-0bb1c79c", "subnet-0bb1c79d"],
    SecurityGroupIds: ["sg-0c1234567890abcdef"]
  }
});
```

## Tagging Pipelines

Create a pipeline with tags for better resource management and cost tracking.

```ts
const taggedPipeline = await AWS.OSIS.Pipeline("taggedPipeline", {
  PipelineName: "TaggedDataProcessingPipeline",
  PipelineConfigurationBody: JSON.stringify({
    source: {
      type: "s3",
      uri: "s3://my-data-bucket/input/"
    },
    destination: {
      type: "s3",
      uri: "s3://my-data-bucket/output/"
    }
  }),
  MinUnits: 1,
  MaxUnits: 10,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataProcessing" }
  ]
});
```

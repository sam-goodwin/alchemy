---
title: ModelExplainabilityJobDefinition
description: Learn how to create, update, and manage AWS SageMaker ModelExplainabilityJobDefinitions using Alchemy Cloud Control.
---


The ModelExplainabilityJobDefinition resource allows you to create and manage model explainability jobs in AWS SageMaker for your machine learning models. For more detailed information, please refer to the [AWS SageMaker ModelExplainabilityJobDefinitions documentation](https://docs.aws.amazon.com/sagemaker/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic ModelExplainabilityJobDefinition with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const modelExplainabilityJob = await AWS.SageMaker.ModelExplainabilityJobDefinition("basicExplainabilityJob", {
  ModelExplainabilityJobOutputConfig: {
    S3OutputPath: "s3://my-bucket/explainability-output/"
  },
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ModelExplainabilityJobInput: {
    EndpointName: "my-endpoint",
    S3DataSource: {
      S3DataType: "ManifestFile",
      S3Uri: "s3://my-bucket/data/input/"
    }
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 30
    }
  }
});
```

## Advanced Configuration

This example demonstrates how to configure the ModelExplainabilityJobDefinition with additional advanced settings, such as a stopping condition and network configuration.

```ts
const advancedExplainabilityJob = await AWS.SageMaker.ModelExplainabilityJobDefinition("advancedExplainabilityJob", {
  ModelExplainabilityJobOutputConfig: {
    S3OutputPath: "s3://my-bucket/explainability-output/"
  },
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ModelExplainabilityJobInput: {
    EndpointName: "my-endpoint",
    S3DataSource: {
      S3DataType: "ManifestFile",
      S3Uri: "s3://my-bucket/data/input/"
    }
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 30
    }
  },
  StoppingCondition: {
    MaxRuntimeInSeconds: 3600
  },
  NetworkConfig: {
    EnableInterContainerTrafficEncryption: true,
    VpcConfig: {
      SecurityGroupIds: ["sg-0123456789abcdef0"],
      Subnets: ["subnet-0123456789abcdef0"]
    }
  }
});
```

## Using Baseline Configuration

This example shows how to include a ModelExplainabilityBaselineConfig for baseline metrics to compare against.

```ts
const baselineExplainabilityJob = await AWS.SageMaker.ModelExplainabilityJobDefinition("baselineExplainabilityJob", {
  ModelExplainabilityJobOutputConfig: {
    S3OutputPath: "s3://my-bucket/explainability-output/"
  },
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ModelExplainabilityJobInput: {
    EndpointName: "my-endpoint",
    S3DataSource: {
      S3DataType: "ManifestFile",
      S3Uri: "s3://my-bucket/data/input/"
    }
  },
  ModelExplainabilityBaselineConfig: {
    BaselineConfig: {
      S3Uri: "s3://my-bucket/baseline/",
      BaselineType: "Model"
    }
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 30
    }
  }
});
```

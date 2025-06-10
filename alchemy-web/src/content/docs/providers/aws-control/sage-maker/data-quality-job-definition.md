---
title: DataQualityJobDefinition
description: Learn how to create, update, and manage AWS SageMaker DataQualityJobDefinitions using Alchemy Cloud Control.
---


The DataQualityJobDefinition resource lets you create and manage [AWS SageMaker DataQualityJobDefinitions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) that define the inputs, outputs, and settings for running data quality monitoring jobs on your datasets.

## Minimal Example

This example demonstrates how to create a basic DataQualityJobDefinition with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const dataQualityJobDefinition = await AWS.SageMaker.DataQualityJobDefinition("basicDataQualityJob", {
  DataQualityJobInput: {
    S3Input: {
      S3Uri: "s3://my-bucket/data",
      LocalPath: "/data/input",
      ContentType: "application/json"
    }
  },
  DataQualityAppSpecification: {
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-data-quality-image:latest",
    ContainerEntrypoint: ["python3", "data_quality_script.py"],
    ContainerArguments: ["--input", "/data/input"]
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 20
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role",
  DataQualityJobOutputConfig: {
    S3Output: {
      S3Uri: "s3://my-bucket/output",
      LocalPath: "/data/output"
    }
  },
  EndpointName: "my-endpoint"
});
```

## Advanced Configuration

This example illustrates how to configure a DataQualityJobDefinition with additional advanced settings like a stopping condition and network configuration.

```ts
const advancedDataQualityJobDefinition = await AWS.SageMaker.DataQualityJobDefinition("advancedDataQualityJob", {
  DataQualityJobInput: {
    S3Input: {
      S3Uri: "s3://my-bucket/data",
      LocalPath: "/data/input",
      ContentType: "application/json"
    }
  },
  DataQualityAppSpecification: {
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-data-quality-image:latest",
    ContainerEntrypoint: ["python3", "data_quality_script.py"],
    ContainerArguments: ["--input", "/data/input"]
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 20
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role",
  DataQualityJobOutputConfig: {
    S3Output: {
      S3Uri: "s3://my-bucket/output",
      LocalPath: "/data/output"
    }
  },
  StoppingCondition: {
    MaxRuntimeInSeconds: 3600
  },
  NetworkConfig: {
    EnableNetworkIsolation: true,
    VpcConfig: {
      SecurityGroupIds: ["sg-0abcd1234efgh5678"],
      Subnets: ["subnet-0abcd1234efgh5678"]
    }
  }
});
```

## Using Tags

This example demonstrates how to create a DataQualityJobDefinition with tags for better resource management and tracking.

```ts
const taggedDataQualityJobDefinition = await AWS.SageMaker.DataQualityJobDefinition("taggedDataQualityJob", {
  DataQualityJobInput: {
    S3Input: {
      S3Uri: "s3://my-bucket/data",
      LocalPath: "/data/input",
      ContentType: "application/json"
    }
  },
  DataQualityAppSpecification: {
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-data-quality-image:latest",
    ContainerEntrypoint: ["python3", "data_quality_script.py"],
    ContainerArguments: ["--input", "/data/input"]
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 20
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role",
  DataQualityJobOutputConfig: {
    S3Output: {
      S3Uri: "s3://my-bucket/output",
      LocalPath: "/data/output"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

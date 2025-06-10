---
title: ModelBiasJobDefinition
description: Learn how to create, update, and manage AWS SageMaker ModelBiasJobDefinitions using Alchemy Cloud Control.
---


The ModelBiasJobDefinition resource allows you to define and manage model bias monitoring jobs in AWS SageMaker. This resource is essential for ensuring that your machine learning models are not exhibiting unintended biases. For more information, refer to the [AWS SageMaker ModelBiasJobDefinitions documentation](https://docs.aws.amazon.com/sagemaker/latest/userguide/).

## Minimal Example

Create a basic ModelBiasJobDefinition with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const modelBiasJob = await AWS.SageMaker.ModelBiasJobDefinition("basicModelBiasJob", {
  ModelBiasJobInput: {
    DataConfig: [{
      DataSource: {
        S3DataSource: {
          S3DataType: "S3Prefix",
          S3Uri: "s3://my-bucket/model-input-data"
        }
      },
      ContentType: "text/csv",
      InputFormat: "CSV"
    }],
    LabelAttribute: "label",
    EndpointName: "my-endpoint"
  },
  ModelBiasJobOutputConfig: {
    S3OutputPath: "s3://my-bucket/model-bias-output"
  },
  JobResources: {
    S3MonitoringResources: {
      S3Uri: "s3://my-bucket/monitoring-resources"
    },
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 30
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20210101T000001"
});
```

## Advanced Configuration

Define additional properties like stopping conditions and network configurations for a more advanced setup:

```ts
const advancedModelBiasJob = await AWS.SageMaker.ModelBiasJobDefinition("advancedModelBiasJob", {
  ModelBiasJobInput: {
    DataConfig: [{
      DataSource: {
        S3DataSource: {
          S3DataType: "S3Prefix",
          S3Uri: "s3://my-bucket/model-input-data"
        }
      },
      ContentType: "application/json",
      InputFormat: "JSON"
    }],
    LabelAttribute: "label",
    EndpointName: "my-advanced-endpoint"
  },
  ModelBiasJobOutputConfig: {
    S3OutputPath: "s3://my-bucket/advanced-model-bias-output"
  },
  JobResources: {
    S3MonitoringResources: {
      S3Uri: "s3://my-bucket/advanced-monitoring-resources"
    },
    ClusterConfig: {
      InstanceType: "ml.m5.2xlarge",
      InstanceCount: 2,
      VolumeSizeInGB: 50
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20210101T000001",
  StoppingCondition: {
    MaxRuntimeInSeconds: 3600
  },
  NetworkConfig: {
    EnableNetworkIsolation: true,
    VpcConfig: {
      SecurityGroupIds: ["sg-0123456789abcdef0"],
      Subnets: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"]
    }
  }
});
```

## Using Baseline Configuration

Configure a model bias job with a baseline configuration to compare against:

```ts
const baselineModelBiasJob = await AWS.SageMaker.ModelBiasJobDefinition("baselineModelBiasJob", {
  ModelBiasJobInput: {
    DataConfig: [{
      DataSource: {
        S3DataSource: {
          S3DataType: "S3Prefix",
          S3Uri: "s3://my-bucket/model-input-data"
        }
      },
      ContentType: "text/csv",
      InputFormat: "CSV"
    }],
    LabelAttribute: "label",
    EndpointName: "my-baseline-endpoint"
  },
  ModelBiasJobOutputConfig: {
    S3OutputPath: "s3://my-bucket/baseline-model-bias-output"
  },
  JobResources: {
    S3MonitoringResources: {
      S3Uri: "s3://my-bucket/baseline-monitoring-resources"
    },
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 30
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20210101T000001",
  ModelBiasBaselineConfig: {
    BaselineS3Uri: "s3://my-bucket/model-bias-baseline",
    Constraints: {
      MaxBias: 0.1
    }
  }
});
```

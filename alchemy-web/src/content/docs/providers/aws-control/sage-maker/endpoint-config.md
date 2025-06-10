---
title: EndpointConfig
description: Learn how to create, update, and manage AWS SageMaker EndpointConfigs using Alchemy Cloud Control.
---


The EndpointConfig resource lets you manage [AWS SageMaker EndpointConfigs](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning models at scale.

## Minimal Example

Create a basic EndpointConfig with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicEndpointConfig = await AWS.SageMaker.EndpointConfig("basic-endpoint-config", {
  ProductionVariants: [{
    VariantName: "AllTraffic",
    ModelName: "my-model",
    InitialInstanceCount: 1,
    InstanceType: "ml.m5.large"
  }],
  DataCaptureConfig: {
    CaptureOptions: [{ CaptureMode: "Input" }],
    DestinationS3Uri: "s3://my-data-capture-bucket/",
    CaptureContentTypeHeader: {
      CsvContentTypes: ["text/csv"],
      JsonContentTypes: ["application/json"]
    }
  }
});
```

## Advanced Configuration

Configure an EndpointConfig with shadow production variants and network isolation.

```ts
const advancedEndpointConfig = await AWS.SageMaker.EndpointConfig("advanced-endpoint-config", {
  ProductionVariants: [{
    VariantName: "MainTraffic",
    ModelName: "my-main-model",
    InitialInstanceCount: 2,
    InstanceType: "ml.m5.large"
  }],
  ShadowProductionVariants: [{
    VariantName: "ShadowTraffic",
    ModelName: "my-shadow-model",
    InitialInstanceCount: 1,
    InstanceType: "ml.m5.large"
  }],
  EnableNetworkIsolation: true,
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/example-key-id"
});
```

## Custom VPC Configuration

Create an EndpointConfig that specifies a VPC configuration for enhanced security.

```ts
const vpcEndpointConfig = await AWS.SageMaker.EndpointConfig("vpc-endpoint-config", {
  ProductionVariants: [{
    VariantName: "VPCConfiguredTraffic",
    ModelName: "my-vpc-model",
    InitialInstanceCount: 1,
    InstanceType: "ml.m5.large"
  }],
  VpcConfig: {
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    Subnets: ["subnet-0123456789abcdef0", "subnet-0fedcba9876543210"]
  }
});
```

## Async Inference Configuration

Set up an EndpointConfig with asynchronous inference capabilities.

```ts
const asyncInferenceEndpointConfig = await AWS.SageMaker.EndpointConfig("async-inference-endpoint-config", {
  ProductionVariants: [{
    VariantName: "AsyncInferenceTraffic",
    ModelName: "my-async-model",
    InitialInstanceCount: 1,
    InstanceType: "ml.m5.large"
  }],
  AsyncInferenceConfig: {
    OutputConfig: {
      S3OutputPath: "s3://my-async-output-bucket/",
      KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/example-key-id"
    },
    ClientId: "my-client-id"
  }
});
```

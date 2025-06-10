---
title: ModelPackage
description: Learn how to create, update, and manage AWS SageMaker ModelPackages using Alchemy Cloud Control.
---


The ModelPackage resource lets you create and manage AWS SageMaker [ModelPackages](https://docs.aws.amazon.com/sagemaker/latest/userguide/) which are used to package machine learning models for deployment and sharing.

## Minimal Example

Create a basic ModelPackage with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const modelPackage = await AWS.SageMaker.ModelPackage("basicModelPackage", {
  ModelPackageName: "MyFirstModelPackage",
  ModelPackageGroupName: "MyModelPackageGroup",
  ModelApprovalStatus: "PendingManualApproval",
  ModelPackageDescription: "This is my first model package created with Alchemy."
});
```

## Advanced Configuration

Configure a ModelPackage with additional properties for enhanced functionality.

```ts
const advancedModelPackage = await AWS.SageMaker.ModelPackage("advancedModelPackage", {
  ModelPackageName: "AdvancedModelPackage",
  ModelPackageGroupName: "AdvancedModelGroup",
  ModelApprovalStatus: "Approved",
  ModelPackageDescription: "This model package has advanced configurations.",
  InferenceSpecification: {
    Containers: [{
      Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-custom-image:latest",
      ModelDataUrl: "s3://my-bucket/my-model.tar.gz"
    }],
    SupportedContentTypes: ["application/json"],
    SupportedResponseMIMETypes: ["application/json"],
    SupportedProtocols: ["HTTP"]
  },
  DriftCheckBaselines: {
    Baselines: [{
      ModelDataUrl: "s3://my-bucket/baseline-data.json",
      DriftCheckBaselines: {
        BaselineData: "my-baseline-data",
        BaselineMetrics: "my-baseline-metrics"
      }
    }]
  },
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Custom Inference Specification

Define a ModelPackage with a custom inference specification.

```ts
const customInferenceModelPackage = await AWS.SageMaker.ModelPackage("customInferenceModelPackage", {
  ModelPackageName: "CustomInferenceModelPackage",
  ModelPackageGroupName: "CustomInferenceGroup",
  ModelApprovalStatus: "PendingManualApproval",
  InferenceSpecification: {
    Containers: [{
      Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-inference-image:latest",
      ModelDataUrl: "s3://my-bucket/custom-inference-model.tar.gz"
    }],
    SupportedContentTypes: ["text/csv"],
    SupportedProtocols: ["HTTP"],
    SupportedResponseMIMETypes: ["application/json"]
  },
  SamplePayloadUrl: "s3://my-bucket/sample-payload.json",
  ModelMetrics: {
    ModelQuality: {
      Statistics: {
        S3Uri: "s3://my-bucket/model-quality-statistics.json"
      }
    }
  }
});
```

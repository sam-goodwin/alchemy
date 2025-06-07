---
title: Managing AWS SageMaker NotebookInstances with Alchemy
description: Learn how to create, update, and manage AWS SageMaker NotebookInstances using Alchemy Cloud Control.
---

# NotebookInstance

The NotebookInstance resource lets you manage [AWS SageMaker NotebookInstances](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for developing and training machine learning models.

## Minimal Example

Create a basic NotebookInstance with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicNotebookInstance = await AWS.SageMaker.NotebookInstance("MyBasicNotebook", {
  InstanceType: "ml.t2.medium",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20200101T123456",
  VolumeSizeInGB: 5,
  DirectInternetAccess: "Enabled",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "MLResearch" }
  ]
});
```

## Advanced Configuration

Configure a NotebookInstance with advanced options such as KMS key for encryption and additional code repositories.

```ts
const advancedNotebookInstance = await AWS.SageMaker.NotebookInstance("MyAdvancedNotebook", {
  InstanceType: "ml.m5.large",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20200101T123456",
  VolumeSizeInGB: 10,
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-5678-90ef-ghij-klmnopqrstu",
  AdditionalCodeRepositories: [
    "https://github.com/my-org/my-repo"
  ],
  LifecycleConfigName: "MyLifecycleConfig",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Networking Configuration

Set up a NotebookInstance that is deployed in a specific VPC with associated security group and subnet settings.

```ts
const vpcNotebookInstance = await AWS.SageMaker.NotebookInstance("MyVPCNotebook", {
  InstanceType: "ml.t3.medium",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20200101T123456",
  VolumeSizeInGB: 20,
  SubnetId: "subnet-12345678",
  SecurityGroupIds: [
    "sg-12345678"
  ],
  DirectInternetAccess: "Disabled",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "UseCase", Value: "DataProcessing" }
  ]
});
```

## Using Lifecycle Configurations

Demonstrate how to utilize a lifecycle configuration for automating startup scripts in a NotebookInstance.

```ts
const lifecycleNotebookInstance = await AWS.SageMaker.NotebookInstance("MyLifecycleNotebook", {
  InstanceType: "ml.t2.medium",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonSageMaker-ExecutionRole-20200101T123456",
  VolumeSizeInGB: 5,
  LifecycleConfigName: "MyStartupScriptConfig",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Application", Value: "Research" }
  ]
});
```
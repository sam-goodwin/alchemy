---
title: NotebookInstance
description: Learn how to create, update, and manage AWS SageMaker NotebookInstances using Alchemy Cloud Control.
---


The NotebookInstance resource lets you manage [AWS SageMaker NotebookInstances](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for developing and training machine learning models.

## Minimal Example

Create a basic SageMaker NotebookInstance with essential properties, including the instance type and role ARN.

```ts
import AWS from "alchemy/aws/control";

const notebookInstance = await AWS.SageMaker.NotebookInstance("myNotebookInstance", {
  roleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  instanceType: "ml.t2.medium",
  volumeSizeInGB: 5
});
```

## Advanced Configuration

Configure a NotebookInstance with additional options such as KMS key for encryption and a specific lifecycle configuration.

```ts
const advancedNotebookInstance = await AWS.SageMaker.NotebookInstance("advancedNotebookInstance", {
  roleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  instanceType: "ml.t3.large",
  volumeSizeInGB: 10,
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  lifecycleConfigName: "myLifecycleConfig"
});
```

## Network Configuration

Create a NotebookInstance within a specific VPC subnet and security group for network isolation.

```ts
const networkNotebookInstance = await AWS.SageMaker.NotebookInstance("networkNotebookInstance", {
  roleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  instanceType: "ml.t3.medium",
  subnetId: "subnet-0ab1c2d3e4f5g6h7",
  securityGroupIds: [
    "sg-0a1b2c3d4e5f6g7h8"
  ],
  directInternetAccess: "Disabled"
});
```

## Lifecycle Configuration Example

Demonstrate how to use a lifecycle configuration to execute scripts when the NotebookInstance starts.

```ts
const lifecycleNotebookInstance = await AWS.SageMaker.NotebookInstance("lifecycleNotebookInstance", {
  roleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  instanceType: "ml.t2.medium",
  lifecycleConfigName: "startupScriptConfig",
  tags: [
    { Key: "Project", Value: "MLModelTraining" }
  ]
});
```

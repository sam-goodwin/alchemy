---
title: ComputeEnvironment
description: Learn how to create, update, and manage AWS Batch ComputeEnvironments using Alchemy Cloud Control.
---


The ComputeEnvironment resource allows you to manage [AWS Batch ComputeEnvironments](https://docs.aws.amazon.com/batch/latest/userguide/) to efficiently run batch jobs on AWS. This resource provides a way to configure the environment settings that determine how AWS Batch will manage compute resources.

## Minimal Example

Create a basic ComputeEnvironment with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicComputeEnvironment = await AWS.Batch.ComputeEnvironment("basicComputeEnv", {
  Type: "MANAGED",
  ServiceRole: "arn:aws:iam::123456789012:role/AWSBatchServiceRole",
  ComputeEnvironmentName: "BasicComputeEnvironment"
});
```

## Advanced Configuration

Configure a ComputeEnvironment with additional settings for enhanced resource management.

```ts
const advancedComputeEnvironment = await AWS.Batch.ComputeEnvironment("advancedComputeEnv", {
  Type: "MANAGED",
  ServiceRole: "arn:aws:iam::123456789012:role/AWSBatchServiceRole",
  ComputeEnvironmentName: "AdvancedComputeEnvironment",
  UnmanagedvCpus: 4,
  Tags: {
    Project: "BatchProcessing",
    Environment: "Production"
  },
  UpdatePolicy: {
    Type: "MANAGED",
    Update: {
      Timeout: 10,
      RetryAttempts: 2
    }
  }
});
```

## EKS Configuration Example

Create a ComputeEnvironment that is configured for use with Amazon EKS.

```ts
const eksComputeEnvironment = await AWS.Batch.ComputeEnvironment("eksComputeEnv", {
  Type: "EKS",
  ServiceRole: "arn:aws:iam::123456789012:role/AWSBatchServiceRole",
  EksConfiguration: {
    KubernetesNamespace: "batch-jobs",
    ClusterName: "my-eks-cluster"
  },
  ComputeEnvironmentName: "EKSComputeEnvironment"
});
```

## Compute Resources Configuration

Define a ComputeEnvironment with specific compute resources, including instance types and desired vCPUs.

```ts
const resourcesComputeEnvironment = await AWS.Batch.ComputeEnvironment("resourcesComputeEnv", {
  Type: "MANAGED",
  ServiceRole: "arn:aws:iam::123456789012:role/AWSBatchServiceRole",
  ComputeEnvironmentName: "ResourcesComputeEnvironment",
  ComputeResources: {
    Type: "EC2",
    MinvCpus: 0,
    MaxvCpus: 16,
    DesiredvCpus: 4,
    InstanceTypes: ["optimal"],
    Subnets: ["subnet-12345678", "subnet-87654321"],
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    AllocationStrategy: "BEST_FIT_PROGRESSIVE"
  }
});
```

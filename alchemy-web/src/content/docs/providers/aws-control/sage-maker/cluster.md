---
title: Cluster
description: Learn how to create, update, and manage AWS SageMaker Clusters using Alchemy Cloud Control.
---


The Cluster resource allows you to manage [AWS SageMaker Clusters](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for machine learning tasks, enabling you to specify instance types, configurations, and networking options.

## Minimal Example

Create a basic SageMaker Cluster with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicCluster = await AWS.SageMaker.Cluster("basicCluster", {
  InstanceGroups: [
    {
      InstanceType: "ml.m5.large",
      InstanceCount: 2
    }
  ],
  ClusterName: "MyFirstSageMakerCluster",
  VpcConfig: {
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    Subnets: ["subnet-0123456789abcdef0"]
  }
});
```

## Advanced Configuration

Configure a SageMaker Cluster with node recovery and specific orchestrator settings.

```ts
const advancedCluster = await AWS.SageMaker.Cluster("advancedCluster", {
  InstanceGroups: [
    {
      InstanceType: "ml.m5.xlarge",
      InstanceCount: 3
    }
  ],
  ClusterName: "AdvancedSageMakerCluster",
  NodeRecovery: "ENABLED",
  Orchestrator: {
    Type: "AWS::SageMaker::Orchestrator",
    Properties: {
      Workflow: "arn:aws:sagemaker:us-west-2:123456789012:workflow/MyWorkflow"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Using Tags for Resource Management

Create a cluster with tags for better resource management and cost tracking.

```ts
const taggedCluster = await AWS.SageMaker.Cluster("taggedCluster", {
  InstanceGroups: [
    {
      InstanceType: "ml.t2.medium",
      InstanceCount: 1
    }
  ],
  ClusterName: "TaggedSageMakerCluster",
  Tags: [
    { Key: "Project", Value: "MachineLearning" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

## Custom VPC Configuration

Set up a cluster with a custom VPC configuration for enhanced security.

```ts
const vpcCluster = await AWS.SageMaker.Cluster("vpcCluster", {
  InstanceGroups: [
    {
      InstanceType: "ml.c5.2xlarge",
      InstanceCount: 2
    }
  ],
  ClusterName: "VPCCustomSageMakerCluster",
  VpcConfig: {
    SecurityGroupIds: ["sg-0987654321abcdef0"],
    Subnets: ["subnet-0987654321abcdef0", "subnet-1234567890abcdef0"]
  }
});
```

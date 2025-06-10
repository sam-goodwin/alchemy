---
title: Cluster
description: Learn how to create, update, and manage AWS PCS Clusters using Alchemy Cloud Control.
---


The Cluster resource allows you to create and manage [AWS PCS Clusters](https://docs.aws.amazon.com/pcs/latest/userguide/) for high-performance computing workloads. This resource facilitates the setup of a computing environment that can scale with your needs.

## Minimal Example

Create a basic PCS Cluster with essential properties such as Networking and Scheduler.

```ts
import AWS from "alchemy/aws/control";

const basicCluster = await AWS.PCS.Cluster("basicCluster", {
  Networking: {
    VpcId: "vpc-12345678",
    SubnetIds: ["subnet-12345678"],
    SecurityGroupIds: ["sg-12345678"]
  },
  Scheduler: {
    Type: "SLURM"
  },
  Size: "2",
  Tags: {
    Environment: "Development",
    Project: "HPC-Cluster"
  }
});
```

## Advanced Configuration

Configure a PCS Cluster with a custom Slurm configuration and additional tags for better resource management.

```ts
const advancedCluster = await AWS.PCS.Cluster("advancedCluster", {
  Networking: {
    VpcId: "vpc-87654321",
    SubnetIds: ["subnet-87654321"],
    SecurityGroupIds: ["sg-87654321"]
  },
  Scheduler: {
    Type: "SLURM",
    SlurmSettings: {
      JobPriority: "normal"
    }
  },
  Size: "4",
  SlurmConfiguration: {
    Scheduler: "slurm",
    JobCompletionTimeout: "3600"
  },
  Tags: {
    Environment: "Production",
    Team: "DataScience"
  }
});
```

## Custom Resource Deployment

Create a PCS Cluster with an adoption flag to manage pre-existing resources.

```ts
const adoptedCluster = await AWS.PCS.Cluster("adoptedCluster", {
  Networking: {
    VpcId: "vpc-11223344",
    SubnetIds: ["subnet-11223344"],
    SecurityGroupIds: ["sg-11223344"]
  },
  Scheduler: {
    Type: "SLURM"
  },
  Size: "3",
  adopt: true // This will adopt an existing resource if it exists
});
```

## Cluster with Enhanced Security

Set up a PCS Cluster with additional security configurations for networking.

```ts
const secureCluster = await AWS.PCS.Cluster("secureCluster", {
  Networking: {
    VpcId: "vpc-33445566",
    SubnetIds: ["subnet-33445566"],
    SecurityGroupIds: ["sg-33445566"],
    Egress: {
      CidrBlocks: ["0.0.0.0/0"],
      FromPort: 80,
      ToPort: 80,
      Protocol: "tcp"
    }
  },
  Scheduler: {
    Type: "SLURM"
  },
  Size: "5",
  Tags: {
    Environment: "Staging",
    Compliance: "ISO27001"
  }
});
```

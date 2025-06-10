---
title: VirtualCluster
description: Learn how to create, update, and manage AWS EMRContainers VirtualClusters using Alchemy Cloud Control.
---


The VirtualCluster resource allows you to create and manage [AWS EMRContainers VirtualClusters](https://docs.aws.amazon.com/emrcontainers/latest/userguide/) for running serverless Apache Spark applications. This resource facilitates the management of your containerized EMR workloads.

## Minimal Example

Create a basic VirtualCluster with required properties and one optional security configuration.

```ts
import AWS from "alchemy/aws/control";

const virtualCluster = await AWS.EMRContainers.VirtualCluster("myVirtualCluster", {
  name: "MyVirtualCluster",
  containerProvider: {
    type: "EKS",
    id: "myEKSCluster"
  },
  securityConfigurationId: "mySecurityConfigId" // Optional
});
```

## Advanced Configuration

Configure a VirtualCluster with tags for better resource management and identification.

```ts
const advancedVirtualCluster = await AWS.EMRContainers.VirtualCluster("advancedVirtualCluster", {
  name: "AdvancedVirtualCluster",
  containerProvider: {
    type: "EKS",
    id: "myAdvancedEKSCluster"
  },
  securityConfigurationId: "myAdvancedSecurityConfigId", // Optional
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Department",
      value: "DataScience"
    }
  ]
});
```

## Using Existing Resource

This example demonstrates how to adopt an existing VirtualCluster instead of failing if it already exists.

```ts
const existingVirtualCluster = await AWS.EMRContainers.VirtualCluster("existingVirtualCluster", {
  name: "ExistingVirtualCluster",
  containerProvider: {
    type: "EKS",
    id: "myExistingEKSCluster"
  },
  adopt: true // Enables adopting existing resources
});
```

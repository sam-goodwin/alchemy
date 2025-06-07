---
title: Managing AWS EMRContainers VirtualClusters with Alchemy
description: Learn how to create, update, and manage AWS EMRContainers VirtualClusters using Alchemy Cloud Control.
---

# VirtualCluster

The VirtualCluster resource lets you manage [AWS EMRContainers VirtualClusters](https://docs.aws.amazon.com/emrcontainers/latest/userguide/) for running serverless data analytics applications.

## Minimal Example

Create a basic VirtualCluster with required properties and a common optional setting.

```ts
import AWS from "alchemy/aws/control";

const basicVirtualCluster = await AWS.EMRContainers.VirtualCluster("BasicVirtualCluster", {
  Name: "BasicCluster",
  ContainerProvider: {
    Id: "my-container-provider",
    Type: "EKS",
    Info: {
      EksInfo: {
        Namespace: "default"
      }
    }
  },
  SecurityConfigurationId: "my-security-config",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Advanced Configuration

Configure a VirtualCluster with additional properties, including security configurations and tags.

```ts
const advancedVirtualCluster = await AWS.EMRContainers.VirtualCluster("AdvancedVirtualCluster", {
  Name: "AdvancedCluster",
  ContainerProvider: {
    Id: "my-container-provider",
    Type: "EKS",
    Info: {
      EksInfo: {
        Namespace: "production"
      }
    }
  },
  SecurityConfigurationId: "my-secure-config",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "DataPipeline" }
  ]
});
```

## Using Adopt Option

Create a VirtualCluster using the adopt option to prevent failure if the resource already exists.

```ts
const adoptedVirtualCluster = await AWS.EMRContainers.VirtualCluster("AdoptedVirtualCluster", {
  Name: "AdoptedCluster",
  ContainerProvider: {
    Id: "my-container-provider",
    Type: "EKS",
    Info: {
      EksInfo: {
        Namespace: "adopted"
      }
    }
  },
  SecurityConfigurationId: "my-adopted-security-config",
  adopt: true
});
```

## Tagging for Resource Management

Create a VirtualCluster with a comprehensive tagging strategy for better resource management.

```ts
const taggedVirtualCluster = await AWS.EMRContainers.VirtualCluster("TaggedVirtualCluster", {
  Name: "TaggedCluster",
  ContainerProvider: {
    Id: "my-container-provider",
    Type: "EKS",
    Info: {
      EksInfo: {
        Namespace: "tagged"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Department", Value: "Analytics" },
    { Key: "Owner", Value: "JohnDoe" }
  ]
});
```
---
title: Application
description: Learn how to create, update, and manage AWS EMRServerless Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS EMRServerless Applications](https://docs.aws.amazon.com/emrserverless/latest/userguide/) for running data processing workloads without the need to manage clusters.

## Minimal Example

This example demonstrates how to create a basic EMRServerless Application with required properties and a few optional ones.

```ts
import AWS from "alchemy/aws/control";

const emrApplication = await AWS.EMRServerless.Application("basicEmrApplication", {
  name: "BasicEMRApplication",
  releaseLabel: "emr-6.5.0",
  type: "SPARK",
  autoStopConfiguration: {
    enabled: true,
    idleTimeoutMinutes: 10
  },
  maximumCapacity: {
    cpu: "2 vCPUs",
    memory: "4 GB",
    disk: "10 GB"
  }
});
```

## Advanced Configuration

This example showcases an advanced configuration, including runtime settings and monitoring configuration.

```ts
const advancedEmrApplication = await AWS.EMRServerless.Application("advancedEmrApplication", {
  name: "AdvancedEMRApplication",
  releaseLabel: "emr-6.5.0",
  type: "SPARK",
  autoStopConfiguration: {
    enabled: true,
    idleTimeoutMinutes: 15
  },
  runtimeConfiguration: [{
    name: "spark.executor.instances",
    value: "2"
  }],
  monitoringConfiguration: {
    s3MonitoringPath: "s3://my-bucket/emr-logs/",
    persistentAppUI: true
  },
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Project",
      value: "DataProcessing"
    }
  ]
});
```

## Interactive Configuration

This example shows how to set up interactive configuration for running EMR applications.

```ts
const interactiveEmrApplication = await AWS.EMRServerless.Application("interactiveEmrApplication", {
  name: "InteractiveEMRApplication",
  releaseLabel: "emr-6.5.0",
  type: "SPARK",
  interactiveConfiguration: {
    idlenessTimeoutMinutes: 5,
    workerType: "GAMMA"
  },
  initialCapacity: {
    DRIVER: {
      desiredSize: 1
    },
    EXECUTOR: {
      desiredSize: 2
    }
  }
});
```

## Network Configuration

This example demonstrates how to configure network settings for the EMRServerless Application.

```ts
const networkEmrApplication = await AWS.EMRServerless.Application("networkEmrApplication", {
  name: "NetworkEMRApplication",
  releaseLabel: "emr-6.5.0",
  type: "SPARK",
  networkConfiguration: {
    subnetIds: ["subnet-12345678", "subnet-87654321"],
    securityGroupIds: ["sg-12345678"],
    vpcId: "vpc-12345678"
  }
});
```

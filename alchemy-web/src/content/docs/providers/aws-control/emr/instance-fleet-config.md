---
title: InstanceFleetConfig
description: Learn how to create, update, and manage AWS EMR InstanceFleetConfigs using Alchemy Cloud Control.
---


The InstanceFleetConfig resource allows you to manage [AWS EMR Instance Fleets](https://docs.aws.amazon.com/emr/latest/userguide/) for dynamic scaling and optimized resource allocation in your EMR cluster.

## Minimal Example

Create a basic instance fleet configuration with required properties and one optional property for instance type configuration.

```ts
import AWS from "alchemy/aws/control";

const instanceFleet = await AWS.EMR.InstanceFleetConfig("myInstanceFleet", {
  ClusterId: "j-1234567890EXAMPLE",
  InstanceFleetType: "MASTER",
  InstanceTypeConfigs: [
    {
      InstanceType: "m5.xlarge",
      WeightedCapacity: 1
    }
  ]
});
```

## Advanced Configuration

Configure an instance fleet with multiple instance types and launch specifications for more control over provisioning.

```ts
const advancedInstanceFleet = await AWS.EMR.InstanceFleetConfig("advancedInstanceFleet", {
  ClusterId: "j-0987654321EXAMPLE",
  InstanceFleetType: "CORE",
  InstanceTypeConfigs: [
    {
      InstanceType: "m5.xlarge",
      WeightedCapacity: 2
    },
    {
      InstanceType: "r5.xlarge",
      WeightedCapacity: 1
    }
  ],
  LaunchSpecifications: {
    OnDemandSpecification: {
      AllocationStrategy: "capacityOptimized"
    },
    SpotSpecification: {
      AllocationStrategy: "capacityOptimized"
    }
  },
  Name: "AdvancedCoreFleet"
});
```

## Resizing Specifications

Create an instance fleet with resizing specifications to manage on-demand and spot capacities dynamically.

```ts
const resizingInstanceFleet = await AWS.EMR.InstanceFleetConfig("resizingInstanceFleet", {
  ClusterId: "j-1122334455EXAMPLE",
  InstanceFleetType: "TASK",
  TargetOnDemandCapacity: 5,
  TargetSpotCapacity: 10,
  ResizeSpecifications: {
    InstanceResizePolicy: {
      InstancesToResize: ["i-0abcdef1234567890"],
      InstanceResizeType: "RESIZE"
    }
  },
  Name: "ResizingTaskFleet"
});
```

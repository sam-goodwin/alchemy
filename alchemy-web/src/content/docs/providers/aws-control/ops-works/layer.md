---
title: Layer
description: Learn how to create, update, and manage AWS OpsWorks Layers using Alchemy Cloud Control.
---


The Layer resource lets you manage [AWS OpsWorks Layers](https://docs.aws.amazon.com/opsworks/latest/userguide/) and their configuration settings for deploying and managing applications.

## Minimal Example

Create a basic OpsWorks Layer with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const opsWorksLayer = await AWS.OpsWorks.Layer("myAppLayer", {
  Name: "MyAppLayer",
  Shortname: "app-layer",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  AutoAssignElasticIps: true,
  AutoAssignPublicIps: false,
  EnableAutoHealing: true
});
```

## Advanced Configuration

Configure an OpsWorks Layer with additional options like custom recipes and lifecycle event configurations.

```ts
const advancedOpsWorksLayer = await AWS.OpsWorks.Layer("advancedAppLayer", {
  Name: "AdvancedAppLayer",
  Shortname: "adv-layer",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  AutoAssignElasticIps: true,
  AutoAssignPublicIps: true,
  EnableAutoHealing: true,
  CustomRecipes: {
    Setup: ["myCookbook::setup"],
    Deploy: ["myCookbook::deploy"],
    Shutdown: ["myCookbook::shutdown"]
  },
  LifecycleEventConfiguration: {
    Shutdown: {
      DelayUntilElbTargetsInService: false,
      ExecutionTimeout: 300,
      FailureTimeout: 300
    }
  }
});
```

## Custom Instance Profile

Create a Layer that uses a custom instance profile for enhanced permissions.

```ts
const customInstanceProfileLayer = await AWS.OpsWorks.Layer("customInstanceProfileLayer", {
  Name: "CustomInstanceProfileLayer",
  Shortname: "custom-ip-layer",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  AutoAssignElasticIps: false,
  AutoAssignPublicIps: true,
  EnableAutoHealing: true,
  CustomInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyCustomInstanceProfile"
});
```

## Load-Based Auto Scaling

Implement load-based auto-scaling for your OpsWorks Layer to handle varying workloads.

```ts
const loadBasedScalingLayer = await AWS.OpsWorks.Layer("scalableLayer", {
  Name: "ScalableLayer",
  Shortname: "scale-layer",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  AutoAssignElasticIps: true,
  EnableAutoHealing: true,
  LoadBasedAutoScaling: {
    DownScaling: {
      InstanceCount: 1,
      Thresholds: {
        CpuUtilization: 20,
        LoadAverage: 1.0
      }
    },
    UpScaling: {
      InstanceCount: 5,
      Thresholds: {
        CpuUtilization: 80,
        LoadAverage: 5.0
      }
    }
  }
});
``` 

These examples demonstrate how to utilize the AWS OpsWorks Layer resource effectively, showcasing minimal setups, advanced configurations, and tailored use cases for various application deployment needs.

---
title: Managing AWS PCS ComputeNodeGroups with Alchemy
description: Learn how to create, update, and manage AWS PCS ComputeNodeGroups using Alchemy Cloud Control.
---

# ComputeNodeGroup

The ComputeNodeGroup resource lets you create and manage [AWS PCS ComputeNodeGroups](https://docs.aws.amazon.com/pcs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcs-computenodegroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const computenodegroup = await AWS.PCS.ComputeNodeGroup("computenodegroup-example", {
  ClusterId: "example-clusterid",
  ScalingConfiguration: "example-scalingconfiguration",
  InstanceConfigs: [],
  CustomLaunchTemplate: "example-customlaunchtemplate",
  SubnetIds: ["example-subnetids-1"],
  IamInstanceProfileArn: "example-iaminstanceprofilearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a computenodegroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedComputeNodeGroup = await AWS.PCS.ComputeNodeGroup("advanced-computenodegroup", {
  ClusterId: "example-clusterid",
  ScalingConfiguration: "example-scalingconfiguration",
  InstanceConfigs: [],
  CustomLaunchTemplate: "example-customlaunchtemplate",
  SubnetIds: ["example-subnetids-1"],
  IamInstanceProfileArn: "example-iaminstanceprofilearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


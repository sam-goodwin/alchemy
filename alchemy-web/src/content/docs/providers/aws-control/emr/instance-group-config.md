---
title: InstanceGroupConfig
description: Learn how to create, update, and manage AWS EMR InstanceGroupConfigs using Alchemy Cloud Control.
---


The InstanceGroupConfig resource allows you to configure and manage [AWS EMR Instance Groups](https://docs.aws.amazon.com/emr/latest/userguide/) within your EMR clusters.

## Minimal Example

Create an EMR InstanceGroupConfig with required properties and a common optional property for bid price.

```ts
import AWS from "alchemy/aws/control";

const instanceGroupConfig = await AWS.EMR.InstanceGroupConfig("core-instance-group", {
  InstanceCount: 2,
  InstanceRole: "CORE",
  InstanceType: "m5.xlarge",
  JobFlowId: "j-XXXXXXXXXX",
  BidPrice: "0.10" // Optional: specifying bid price for spot instances
});
```

## Advanced Configuration

Configure an InstanceGroupConfig with an AutoScalingPolicy and EBS configuration for enhanced performance.

```ts
const advancedInstanceGroupConfig = await AWS.EMR.InstanceGroupConfig("master-instance-group", {
  InstanceCount: 1,
  InstanceRole: "MASTER",
  InstanceType: "m5.xlarge",
  JobFlowId: "j-XXXXXXXXXX",
  AutoScalingPolicy: {
    Constraints: {
      MinCapacity: 1,
      MaxCapacity: 10
    },
    Rules: [{
      Name: "scale-out-rule",
      Action: {
        SimpleScalingPolicyConfiguration: {
          AdjustmentType: "CHANGE_IN_CAPACITY",
          ScalingAdjustment: 1,
          CoolDown: 300
        }
      },
      Trigger: {
        CloudWatchAlarmDefinition: {
          ComparisonOperator: "GREATER_THAN_OR_EQUAL",
          MetricName: "InstanceGroupUtilization",
          Namespace: "AWS/ElasticMapReduce",
          Period: 300,
          Statistic: "AVERAGE",
          Threshold: 75,
          Unit: "PERCENT"
        }
      }
    }]
  },
  EbsConfiguration: {
    EbsBlockDeviceConfigs: [{
      VolumeSpecification: {
        SizeInGB: 100,
        VolumeType: "gp2"
      },
      VolumesPerInstance: 1
    }],
    EbsOptimized: true
  }
});
```

## Custom AMI Configuration

Create an instance group that uses a custom AMI ID for specific use cases.

```ts
const customAmiInstanceGroupConfig = await AWS.EMR.InstanceGroupConfig("custom-ami-instance-group", {
  InstanceCount: 3,
  InstanceRole: "CORE",
  InstanceType: "m5.xlarge",
  JobFlowId: "j-XXXXXXXXXX",
  CustomAmiId: "ami-0123456789abcdef0" // Using a custom AMI
});
```

---
title: Managing AWS EMR InstanceGroupConfigs with Alchemy
description: Learn how to create, update, and manage AWS EMR InstanceGroupConfigs using Alchemy Cloud Control.
---

# InstanceGroupConfig

The InstanceGroupConfig resource lets you create and manage [AWS EMR InstanceGroupConfigs](https://docs.aws.amazon.com/emr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-emr-instancegroupconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instancegroupconfig = await AWS.EMR.InstanceGroupConfig("instancegroupconfig-example", {
  InstanceCount: 1,
  InstanceRole: "example-instancerole",
  InstanceType: "example-instancetype",
  JobFlowId: "example-jobflowid",
});
```


---
title: Managing AWS EMR InstanceFleetConfigs with Alchemy
description: Learn how to create, update, and manage AWS EMR InstanceFleetConfigs using Alchemy Cloud Control.
---

# InstanceFleetConfig

The InstanceFleetConfig resource lets you create and manage [AWS EMR InstanceFleetConfigs](https://docs.aws.amazon.com/emr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticmapreduce-instancefleetconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instancefleetconfig = await AWS.EMR.InstanceFleetConfig("instancefleetconfig-example", {
  ClusterId: "example-clusterid",
  InstanceFleetType: "example-instancefleettype",
});
```


---
title: Managing AWS Connect InstanceStorageConfigs with Alchemy
description: Learn how to create, update, and manage AWS Connect InstanceStorageConfigs using Alchemy Cloud Control.
---

# InstanceStorageConfig

The InstanceStorageConfig resource lets you create and manage [AWS Connect InstanceStorageConfigs](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-instancestorageconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instancestorageconfig = await AWS.Connect.InstanceStorageConfig(
  "instancestorageconfig-example",
  {
    StorageType: "example-storagetype",
    InstanceArn: "example-instancearn",
    ResourceType: "example-resourcetype",
  }
);
```


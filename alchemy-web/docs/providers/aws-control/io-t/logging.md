---
title: Managing AWS IoT Loggings with Alchemy
description: Learn how to create, update, and manage AWS IoT Loggings using Alchemy Cloud Control.
---

# Logging

The Logging resource lets you create and manage [AWS IoT Loggings](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const logging = await AWS.IoT.Logging("logging-example", {
  AccountId: "example-accountid",
  RoleArn: "example-rolearn",
  DefaultLogLevel: "example-defaultloglevel",
});
```


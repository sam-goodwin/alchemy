---
title: Managing AWS Config ConfigurationRecorders with Alchemy
description: Learn how to create, update, and manage AWS Config ConfigurationRecorders using Alchemy Cloud Control.
---

# ConfigurationRecorder

The ConfigurationRecorder resource lets you create and manage [AWS Config ConfigurationRecorders](https://docs.aws.amazon.com/config/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-config-configurationrecorder.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationrecorder = await AWS.Config.ConfigurationRecorder(
  "configurationrecorder-example",
  { RoleARN: "example-rolearn" }
);
```


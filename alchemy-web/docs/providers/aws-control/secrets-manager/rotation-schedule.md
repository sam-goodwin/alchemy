---
title: Managing AWS SecretsManager RotationSchedules with Alchemy
description: Learn how to create, update, and manage AWS SecretsManager RotationSchedules using Alchemy Cloud Control.
---

# RotationSchedule

The RotationSchedule resource lets you create and manage [AWS SecretsManager RotationSchedules](https://docs.aws.amazon.com/secretsmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-secretsmanager-rotationschedule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rotationschedule = await AWS.SecretsManager.RotationSchedule("rotationschedule-example", {
  SecretId: "example-secretid",
});
```


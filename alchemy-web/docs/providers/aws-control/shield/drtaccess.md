---
title: Managing AWS Shield DRTAccesss with Alchemy
description: Learn how to create, update, and manage AWS Shield DRTAccesss using Alchemy Cloud Control.
---

# DRTAccess

The DRTAccess resource lets you create and manage [AWS Shield DRTAccesss](https://docs.aws.amazon.com/shield/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-shield-drtaccess.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const drtaccess = await AWS.Shield.DRTAccess("drtaccess-example", { RoleArn: "example-rolearn" });
```


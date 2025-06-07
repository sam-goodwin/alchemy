---
title: Managing AWS IoT AccountAuditConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IoT AccountAuditConfigurations using Alchemy Cloud Control.
---

# AccountAuditConfiguration

The AccountAuditConfiguration resource lets you create and manage [AWS IoT AccountAuditConfigurations](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accountauditconfiguration = await AWS.IoT.AccountAuditConfiguration(
  "accountauditconfiguration-example",
  {
    AccountId: "example-accountid",
    AuditCheckConfigurations: "example-auditcheckconfigurations",
    RoleArn: "example-rolearn",
  }
);
```


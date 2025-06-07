---
title: Managing AWS Config RemediationConfigurations with Alchemy
description: Learn how to create, update, and manage AWS Config RemediationConfigurations using Alchemy Cloud Control.
---

# RemediationConfiguration

The RemediationConfiguration resource lets you create and manage [AWS Config RemediationConfigurations](https://docs.aws.amazon.com/config/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-config-remediationconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const remediationconfiguration = await AWS.Config.RemediationConfiguration(
  "remediationconfiguration-example",
  {
    TargetType: "example-targettype",
    ConfigRuleName: "remediationconfiguration-configrule",
    TargetId: "example-targetid",
  }
);
```


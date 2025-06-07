---
title: Managing AWS EMR SecurityConfigurations with Alchemy
description: Learn how to create, update, and manage AWS EMR SecurityConfigurations using Alchemy Cloud Control.
---

# SecurityConfiguration

The SecurityConfiguration resource lets you create and manage [AWS EMR SecurityConfigurations](https://docs.aws.amazon.com/emr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-emr-securityconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const securityconfiguration = await AWS.EMR.SecurityConfiguration("securityconfiguration-example", {
  SecurityConfiguration: {},
});
```


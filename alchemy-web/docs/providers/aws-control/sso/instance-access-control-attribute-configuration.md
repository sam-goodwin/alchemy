---
title: Managing AWS SSO InstanceAccessControlAttributeConfigurations with Alchemy
description: Learn how to create, update, and manage AWS SSO InstanceAccessControlAttributeConfigurations using Alchemy Cloud Control.
---

# InstanceAccessControlAttributeConfiguration

The InstanceAccessControlAttributeConfiguration resource lets you create and manage [AWS SSO InstanceAccessControlAttributeConfigurations](https://docs.aws.amazon.com/sso/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-instanceaccesscontrolattributeconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instanceaccesscontrolattributeconfiguration =
  await AWS.SSO.InstanceAccessControlAttributeConfiguration(
    "instanceaccesscontrolattributeconfiguration-example",
    { InstanceArn: "example-instancearn" }
  );
```


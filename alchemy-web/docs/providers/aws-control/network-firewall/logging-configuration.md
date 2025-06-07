---
title: Managing AWS NetworkFirewall LoggingConfigurations with Alchemy
description: Learn how to create, update, and manage AWS NetworkFirewall LoggingConfigurations using Alchemy Cloud Control.
---

# LoggingConfiguration

The LoggingConfiguration resource lets you create and manage [AWS NetworkFirewall LoggingConfigurations](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkfirewall-loggingconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loggingconfiguration = await AWS.NetworkFirewall.LoggingConfiguration(
  "loggingconfiguration-example",
  { FirewallArn: "example-firewallarn", LoggingConfiguration: "example-loggingconfiguration" }
);
```


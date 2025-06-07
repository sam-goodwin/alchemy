---
title: Managing AWS Route53RecoveryControl RoutingControls with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryControl RoutingControls using Alchemy Cloud Control.
---

# RoutingControl

The RoutingControl resource lets you create and manage [AWS Route53RecoveryControl RoutingControls](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53recoverycontrol-routingcontrol.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const routingcontrol = await AWS.Route53RecoveryControl.RoutingControl("routingcontrol-example", {
  Name: "routingcontrol-",
});
```


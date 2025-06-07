---
title: Managing AWS ServiceDiscovery Instances with Alchemy
description: Learn how to create, update, and manage AWS ServiceDiscovery Instances using Alchemy Cloud Control.
---

# Instance

The Instance resource lets you create and manage [AWS ServiceDiscovery Instances](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicediscovery-instance.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instance = await AWS.ServiceDiscovery.Instance("instance-example", {
  InstanceAttributes: {},
  ServiceId: "example-serviceid",
});
```


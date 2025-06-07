---
title: Managing AWS ServiceDiscovery Services with Alchemy
description: Learn how to create, update, and manage AWS ServiceDiscovery Services using Alchemy Cloud Control.
---

# Service

The Service resource lets you create and manage [AWS ServiceDiscovery Services](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicediscovery-service.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const service = await AWS.ServiceDiscovery.Service("service-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A service resource managed by Alchemy",
});
```

## Advanced Configuration

Create a service with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedService = await AWS.ServiceDiscovery.Service("advanced-service", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A service resource managed by Alchemy",
});
```


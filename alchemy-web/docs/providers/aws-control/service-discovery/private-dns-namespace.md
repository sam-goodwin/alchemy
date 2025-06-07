---
title: Managing AWS ServiceDiscovery PrivateDnsNamespaces with Alchemy
description: Learn how to create, update, and manage AWS ServiceDiscovery PrivateDnsNamespaces using Alchemy Cloud Control.
---

# PrivateDnsNamespace

The PrivateDnsNamespace resource lets you create and manage [AWS ServiceDiscovery PrivateDnsNamespaces](https://docs.aws.amazon.com/servicediscovery/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicediscovery-privatednsnamespace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const privatednsnamespace = await AWS.ServiceDiscovery.PrivateDnsNamespace(
  "privatednsnamespace-example",
  {
    Vpc: "example-vpc",
    Name: "privatednsnamespace-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A privatednsnamespace resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a privatednsnamespace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPrivateDnsNamespace = await AWS.ServiceDiscovery.PrivateDnsNamespace(
  "advanced-privatednsnamespace",
  {
    Vpc: "example-vpc",
    Name: "privatednsnamespace-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A privatednsnamespace resource managed by Alchemy",
  }
);
```


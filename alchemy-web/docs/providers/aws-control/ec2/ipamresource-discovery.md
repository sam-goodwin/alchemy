---
title: Managing AWS EC2 IPAMResourceDiscoverys with Alchemy
description: Learn how to create, update, and manage AWS EC2 IPAMResourceDiscoverys using Alchemy Cloud Control.
---

# IPAMResourceDiscovery

The IPAMResourceDiscovery resource lets you create and manage [AWS EC2 IPAMResourceDiscoverys](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-ipamresourcediscovery.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const ipamresourcediscovery = await AWS.EC2.IPAMResourceDiscovery("ipamresourcediscovery-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A ipamresourcediscovery resource managed by Alchemy",
});
```

## Advanced Configuration

Create a ipamresourcediscovery with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIPAMResourceDiscovery = await AWS.EC2.IPAMResourceDiscovery(
  "advanced-ipamresourcediscovery",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A ipamresourcediscovery resource managed by Alchemy",
  }
);
```


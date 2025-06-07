---
title: Managing AWS B2BI Capabilitys with Alchemy
description: Learn how to create, update, and manage AWS B2BI Capabilitys using Alchemy Cloud Control.
---

# Capability

The Capability resource lets you create and manage [AWS B2BI Capabilitys](https://docs.aws.amazon.com/b2bi/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-b2bi-capability.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const capability = await AWS.B2BI.Capability("capability-example", {
  Type: "example-type",
  Configuration: "example-configuration",
  Name: "capability-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a capability with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCapability = await AWS.B2BI.Capability("advanced-capability", {
  Type: "example-type",
  Configuration: "example-configuration",
  Name: "capability-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


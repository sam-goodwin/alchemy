---
title: Managing AWS B2BI Partnerships with Alchemy
description: Learn how to create, update, and manage AWS B2BI Partnerships using Alchemy Cloud Control.
---

# Partnership

The Partnership resource lets you create and manage [AWS B2BI Partnerships](https://docs.aws.amazon.com/b2bi/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-b2bi-partnership.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const partnership = await AWS.B2BI.Partnership("partnership-example", {
  ProfileId: "example-profileid",
  Email: "example-email",
  Capabilities: ["example-capabilities-1"],
  Name: "partnership-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a partnership with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPartnership = await AWS.B2BI.Partnership("advanced-partnership", {
  ProfileId: "example-profileid",
  Email: "example-email",
  Capabilities: ["example-capabilities-1"],
  Name: "partnership-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


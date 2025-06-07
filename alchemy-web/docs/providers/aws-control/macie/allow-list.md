---
title: Managing AWS Macie AllowLists with Alchemy
description: Learn how to create, update, and manage AWS Macie AllowLists using Alchemy Cloud Control.
---

# AllowList

The AllowList resource lets you create and manage [AWS Macie AllowLists](https://docs.aws.amazon.com/macie/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-allowlist.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const allowlist = await AWS.Macie.AllowList("allowlist-example", {
  Criteria: "example-criteria",
  Name: "allowlist-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A allowlist resource managed by Alchemy",
});
```

## Advanced Configuration

Create a allowlist with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAllowList = await AWS.Macie.AllowList("advanced-allowlist", {
  Criteria: "example-criteria",
  Name: "allowlist-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A allowlist resource managed by Alchemy",
});
```


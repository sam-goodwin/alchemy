---
title: Managing AWS WAFv2 WebACLs with Alchemy
description: Learn how to create, update, and manage AWS WAFv2 WebACLs using Alchemy Cloud Control.
---

# WebACL

The WebACL resource lets you create and manage [AWS WAFv2 WebACLs](https://docs.aws.amazon.com/wafv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webacl.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const webacl = await AWS.WAFv2.WebACL("webacl-example", {
  VisibilityConfig: "example-visibilityconfig",
  DefaultAction: "example-defaultaction",
  Scope: "example-scope",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A webacl resource managed by Alchemy",
});
```

## Advanced Configuration

Create a webacl with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWebACL = await AWS.WAFv2.WebACL("advanced-webacl", {
  VisibilityConfig: "example-visibilityconfig",
  DefaultAction: "example-defaultaction",
  Scope: "example-scope",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A webacl resource managed by Alchemy",
});
```


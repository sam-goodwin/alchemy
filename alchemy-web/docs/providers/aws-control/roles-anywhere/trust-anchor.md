---
title: Managing AWS RolesAnywhere TrustAnchors with Alchemy
description: Learn how to create, update, and manage AWS RolesAnywhere TrustAnchors using Alchemy Cloud Control.
---

# TrustAnchor

The TrustAnchor resource lets you create and manage [AWS RolesAnywhere TrustAnchors](https://docs.aws.amazon.com/rolesanywhere/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rolesanywhere-trustanchor.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const trustanchor = await AWS.RolesAnywhere.TrustAnchor("trustanchor-example", {
  Source: "example-source",
  Name: "trustanchor-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a trustanchor with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTrustAnchor = await AWS.RolesAnywhere.TrustAnchor("advanced-trustanchor", {
  Source: "example-source",
  Name: "trustanchor-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


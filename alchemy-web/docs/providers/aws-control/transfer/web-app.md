---
title: Managing AWS Transfer WebApps with Alchemy
description: Learn how to create, update, and manage AWS Transfer WebApps using Alchemy Cloud Control.
---

# WebApp

The WebApp resource lets you create and manage [AWS Transfer WebApps](https://docs.aws.amazon.com/transfer/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-webapp.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const webapp = await AWS.Transfer.WebApp("webapp-example", {
  IdentityProviderDetails: "example-identityproviderdetails",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a webapp with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWebApp = await AWS.Transfer.WebApp("advanced-webapp", {
  IdentityProviderDetails: "example-identityproviderdetails",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


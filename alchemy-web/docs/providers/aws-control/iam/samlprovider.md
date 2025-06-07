---
title: Managing AWS IAM SAMLProviders with Alchemy
description: Learn how to create, update, and manage AWS IAM SAMLProviders using Alchemy Cloud Control.
---

# SAMLProvider

The SAMLProvider resource lets you create and manage [AWS IAM SAMLProviders](https://docs.aws.amazon.com/iam/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const samlprovider = await AWS.IAM.SAMLProvider("samlprovider-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a samlprovider with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSAMLProvider = await AWS.IAM.SAMLProvider("advanced-samlprovider", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


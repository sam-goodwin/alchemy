---
title: Managing AWS EC2 VerifiedAccessTrustProviders with Alchemy
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessTrustProviders using Alchemy Cloud Control.
---

# VerifiedAccessTrustProvider

The VerifiedAccessTrustProvider resource lets you create and manage [AWS EC2 VerifiedAccessTrustProviders](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-verifiedaccesstrustprovider.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const verifiedaccesstrustprovider = await AWS.EC2.VerifiedAccessTrustProvider(
  "verifiedaccesstrustprovider-example",
  {
    PolicyReferenceName: "verifiedaccesstrustprovider-policyreference",
    TrustProviderType: "example-trustprovidertype",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A verifiedaccesstrustprovider resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a verifiedaccesstrustprovider with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVerifiedAccessTrustProvider = await AWS.EC2.VerifiedAccessTrustProvider(
  "advanced-verifiedaccesstrustprovider",
  {
    PolicyReferenceName: "verifiedaccesstrustprovider-policyreference",
    TrustProviderType: "example-trustprovidertype",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A verifiedaccesstrustprovider resource managed by Alchemy",
  }
);
```


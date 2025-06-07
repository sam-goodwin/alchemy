---
title: Managing AWS ServiceCatalog CloudFormationProvisionedProducts with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog CloudFormationProvisionedProducts using Alchemy Cloud Control.
---

# CloudFormationProvisionedProduct

The CloudFormationProvisionedProduct resource lets you create and manage [AWS ServiceCatalog CloudFormationProvisionedProducts](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-cloudformationprovisionedproduct.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cloudformationprovisionedproduct = await AWS.ServiceCatalog.CloudFormationProvisionedProduct(
  "cloudformationprovisionedproduct-example",
  { Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a cloudformationprovisionedproduct with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCloudFormationProvisionedProduct =
  await AWS.ServiceCatalog.CloudFormationProvisionedProduct(
    "advanced-cloudformationprovisionedproduct",
    {
      Tags: {
        Environment: "production",
        Team: "DevOps",
        Project: "MyApp",
        CostCenter: "Engineering",
        ManagedBy: "Alchemy",
      },
    }
  );
```


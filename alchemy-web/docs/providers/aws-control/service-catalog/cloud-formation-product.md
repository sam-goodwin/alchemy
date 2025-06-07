---
title: Managing AWS ServiceCatalog CloudFormationProducts with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog CloudFormationProducts using Alchemy Cloud Control.
---

# CloudFormationProduct

The CloudFormationProduct resource lets you create and manage [AWS ServiceCatalog CloudFormationProducts](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-cloudformationproduct.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cloudformationproduct = await AWS.ServiceCatalog.CloudFormationProduct(
  "cloudformationproduct-example",
  {
    Owner: "example-owner",
    Name: "cloudformationproduct-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A cloudformationproduct resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a cloudformationproduct with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCloudFormationProduct = await AWS.ServiceCatalog.CloudFormationProduct(
  "advanced-cloudformationproduct",
  {
    Owner: "example-owner",
    Name: "cloudformationproduct-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A cloudformationproduct resource managed by Alchemy",
  }
);
```


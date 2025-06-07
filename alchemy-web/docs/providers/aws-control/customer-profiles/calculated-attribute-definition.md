---
title: Managing AWS CustomerProfiles CalculatedAttributeDefinitions with Alchemy
description: Learn how to create, update, and manage AWS CustomerProfiles CalculatedAttributeDefinitions using Alchemy Cloud Control.
---

# CalculatedAttributeDefinition

The CalculatedAttributeDefinition resource lets you create and manage [AWS CustomerProfiles CalculatedAttributeDefinitions](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-calculatedattributedefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const calculatedattributedefinition = await AWS.CustomerProfiles.CalculatedAttributeDefinition(
  "calculatedattributedefinition-example",
  {
    AttributeDetails: "example-attributedetails",
    Statistic: "example-statistic",
    DomainName: "calculatedattributedefinition-domain",
    CalculatedAttributeName: "calculatedattributedefinition-calculatedattribute",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A calculatedattributedefinition resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a calculatedattributedefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCalculatedAttributeDefinition =
  await AWS.CustomerProfiles.CalculatedAttributeDefinition(
    "advanced-calculatedattributedefinition",
    {
      AttributeDetails: "example-attributedetails",
      Statistic: "example-statistic",
      DomainName: "calculatedattributedefinition-domain",
      CalculatedAttributeName: "calculatedattributedefinition-calculatedattribute",
      Tags: {
        Environment: "production",
        Team: "DevOps",
        Project: "MyApp",
        CostCenter: "Engineering",
        ManagedBy: "Alchemy",
      },
      Description: "A calculatedattributedefinition resource managed by Alchemy",
    }
  );
```


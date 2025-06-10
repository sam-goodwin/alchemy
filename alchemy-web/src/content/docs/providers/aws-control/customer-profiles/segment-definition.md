---
title: SegmentDefinition
description: Learn how to create, update, and manage AWS CustomerProfiles SegmentDefinitions using Alchemy Cloud Control.
---


The SegmentDefinition resource allows you to define segments in AWS Customer Profiles, enabling you to create targeted marketing efforts and better understand customer behavior. For more information, refer to the [AWS CustomerProfiles SegmentDefinitions documentation](https://docs.aws.amazon.com/customerprofiles/latest/userguide/).

## Minimal Example

Create a basic SegmentDefinition with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicSegmentDefinition = await AWS.CustomerProfiles.SegmentDefinition("basicSegment", {
  DomainName: "my-business-domain",
  SegmentGroups: {
    SegmentGroupList: [
      {
        Name: "Loyal Customers",
        SegmentGroupCriteria: {
          Conditions: [
            {
              AttributeName: "purchaseFrequency",
              Operator: "GREATER_THAN",
              AttributeValue: "5"
            }
          ]
        }
      }
    ]
  },
  DisplayName: "Loyal Customers Segment",
  SegmentDefinitionName: "LoyalCustomersSegment"
});
```

## Advanced Configuration

Configure a SegmentDefinition with tags and a specific description to enhance organization.

```ts
const advancedSegmentDefinition = await AWS.CustomerProfiles.SegmentDefinition("advancedSegment", {
  DomainName: "my-business-domain",
  SegmentGroups: {
    SegmentGroupList: [
      {
        Name: "High-Value Customers",
        SegmentGroupCriteria: {
          Conditions: [
            {
              AttributeName: "totalSpend",
              Operator: "GREATER_THAN",
              AttributeValue: "1000"
            }
          ]
        }
      }
    ]
  },
  DisplayName: "High-Value Customers Segment",
  SegmentDefinitionName: "HighValueCustomersSegment",
  Description: "Segment for customers who have spent over $1000."
});
```

## Tagging for Organization

Demonstrate how to add tags to a SegmentDefinition for better resource management.

```ts
const taggedSegmentDefinition = await AWS.CustomerProfiles.SegmentDefinition("taggedSegment", {
  DomainName: "my-business-domain",
  SegmentGroups: {
    SegmentGroupList: [
      {
        Name: "Frequent Buyers",
        SegmentGroupCriteria: {
          Conditions: [
            {
              AttributeName: "purchaseCount",
              Operator: "GREATER_THAN",
              AttributeValue: "10"
            }
          ]
        }
      }
    ]
  },
  DisplayName: "Frequent Buyers Segment",
  SegmentDefinitionName: "FrequentBuyersSegment",
  Tags: [
    {
      Key: "Project",
      Value: "CustomerSegmentation"
    },
    {
      Key: "Owner",
      Value: "marketing-team"
    }
  ]
});
```

## Adoption of Existing Resources

Use the adopt feature to avoid failure when a SegmentDefinition already exists.

```ts
const adoptedSegmentDefinition = await AWS.CustomerProfiles.SegmentDefinition("adoptedSegment", {
  DomainName: "my-business-domain",
  SegmentGroups: {
    SegmentGroupList: [
      {
        Name: "New Customers",
        SegmentGroupCriteria: {
          Conditions: [
            {
              AttributeName: "signupDate",
              Operator: "GREATER_THAN",
              AttributeValue: "2023-01-01"
            }
          ]
        }
      }
    ]
  },
  DisplayName: "New Customers Segment",
  SegmentDefinitionName: "NewCustomersSegment",
  adopt: true // Attempt to adopt the existing resource if it exists
});
```

---
title: Segment
description: Learn how to create, update, and manage AWS Pinpoint Segments using Alchemy Cloud Control.
---


The Segment resource allows you to manage [AWS Pinpoint Segments](https://docs.aws.amazon.com/pinpoint/latest/userguide/) which are used to define a group of endpoints that you can target with campaigns.

## Minimal Example

Create a basic segment with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicSegment = await AWS.Pinpoint.Segment("basic-segment", {
  ApplicationId: "app-123456", 
  Name: "New Customers",
  Dimensions: {
    Attributes: {
      customerType: {
        AttributeType: "INCLUSIVE",
        Values: ["new"]
      }
    }
  }
});
```

## Advanced Configuration

Configure a segment with segment groups for more complex targeting:

```ts
const advancedSegment = await AWS.Pinpoint.Segment("advanced-segment", {
  ApplicationId: "app-123456", 
  Name: "Loyal Customers",
  SegmentGroups: {
    Groups: [
      {
        SourceSegments: [],
        Dimensions: {
          Attributes: {
            customerType: {
              AttributeType: "EXCLUSIVE",
              Values: ["loyal"]
            }
          }
        }
      }
    ]
  },
  Tags: {
    project: "marketing",
    environment: "production"
  }
});
```

## Targeting Based on Engagement

Create a segment targeting users based on their engagement metrics:

```ts
const engagementSegment = await AWS.Pinpoint.Segment("engagement-segment", {
  ApplicationId: "app-123456",
  Name: "Highly Engaged Users",
  Dimensions: {
    Metrics: {
      sessionCount: {
        DimensionType: "INCLUSIVE",
        Values: ["5"]
      },
      engagementScore: {
        DimensionType: "GREATER_THAN",
        Values: ["75"]
      }
    }
  }
});
```

## Segment for Specific Campaigns

Define a segment specifically for an upcoming campaign:

```ts
const campaignSegment = await AWS.Pinpoint.Segment("campaign-segment", {
  ApplicationId: "app-123456",
  Name: "Winter Sale Shoppers",
  Dimensions: {
    Attributes: {
      lastPurchaseDate: {
        AttributeType: "GREATER_THAN",
        Values: ["2023-11-01"]
      }
    }
  },
  Tags: {
    campaign: "winter-sale",
    status: "active"
  }
});
```

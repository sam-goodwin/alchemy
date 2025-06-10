---
title: Insight
description: Learn how to create, update, and manage AWS SecurityHub Insights using Alchemy Cloud Control.
---


The Insight resource lets you manage [AWS SecurityHub Insights](https://docs.aws.amazon.com/securityhub/latest/userguide/) for aggregating and analyzing security findings within your AWS account.

## Minimal Example

Create a basic SecurityHub Insight with required properties:

```ts
import AWS from "alchemy/aws/control";

const securityInsight = await AWS.SecurityHub.Insight("basicInsight", {
  filters: {
    ProductArn: {
      "equals": "arn:aws:securityhub:us-east-1::product/aws/securityhub"
    },
    SeverityLabel: {
      "equals": "HIGH"
    }
  },
  groupByAttribute: "ResourceType",
  name: "High Severity Insights",
  adopt: true
});
```

## Advanced Configuration

Configure an Insight with more complex filter settings for detailed analysis:

```ts
const advancedInsight = await AWS.SecurityHub.Insight("advancedInsight", {
  filters: {
    ProductArn: {
      "equals": "arn:aws:securityhub:us-east-1::product/aws/securityhub"
    },
    SeverityLabel: {
      "equals": "MEDIUM"
    },
    ResourceType: {
      "equals": "AWS::EC2::Instance"
    }
  },
  groupByAttribute: "AccountId",
  name: "Medium Severity EC2 Insights",
  adopt: true
});
```

## Resource Type Aggregation

Create an Insight that groups findings by resource type for better visibility:

```ts
const resourceTypeInsight = await AWS.SecurityHub.Insight("resourceTypeInsight", {
  filters: {
    ProductArn: {
      "equals": "arn:aws:securityhub:us-east-1::product/aws/securityhub"
    },
    SeverityLabel: {
      "equals": "LOW"
    }
  },
  groupByAttribute: "ResourceType",
  name: "Low Severity Resource Type Insights",
  adopt: false
});
```

## Multi-Account Insights

Set up an Insight that aggregates findings across multiple AWS accounts:

```ts
const multiAccountInsight = await AWS.SecurityHub.Insight("multiAccountInsight", {
  filters: {
    ProductArn: {
      "equals": "arn:aws:securityhub:us-east-1::product/aws/securityhub"
    },
    SeverityLabel: {
      "equals": "CRITICAL"
    }
  },
  groupByAttribute: "AccountId",
  name: "Critical Severity Multi-Account Insights",
  adopt: true
});
```

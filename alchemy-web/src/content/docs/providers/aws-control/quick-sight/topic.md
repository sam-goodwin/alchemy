---
title: Topic
description: Learn how to create, update, and manage AWS QuickSight Topics using Alchemy Cloud Control.
---


The Topic resource lets you manage [AWS QuickSight Topics](https://docs.aws.amazon.com/quicksight/latest/userguide/) for organizing and managing data sets in your QuickSight environment.

## Minimal Example

Create a basic QuickSight Topic with a name, description, and a dataset.

```ts
import AWS from "alchemy/aws/control";

const quickSightTopic = await AWS.QuickSight.Topic("basicTopic", {
  Name: "Sales Insights",
  Description: "A topic for analyzing sales data",
  AwsAccountId: "123456789012",
  TopicId: "sales-insights",
  DataSets: [
    {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:dataset/sales-data"
    }
  ]
});
```

## Advanced Configuration

Configure a QuickSight Topic with folder ARNs and user experience version.

```ts
const advancedQuickSightTopic = await AWS.QuickSight.Topic("advancedTopic", {
  Name: "Marketing Insights",
  Description: "A topic for analyzing marketing campaigns",
  AwsAccountId: "123456789012",
  TopicId: "marketing-insights",
  DataSets: [
    {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:dataset/marketing-data"
    }
  ],
  FolderArns: [
    "arn:aws:quicksight:us-east-1:123456789012:folder/marketing-reports"
  ],
  UserExperienceVersion: "V2",
  ConfigOptions: {
    // Additional configuration options can be added here
  }
});
```

## Using Config Options

Create a QuickSight Topic that includes specific configuration options.

```ts
const configQuickSightTopic = await AWS.QuickSight.Topic("configTopic", {
  Name: "Finance Insights",
  Description: "A topic for analyzing financial reports",
  AwsAccountId: "123456789012",
  TopicId: "finance-insights",
  DataSets: [
    {
      Arn: "arn:aws:quicksight:us-east-1:123456789012:dataset/finance-data"
    }
  ],
  ConfigOptions: {
    // Example config options
    EnableRowLevelSecurity: true,
    SecurityConfiguration: {
      // Define security configurations as needed
    }
  }
});
```

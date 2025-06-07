---
title: Managing AWS QBusiness Indexs with Alchemy
description: Learn how to create, update, and manage AWS QBusiness Indexs using Alchemy Cloud Control.
---

# Index

The Index resource lets you create and manage [AWS QBusiness Indexs](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-index.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const index = await AWS.QBusiness.Index("index-example", {
  DisplayName: "index-display",
  ApplicationId: "example-applicationid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A index resource managed by Alchemy",
});
```

## Advanced Configuration

Create a index with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIndex = await AWS.QBusiness.Index("advanced-index", {
  DisplayName: "index-display",
  ApplicationId: "example-applicationid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A index resource managed by Alchemy",
});
```


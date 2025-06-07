---
title: Managing AWS QBusiness Retrievers with Alchemy
description: Learn how to create, update, and manage AWS QBusiness Retrievers using Alchemy Cloud Control.
---

# Retriever

The Retriever resource lets you create and manage [AWS QBusiness Retrievers](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-retriever.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const retriever = await AWS.QBusiness.Retriever("retriever-example", {
  Type: "example-type",
  Configuration: "example-configuration",
  DisplayName: "retriever-display",
  ApplicationId: "example-applicationid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a retriever with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRetriever = await AWS.QBusiness.Retriever("advanced-retriever", {
  Type: "example-type",
  Configuration: "example-configuration",
  DisplayName: "retriever-display",
  ApplicationId: "example-applicationid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


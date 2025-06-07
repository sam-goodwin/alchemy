---
title: Managing AWS SecurityHub Insights with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub Insights using Alchemy Cloud Control.
---

# Insight

The Insight resource lets you create and manage [AWS SecurityHub Insights](https://docs.aws.amazon.com/securityhub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-insight.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const insight = await AWS.SecurityHub.Insight("insight-example", {
  Filters: "example-filters",
  GroupByAttribute: "example-groupbyattribute",
  Name: "insight-",
});
```


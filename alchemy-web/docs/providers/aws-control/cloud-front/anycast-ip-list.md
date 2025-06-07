---
title: Managing AWS CloudFront AnycastIpLists with Alchemy
description: Learn how to create, update, and manage AWS CloudFront AnycastIpLists using Alchemy Cloud Control.
---

# AnycastIpList

The AnycastIpList resource lets you create and manage [AWS CloudFront AnycastIpLists](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-anycastiplist.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const anycastiplist = await AWS.CloudFront.AnycastIpList("anycastiplist-example", {
  IpCount: 1,
  Name: "anycastiplist-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a anycastiplist with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAnycastIpList = await AWS.CloudFront.AnycastIpList("advanced-anycastiplist", {
  IpCount: 1,
  Name: "anycastiplist-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


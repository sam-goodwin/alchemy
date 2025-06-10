---
title: AnycastIpList
description: Learn how to create, update, and manage AWS CloudFront AnycastIpLists using Alchemy Cloud Control.
---


The AnycastIpList resource allows you to manage [AWS CloudFront Anycast IP lists](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for your distribution, enabling efficient routing and improved performance.

## Minimal Example

Create a basic Anycast IP list with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const anycastIpList = await AWS.CloudFront.AnycastIpList("myAnycastIpList", {
  IpCount: 2,
  Name: "MyAnycastIPList",
  Tags: {
    Environment: "Production",
    Team: "Networking"
  }
});
```

## Advanced Configuration

Configure an Anycast IP list with the option to adopt an existing resource if it already exists.

```ts
const advancedAnycastIpList = await AWS.CloudFront.AnycastIpList("advancedAnycastIpList", {
  IpCount: 5,
  Name: "AdvancedAnycastIPList",
  adopt: true,
  Tags: {
    Environment: "Staging",
    Project: "CDN Optimization"
  }
});
```

## Using with Existing Resources

Demonstrate how to create an Anycast IP list that can be adopted if it already exists.

```ts
const existingAnycastIpList = await AWS.CloudFront.AnycastIpList("existingAnycastIpList", {
  IpCount: 3,
  Name: "ExistingAnycastIPList",
  adopt: true
});
```

## Tagging for Cost Management

Create an Anycast IP list with specific tags for tracking costs associated with different environments.

```ts
const taggedAnycastIpList = await AWS.CloudFront.AnycastIpList("taggedAnycastIpList", {
  IpCount: 4,
  Name: "TaggedAnycastIPList",
  Tags: {
    Environment: "Development",
    CostCenter: "DevOps"
  }
});
```

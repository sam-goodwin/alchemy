---
title: ConnectionGroup
description: Learn how to create, update, and manage AWS CloudFront ConnectionGroups using Alchemy Cloud Control.
---


The ConnectionGroup resource allows you to manage [AWS CloudFront ConnectionGroups](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for enhanced routing control across multiple origins and improved network performance.

## Minimal Example

Create a basic ConnectionGroup with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicConnectionGroup = await AWS.CloudFront.ConnectionGroup("basic-connection-group", {
  name: "BasicConnectionGroup",
  enabled: true,
  ipv6Enabled: true
});
```

## Advanced Configuration

Configure a ConnectionGroup with additional settings, including tags and an Anycast IP List ID:

```ts
const advancedConnectionGroup = await AWS.CloudFront.ConnectionGroup("advanced-connection-group", {
  name: "AdvancedConnectionGroup",
  enabled: true,
  ipv6Enabled: true,
  anycastIpListId: "example-ip-list-id",
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "CloudOps" }
  ]
});
```

## Adoption of Existing Resource

Create a ConnectionGroup that adopts an existing resource instead of failing:

```ts
const existingConnectionGroup = await AWS.CloudFront.ConnectionGroup("existing-connection-group", {
  name: "ExistingConnectionGroup",
  adopt: true,
  enabled: true
});
```

## Enable ConnectionGroup with Specific Tags

Set up a ConnectionGroup with specific tags for better resource management:

```ts
const taggedConnectionGroup = await AWS.CloudFront.ConnectionGroup("tagged-connection-group", {
  name: "TaggedConnectionGroup",
  enabled: true,
  tags: [
    { Key: "Project", Value: "Migration" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

---
title: NetworkInsightsAccessScope
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsAccessScopes using Alchemy Cloud Control.
---


The NetworkInsightsAccessScope resource lets you define and manage access scopes for network insights in Amazon EC2. This resource provides a way to specify the paths and conditions under which network insights are applied. For more details, refer to the [AWS EC2 NetworkInsightsAccessScopes documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Network Insights Access Scope with required properties and a couple of common optional paths:

```ts
import AWS from "alchemy/aws/control";

const accessScope = await AWS.EC2.NetworkInsightsAccessScope("basicAccessScope", {
  MatchPaths: [{
    PathId: "match-path-1",
    PathType: "VpcPeering"
  }],
  ExcludePaths: [{
    PathId: "exclude-path-1",
    PathType: "InternetGateway"
  }],
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Advanced Configuration

Configure a more complex Network Insights Access Scope with multiple match and exclude paths:

```ts
const advancedAccessScope = await AWS.EC2.NetworkInsightsAccessScope("advancedAccessScope", {
  MatchPaths: [{
    PathId: "match-path-2",
    PathType: "TransitGateway"
  }, {
    PathId: "match-path-3",
    PathType: "VPC"
  }],
  ExcludePaths: [{
    PathId: "exclude-path-2",
    PathType: "NATGateway"
  }],
  Tags: [{
    Key: "Project",
    Value: "NetworkOptimization"
  }, {
    Key: "Owner",
    Value: "TeamA"
  }]
});
```

## Use Case: Adopting Existing Resources

Create an access scope that adopts an existing resource instead of failing on conflict:

```ts
const adoptedAccessScope = await AWS.EC2.NetworkInsightsAccessScope("adoptedAccessScope", {
  MatchPaths: [{
    PathId: "adopted-match-path",
    PathType: "VpcPeering"
  }],
  adopt: true // Adopt existing resource if it exists
});
```

## Use Case: Tagging for Organization

Define an access scope with multiple tags for better resource management:

```ts
const taggedAccessScope = await AWS.EC2.NetworkInsightsAccessScope("taggedAccessScope", {
  MatchPaths: [{
    PathId: "tagged-path-1",
    PathType: "VPC"
  }],
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Department",
    Value: "Engineering"
  }]
});
```

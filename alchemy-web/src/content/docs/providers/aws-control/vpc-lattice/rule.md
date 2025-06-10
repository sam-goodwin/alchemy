---
title: Rule
description: Learn how to create, update, and manage AWS VpcLattice Rules using Alchemy Cloud Control.
---


The Rule resource lets you manage [AWS VpcLattice Rules](https://docs.aws.amazon.com/vpclattice/latest/userguide/) that define how incoming requests are routed to your services based on specified conditions.

## Minimal Example

Create a basic VpcLattice Rule with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleRule = await AWS.VpcLattice.Rule("simple-rule", {
  Action: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/my-target-group"
  },
  Priority: 10,
  Match: {
    Path: "/api/*",
    Method: ["GET", "POST"]
  },
  ListenerIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:listener/my-listener"
});
```

## Advanced Configuration

Configure a rule with additional settings, including tags and a service identifier.

```ts
const advancedRule = await AWS.VpcLattice.Rule("advanced-rule", {
  Action: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/advanced-target-group"
  },
  Priority: 20,
  Match: {
    Path: "/api/v1/*",
    Method: ["GET"]
  },
  ListenerIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:listener/my-advanced-listener",
  ServiceIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:service/my-service",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Specific Use Case: Rate Limiting

Create a rule that applies rate limiting for specific paths.

```ts
const rateLimitingRule = await AWS.VpcLattice.Rule("rate-limiting-rule", {
  Action: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/rate-limit-target-group"
  },
  Priority: 30,
  Match: {
    Path: "/api/limited/*",
    Method: ["POST"]
  },
  ListenerIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:listener/my-rate-limiter-listener",
  Tags: [
    { Key: "RateLimit", Value: "true" }
  ]
});
```

## Conditional Routing Example

Define a rule that routes traffic based on headers.

```ts
const headerBasedRule = await AWS.VpcLattice.Rule("header-based-rule", {
  Action: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/header-target-group"
  },
  Priority: 40,
  Match: {
    Headers: {
      "X-Api-Version": ["v1"]
    }
  },
  ListenerIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:listener/my-header-listener",
  Tags: [
    { Key: "API", Value: "Versioned" }
  ]
});
```

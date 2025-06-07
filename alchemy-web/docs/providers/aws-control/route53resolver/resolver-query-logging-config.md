---
title: Managing AWS Route53Resolver ResolverQueryLoggingConfigs with Alchemy
description: Learn how to create, update, and manage AWS Route53Resolver ResolverQueryLoggingConfigs using Alchemy Cloud Control.
---

# ResolverQueryLoggingConfig

The `ResolverQueryLoggingConfig` resource allows you to manage query logging configurations for Amazon Route 53 Resolver, enabling you to capture DNS queries and send them to a specified destination. For more details, refer to the [AWS Route53Resolver ResolverQueryLoggingConfigs documentation](https://docs.aws.amazon.com/route53resolver/latest/userguide/).

## Minimal Example

Create a basic query logging configuration with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const QueryLoggingConfig = await AWS.Route53Resolver.ResolverQueryLoggingConfig("BasicQueryLogConfig", {
  DestinationArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
  Name: "BasicQueryLog",
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

Configure a query logging setting with additional properties like multiple tags and a specific destination ARN.

```ts
const AdvancedQueryLoggingConfig = await AWS.Route53Resolver.ResolverQueryLoggingConfig("AdvancedQueryLogConfig", {
  DestinationArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-advanced-log-group",
  Name: "AdvancedQueryLog",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Network" }
  ],
  adopt: true // Adopts existing resource if it already exists
});
```

## Logging for Multiple Environments

Set up distinct logging configurations for different environments to segregate DNS query logs.

```ts
const DevQueryLoggingConfig = await AWS.Route53Resolver.ResolverQueryLoggingConfig("DevQueryLogConfig", {
  DestinationArn: "arn:aws:logs:us-west-2:123456789012:log-group:dev-log-group",
  Name: "DevelopmentQueryLog",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "Internal" }
  ]
});

const ProdQueryLoggingConfig = await AWS.Route53Resolver.ResolverQueryLoggingConfig("ProdQueryLogConfig", {
  DestinationArn: "arn:aws:logs:us-west-2:123456789012:log-group:prod-log-group",
  Name: "ProductionQueryLog",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "Customer" }
  ]
});
```
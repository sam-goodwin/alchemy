---
title: ResolverQueryLoggingConfig
description: Learn how to create, update, and manage AWS Route53Resolver ResolverQueryLoggingConfigs using Alchemy Cloud Control.
---


The ResolverQueryLoggingConfig resource lets you manage [AWS Route53Resolver Query Logging Configurations](https://docs.aws.amazon.com/route53resolver/latest/userguide/). This resource allows you to log DNS queries for your VPCs to a specified destination, enabling better monitoring and analysis of DNS activity.

## Minimal Example

Create a basic Resolver Query Logging Configuration with a destination ARN.

```ts
import AWS from "alchemy/aws/control";

const queryLoggingConfig = await AWS.Route53Resolver.ResolverQueryLoggingConfig("basicQueryLoggingConfig", {
  destinationArn: "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group",
  name: "BasicLoggingConfig"
});
```

## Advanced Configuration

Configure a Resolver Query Logging Configuration with tags for better resource management.

```ts
const advancedQueryLoggingConfig = await AWS.Route53Resolver.ResolverQueryLoggingConfig("advancedQueryLoggingConfig", {
  destinationArn: "arn:aws:logs:us-east-1:123456789012:log-group:my-advanced-log-group",
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DNSLogging" }
  ],
  name: "AdvancedLoggingConfig"
});
```

## Adopting Existing Resources

If you want to adopt an existing Resolver Query Logging Configuration instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptedQueryLoggingConfig = await AWS.Route53Resolver.ResolverQueryLoggingConfig("adoptedQueryLoggingConfig", {
  destinationArn: "arn:aws:logs:us-east-1:123456789012:log-group:existing-log-group",
  adopt: true,
  name: "AdoptedLoggingConfig"
});
```

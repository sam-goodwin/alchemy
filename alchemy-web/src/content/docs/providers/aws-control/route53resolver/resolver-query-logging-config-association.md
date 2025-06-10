---
title: ResolverQueryLoggingConfigAssociation
description: Learn how to create, update, and manage AWS Route53Resolver ResolverQueryLoggingConfigAssociations using Alchemy Cloud Control.
---


The ResolverQueryLoggingConfigAssociation resource allows you to associate a Resolver Query Logging Configuration with a specific resource in AWS Route 53 Resolver. This enables you to log DNS queries to the specified logging configuration. For more details, refer to the [AWS Route53Resolver ResolverQueryLoggingConfigAssociations documentation](https://docs.aws.amazon.com/route53resolver/latest/userguide/).

## Minimal Example

Create a basic Resolver Query Logging Config Association by specifying the required properties.

```ts
import AWS from "alchemy/aws/control";

const queryLoggingConfigAssociation = await AWS.Route53Resolver.ResolverQueryLoggingConfigAssociation("basicConfigAssociation", {
  ResourceId: "vpc-12345678", // VPC ID to associate
  ResolverQueryLogConfigId: "rslvr-12345678", // Log configuration ID
  adopt: false // Default is false; will fail if the resource already exists
});
```

## Advanced Configuration

Associate a logging configuration with additional properties, including adoption of existing resources.

```ts
const advancedConfigAssociation = await AWS.Route53Resolver.ResolverQueryLoggingConfigAssociation("advancedConfigAssociation", {
  ResourceId: "vpc-87654321", // Another VPC ID
  ResolverQueryLogConfigId: "rslvr-87654321", // Another log configuration ID
  adopt: true // Set to true to adopt an existing resource instead of failing
});
```

## Logging Configuration for Multiple Resources

You can create multiple associations for different resources, ensuring that all necessary components are logged.

```ts
const firstAssociation = await AWS.Route53Resolver.ResolverQueryLoggingConfigAssociation("firstAssociation", {
  ResourceId: "vpc-11223344",
  ResolverQueryLogConfigId: "rslvr-11223344"
});

const secondAssociation = await AWS.Route53Resolver.ResolverQueryLoggingConfigAssociation("secondAssociation", {
  ResourceId: "vpc-44332211",
  ResolverQueryLogConfigId: "rslvr-44332211",
  adopt: true
});
```

## Updating Existing Associations

This example demonstrates how to update an existing association, changing the logging configuration while keeping the same resource.

```ts
const updatedAssociation = await AWS.Route53Resolver.ResolverQueryLoggingConfigAssociation("updatedAssociation", {
  ResourceId: "vpc-12345678",
  ResolverQueryLogConfigId: "rslvr-newconfigid-12345678",
  adopt: false // Default behavior
});
```

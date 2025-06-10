---
title: ReadinessCheck
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness ReadinessChecks using Alchemy Cloud Control.
---


The ReadinessCheck resource allows you to manage [AWS Route53RecoveryReadiness ReadinessChecks](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) for ensuring your applications can recover from failures.

## Minimal Example

Create a basic readiness check with a specified resource set name and check name.

```ts
import AWS from "alchemy/aws/control";

const basicReadinessCheck = await AWS.Route53RecoveryReadiness.ReadinessCheck("basicReadinessCheck", {
  ResourceSetName: "myResourceSet",
  ReadinessCheckName: "myReadinessCheck"
});
```

## Advanced Configuration

Configure a readiness check with tags for better resource management and organization.

```ts
const taggedReadinessCheck = await AWS.Route53RecoveryReadiness.ReadinessCheck("taggedReadinessCheck", {
  ResourceSetName: "myResourceSet",
  ReadinessCheckName: "myTagCheck",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Adoption of Existing Resources

Create a readiness check that adopts an existing resource if it already exists.

```ts
const adoptExistingReadinessCheck = await AWS.Route53RecoveryReadiness.ReadinessCheck("adoptExistingCheck", {
  ResourceSetName: "myResourceSet",
  ReadinessCheckName: "myAdoptCheck",
  adopt: true
});
```

## Monitoring Readiness Check Properties

You can access the properties of a readiness check after its creation, such as ARN and timestamps.

```ts
const readinessCheckDetails = await AWS.Route53RecoveryReadiness.ReadinessCheck("detailsCheck", {
  ResourceSetName: "myResourceSet",
  ReadinessCheckName: "myDetailsCheck"
});

// Log details about the readiness check
console.log(`ARN: ${readinessCheckDetails.Arn}`);
console.log(`Created At: ${readinessCheckDetails.CreationTime}`);
console.log(`Last Updated At: ${readinessCheckDetails.LastUpdateTime}`);
```

---
title: Managing AWS Route53RecoveryReadiness ReadinessChecks with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness ReadinessChecks using Alchemy Cloud Control.
---

# ReadinessCheck

The ReadinessCheck resource allows you to create and manage [AWS Route53RecoveryReadiness ReadinessChecks](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) for assessing the readiness of your resources for recovery. This resource helps ensure your application can effectively recover from failures.

## Minimal Example

Create a basic ReadinessCheck with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicReadinessCheck = await AWS.Route53RecoveryReadiness.ReadinessCheck("BasicReadinessCheck", {
  ResourceSetName: "MyResourceSet",
  ReadinessCheckName: "MyReadinessCheck",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a ReadinessCheck with additional properties such as adopting existing resources.

```ts
const AdvancedReadinessCheck = await AWS.Route53RecoveryReadiness.ReadinessCheck("AdvancedReadinessCheck", {
  ResourceSetName: "MyResourceSet",
  ReadinessCheckName: "AdvancedReadinessCheck",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using ReadinessChecks for Multiple Resource Sets

Demonstrate how to create multiple ReadinessChecks for different resource sets.

```ts
const PrimaryReadinessCheck = await AWS.Route53RecoveryReadiness.ReadinessCheck("PrimaryReadinessCheck", {
  ResourceSetName: "PrimaryResourceSet",
  ReadinessCheckName: "PrimaryCheck",
  Tags: [{ Key: "Service", Value: "MainApp" }]
});

const SecondaryReadinessCheck = await AWS.Route53RecoveryReadiness.ReadinessCheck("SecondaryReadinessCheck", {
  ResourceSetName: "SecondaryResourceSet",
  ReadinessCheckName: "SecondaryCheck",
  Tags: [{ Key: "Service", Value: "BackupApp" }]
});
```
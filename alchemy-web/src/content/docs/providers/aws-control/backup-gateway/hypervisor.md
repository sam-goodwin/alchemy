---
title: Hypervisor
description: Learn how to create, update, and manage AWS BackupGateway Hypervisors using Alchemy Cloud Control.
---


The Hypervisor resource lets you manage [AWS BackupGateway Hypervisors](https://docs.aws.amazon.com/backupgateway/latest/userguide/) for backup solutions in your environment.

## Minimal Example

Create a basic Hypervisor with required properties and a few optional ones.

```ts
import AWS from "alchemy/aws/control";

const hypervisor = await AWS.BackupGateway.Hypervisor("myHypervisor", {
  host: "hypervisor.example.com",
  username: "admin",
  password: "securePassword123",
  kmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Advanced Configuration

Configure a Hypervisor with logging enabled and additional settings.

```ts
const advancedHypervisor = await AWS.BackupGateway.Hypervisor("advancedHypervisor", {
  host: "advanced-hypervisor.example.com",
  username: "admin",
  password: "anotherSecurePassword456",
  logGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
  kmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing Hypervisor instead of failing when the resource already exists.

```ts
const existingHypervisor = await AWS.BackupGateway.Hypervisor("existingHypervisor", {
  host: "existing-hypervisor.example.com",
  username: "admin",
  password: "existingPassword789",
  adopt: true
});
```

## Tagging for Resource Management

Create a Hypervisor with tags for improved resource management.

```ts
const taggedHypervisor = await AWS.BackupGateway.Hypervisor("taggedHypervisor", {
  host: "tagged-hypervisor.example.com",
  username: "admin",
  password: "taggedPassword012",
  tags: [
    { Key: "Project", Value: "BackupSolution" },
    { Key: "Owner", Value: "TeamAlpha" }
  ]
});
```

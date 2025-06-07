---
title: Managing AWS QLDB Ledgers with Alchemy
description: Learn how to create, update, and manage AWS QLDB Ledgers using Alchemy Cloud Control.
---

# Ledger

The Ledger resource allows you to manage [AWS QLDB Ledgers](https://docs.aws.amazon.com/qldb/latest/userguide/) for maintaining a transparent, immutable, and cryptographically verifiable transaction log.

## Minimal Example

Create a basic QLDB ledger with required properties and common optional settings like deletion protection and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicLedger = await AWS.QLDB.Ledger("BasicLedger", {
  PermissionsMode: "ALLOW_ALL",
  DeletionProtection: true,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Data" }
  ]
});
```

## Advanced Configuration

Configure a ledger with a specific KMS key for encryption and additional tags.

```ts
const AdvancedLedger = await AWS.QLDB.Ledger("AdvancedLedger", {
  PermissionsMode: "ALLOW_ALL",
  KmsKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-123456789abc",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Finance" }
  ]
});
```

## Adoption of Existing Resources

Create a ledger that adopts an existing resource instead of failing if the resource already exists.

```ts
const ExistingLedger = await AWS.QLDB.Ledger("ExistingLedger", {
  PermissionsMode: "ALLOW_ALL",
  adopt: true
});
```

## Using KMS for Data Protection

Set up a ledger with a KMS key for enhanced security and data protection.

```ts
const SecureLedger = await AWS.QLDB.Ledger("SecureLedger", {
  PermissionsMode: "ALLOW_ALL",
  KmsKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-abcd-1234-abcd-123456789abc",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Operations" }
  ]
});
```
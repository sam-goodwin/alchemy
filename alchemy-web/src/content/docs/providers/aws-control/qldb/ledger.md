---
title: Ledger
description: Learn how to create, update, and manage AWS QLDB Ledgers using Alchemy Cloud Control.
---


The Ledger resource lets you manage [AWS QLDB Ledgers](https://docs.aws.amazon.com/qldb/latest/userguide/) for immutable and cryptographically verifiable transaction logs.

## Minimal Example

Create a basic QLDB Ledger with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const simpleLedger = await AWS.QLDB.Ledger("simpleLedger", {
  PermissionsMode: "ALLOW_ALL",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a ledger with deletion protection and a KMS key for enhanced security.

```ts
const secureLedger = await AWS.QLDB.Ledger("secureLedger", {
  PermissionsMode: "ALLOW_ALL",
  DeletionProtection: true,
  KmsKey: "arn:aws:kms:us-east-1:123456789012:key/abcd-1234-abcd-1234-abcd1234abcd",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Adoption of Existing Ledger

Adopt an existing QLDB Ledger if it already exists without failing the operation.

```ts
const adoptedLedger = await AWS.QLDB.Ledger("existingLedger", {
  PermissionsMode: "ALLOW_ALL",
  adopt: true
});
```

## Example with Detailed Tags

Create a ledger and add multiple tags for better organization and billing.

```ts
const taggedLedger = await AWS.QLDB.Ledger("taggedLedger", {
  PermissionsMode: "ALLOW_ALL",
  Tags: [
    {
      Key: "Project",
      Value: "Finance"
    },
    {
      Key: "Owner",
      Value: "Alice"
    }
  ]
});
```

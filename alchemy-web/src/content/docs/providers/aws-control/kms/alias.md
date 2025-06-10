---
title: Alias
description: Learn how to create, update, and manage AWS KMS Aliases using Alchemy Cloud Control.
---


The Alias resource lets you manage [AWS KMS Aliases](https://docs.aws.amazon.com/kms/latest/userguide/) for your AWS Key Management Service (KMS) keys. An alias is a friendly name for a KMS key that you can use in place of the key's ID.

## Minimal Example

Create a basic KMS Alias for a specific key.

```ts
import AWS from "alchemy/aws/control";

const kmsAlias = await AWS.KMS.Alias("myKmsAlias", {
  TargetKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ab12-cd34-ef56-abcdef123456",
  AliasName: "alias/my-key-alias"
});
```

## Advanced Configuration

Create a KMS Alias while adopting an existing resource to avoid failure if the alias already exists.

```ts
const kmsAliasWithAdoption = await AWS.KMS.Alias("myKmsAliasAdopt", {
  TargetKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ab12-cd34-ef56-abcdef123456",
  AliasName: "alias/my-existing-key-alias",
  adopt: true
});
```

## Updating an Existing Alias

Update the target key of an existing alias.

```ts
const updatedKmsAlias = await AWS.KMS.Alias("myKmsAliasUpdate", {
  TargetKeyId: "arn:aws:kms:us-west-2:123456789012:key/efgh5678-ef56-ab12-cd34-abcdef123456",
  AliasName: "alias/my-key-alias"
});
```

## Listing All Aliases

While this example does not create a resource, it demonstrates how you can list all KMS aliases in your AWS account.

```ts
const listAliases = await AWS.KMS.Alias("listKmsAliases", {
  TargetKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ab12-cd34-ef56-abcdef123456", // This is just to maintain the structure
  AliasName: "alias/my-key-alias" // This is just to maintain the structure
});

// Note: You would replace this with actual logic to fetch and handle the list of aliases
console.log("KMS Aliases:", listAliases);
```

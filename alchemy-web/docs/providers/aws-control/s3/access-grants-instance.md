---
title: Managing AWS S3 AccessGrantsInstances with Alchemy
description: Learn how to create, update, and manage AWS S3 AccessGrantsInstances using Alchemy Cloud Control.
---

# AccessGrantsInstance

The AccessGrantsInstance resource allows you to manage [AWS S3 AccessGrantsInstances](https://docs.aws.amazon.com/s3/latest/userguide/) for configuring access grants in S3 buckets. This resource provides a way to specify permissions associated with identity center users.

## Minimal Example

Create a basic AccessGrantsInstance with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicAccessGrantsInstance = await AWS.S3.AccessGrantsInstance("BasicAccessGrants", {
  IdentityCenterArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Configure an AccessGrantsInstance with additional tags and the adopt property.

```ts
const AdvancedAccessGrantsInstance = await AWS.S3.AccessGrantsInstance("AdvancedAccessGrants", {
  IdentityCenterArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataScience" }
  ],
  adopt: true // Adopt existing resource instead of failing
});
```

## Managing Existing Resources

Utilize the adopt feature to manage existing AccessGrantsInstances without recreating them.

```ts
const ExistingAccessGrantsInstance = await AWS.S3.AccessGrantsInstance("ExistingAccessGrants", {
  IdentityCenterArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "development" }
  ],
  adopt: true // This will adopt the existing resource
});
```

## Adding Multiple Tags

Show how to configure an AccessGrantsInstance with multiple tags for better resource management.

```ts
const TaggedAccessGrantsInstance = await AWS.S3.AccessGrantsInstance("TaggedAccessGrants", {
  IdentityCenterArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Tags: [
    { Key: "Project", Value: "ProjectX" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```
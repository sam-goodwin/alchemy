---
title: AccessKey
description: Learn how to create, update, and manage AWS IAM AccessKeys using Alchemy Cloud Control.
---


The AccessKey resource allows you to manage [AWS IAM AccessKeys](https://docs.aws.amazon.com/iam/latest/userguide/) for IAM users, enabling programmatic access to AWS services.

## Minimal Example

Create a basic IAM AccessKey for a specified user with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicAccessKey = await AWS.IAM.AccessKey("basicAccessKey", {
  UserName: "john.doe",
  Status: "Active" // Optional: Can be "Active" or "Inactive"
});
```

## Advanced Configuration

Create an AccessKey with additional configuration, such as specifying a serial number:

```ts
const advancedAccessKey = await AWS.IAM.AccessKey("advancedAccessKey", {
  UserName: "jane.smith",
  Serial: 123456789, // Optional: Serial number associated with the key
  Status: "Active"
});
```

## Adopting Existing AccessKey

If you want to adopt an existing AccessKey without failing, use the `adopt` property:

```ts
const adoptedAccessKey = await AWS.IAM.AccessKey("adoptedAccessKey", {
  UserName: "existing.user",
  adopt: true // If true, adopts existing resource instead of failing
});
```

## AccessKey Rotation

You can create a new AccessKey to replace an existing one for a user:

```ts
const newAccessKey = await AWS.IAM.AccessKey("newAccessKey", {
  UserName: "developer.user",
  Status: "Active"
});

// Assume there is a function to delete the old key
await AWS.IAM.AccessKey("oldAccessKey", {
  UserName: "developer.user",
  Status: "Inactive" // Mark old key as inactive
});
```

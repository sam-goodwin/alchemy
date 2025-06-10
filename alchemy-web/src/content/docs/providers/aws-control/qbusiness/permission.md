---
title: Permission
description: Learn how to create, update, and manage AWS QBusiness Permissions using Alchemy Cloud Control.
---


The Permission resource allows you to manage [AWS QBusiness Permissions](https://docs.aws.amazon.com/qbusiness/latest/userguide/) for controlling access to specific actions within QBusiness applications.

## Minimal Example

Create a basic QBusiness permission with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicPermission = await AWS.QBusiness.Permission("basicPermission", {
  Actions: ["qbusiness:StartConversation", "qbusiness:StopConversation"],
  StatementId: "unique-statement-id-123",
  ApplicationId: "my-application-id",
  Principal: "arn:aws:iam::123456789012:user/my-iam-user"
});
```

## Advanced Configuration

Configure a permission that adopts an existing resource if it already exists.

```ts
const advancedPermission = await AWS.QBusiness.Permission("advancedPermission", {
  Actions: ["qbusiness:SendMessage", "qbusiness:ReceiveMessage"],
  StatementId: "advanced-statement-id-456",
  ApplicationId: "my-application-id",
  Principal: "arn:aws:iam::123456789012:user/my-iam-user",
  adopt: true // Adopt existing resource if it already exists
});
```

## Permission for Multiple Actions

Create a permission that grants access to a wider range of actions within the QBusiness application.

```ts
const multiActionPermission = await AWS.QBusiness.Permission("multiActionPermission", {
  Actions: [
    "qbusiness:StartConversation",
    "qbusiness:SendMessage",
    "qbusiness:ReceiveMessage",
    "qbusiness:StopConversation"
  ],
  StatementId: "multi-action-statement-id-789",
  ApplicationId: "my-application-id",
  Principal: "arn:aws:iam::123456789012:user/my-iam-user"
});
```

## Restricting Access by Principal

Demonstrate how to restrict permission to a specific IAM role.

```ts
const roleBasedPermission = await AWS.QBusiness.Permission("roleBasedPermission", {
  Actions: ["qbusiness:ManageSettings"],
  StatementId: "role-based-statement-id-101",
  ApplicationId: "my-application-id",
  Principal: "arn:aws:iam::123456789012:role/my-iam-role"
});
```

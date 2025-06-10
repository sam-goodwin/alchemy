---
title: User
description: Learn how to create, update, and manage AWS AppStream Users using Alchemy Cloud Control.
---


The User resource allows you to manage [AWS AppStream Users](https://docs.aws.amazon.com/appstream/latest/userguide/) within your AppStream environment. This resource is used to create, update, and delete user accounts that can access AppStream applications.

## Minimal Example

Create a basic AppStream user with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const appStreamUser = await AWS.AppStream.User("basicUser", {
  UserName: "john.doe",
  AuthenticationType: "USERPOOL", // Options include USERPOOL or SAML
  FirstName: "John",
  LastName: "Doe"
});
```

## Advanced Configuration

Configure an AppStream user with additional properties including a message action.

```ts
const advancedUser = await AWS.AppStream.User("advancedUser", {
  UserName: "jane.smith",
  AuthenticationType: "SAML",
  FirstName: "Jane",
  LastName: "Smith",
  MessageAction: "SUPPRESS" // This suppresses welcome email messages
});
```

## User Adoption

Create a user while adopting an existing resource, preventing failure if the resource already exists.

```ts
const adoptedUser = await AWS.AppStream.User("adoptedUser", {
  UserName: "existing.user",
  AuthenticationType: "USERPOOL",
  adopt: true // Adopt existing resource if it exists
});
```

## User with Custom Properties

Create a user with a specific authentication type and additional user details.

```ts
const customAuthUser = await AWS.AppStream.User("customAuthUser", {
  UserName: "mike.jones",
  AuthenticationType: "USERPOOL",
  FirstName: "Mike",
  LastName: "Jones",
  MessageAction: "SEND" // Send welcome message upon creation
});
```

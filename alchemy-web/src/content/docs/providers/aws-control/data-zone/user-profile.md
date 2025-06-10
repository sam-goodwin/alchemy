---
title: UserProfile
description: Learn how to create, update, and manage AWS DataZone UserProfiles using Alchemy Cloud Control.
---


The UserProfile resource lets you manage [AWS DataZone UserProfiles](https://docs.aws.amazon.com/datazone/latest/userguide/) within your AWS account, allowing you to define user types and their associated statuses.

## Minimal Example

Create a basic UserProfile with required properties.

```ts
import AWS from "alchemy/aws/control";

const userProfile = await AWS.DataZone.UserProfile("primaryUserProfile", {
  UserIdentifier: "user123@example.com",
  DomainIdentifier: "domainXYZ",
  Status: "ACTIVE",
  UserType: "MEMBER"
});
```

## Advanced Configuration

Configure a UserProfile with the option to adopt an existing resource if it already exists.

```ts
const advancedUserProfile = await AWS.DataZone.UserProfile("advancedUserProfile", {
  UserIdentifier: "manager@example.com",
  DomainIdentifier: "domainXYZ",
  Status: "ACTIVE",
  UserType: "ADMIN",
  adopt: true // Adopt existing UserProfile if it already exists
});
```

## Specific Use Case: Inactive UserProfile

Create a UserProfile that is marked as inactive for an offboarded user.

```ts
const inactiveUserProfile = await AWS.DataZone.UserProfile("inactiveUserProfile", {
  UserIdentifier: "formerEmployee@example.com",
  DomainIdentifier: "domainXYZ",
  Status: "INACTIVE",
  UserType: "MEMBER"
});
```

## Specific Use Case: UserProfile with Different UserType

Define a UserProfile for a guest user with specific properties.

```ts
const guestUserProfile = await AWS.DataZone.UserProfile("guestUserProfile", {
  UserIdentifier: "guestUser@example.com",
  DomainIdentifier: "domainXYZ",
  Status: "ACTIVE",
  UserType: "GUEST"
});
```

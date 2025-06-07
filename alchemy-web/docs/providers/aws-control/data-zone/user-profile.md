---
title: Managing AWS DataZone UserProfiles with Alchemy
description: Learn how to create, update, and manage AWS DataZone UserProfiles using Alchemy Cloud Control.
---

# UserProfile

The UserProfile resource lets you manage [AWS DataZone UserProfiles](https://docs.aws.amazon.com/datazone/latest/userguide/) and their configuration settings.

## Minimal Example

Create a user profile with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const userProfile = await AWS.DataZone.UserProfile("UserProfile1", {
  UserIdentifier: "user@example.com",
  DomainIdentifier: "example-domain",
  Status: "ACTIVE"
});
```

## Advanced Configuration

Configure a user profile with additional optional properties to specify user type and adoption behavior.

```ts
const advancedUserProfile = await AWS.DataZone.UserProfile("AdvancedUserProfile", {
  UserIdentifier: "admin@example.com",
  DomainIdentifier: "example-domain",
  UserType: "ADMIN",
  Status: "ACTIVE",
  adopt: true
});
```

## User Profile with Additional Properties

Here’s an example of creating a user profile while capturing the ARN and timestamps for tracking purposes.

```ts
const detailedUserProfile = await AWS.DataZone.UserProfile("DetailedUserProfile", {
  UserIdentifier: "user123@example.com",
  DomainIdentifier: "example-domain",
  Status: "ACTIVE"
});

// Accessing additional properties after creation
console.log("User Profile ARN:", detailedUserProfile.Arn);
console.log("Creation Time:", detailedUserProfile.CreationTime);
console.log("Last Update Time:", detailedUserProfile.LastUpdateTime);
```
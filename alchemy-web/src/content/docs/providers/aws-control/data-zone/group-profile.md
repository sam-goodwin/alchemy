---
title: GroupProfile
description: Learn how to create, update, and manage AWS DataZone GroupProfiles using Alchemy Cloud Control.
---


The GroupProfile resource lets you manage [AWS DataZone GroupProfiles](https://docs.aws.amazon.com/datazone/latest/userguide/) which define groups within your data environment and their associated permissions.

## Minimal Example

Create a basic GroupProfile with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const groupProfile = await AWS.DataZone.GroupProfile("myGroupProfile", {
  DomainIdentifier: "myDomain",
  GroupIdentifier: "myGroup",
  Status: "ACTIVE" // Optional: Set the status of the GroupProfile
});
```

## Advanced Configuration

Configure a GroupProfile with the option to adopt an existing resource.

```ts
const existingGroupProfile = await AWS.DataZone.GroupProfile("existingGroupProfile", {
  DomainIdentifier: "myDomain",
  GroupIdentifier: "existingGroup",
  adopt: true // Optional: Adopt an existing GroupProfile instead of failing
});
```

## Updating GroupProfile Status

Update the status of an existing GroupProfile to "INACTIVE".

```ts
const updatedGroupProfile = await AWS.DataZone.GroupProfile("updateGroupProfile", {
  DomainIdentifier: "myDomain",
  GroupIdentifier: "myGroup",
  Status: "INACTIVE"
});
```

## Handling Nonexistent Resources

Attempt to create a GroupProfile, specifying to adopt if it already exists.

```ts
const adoptGroupProfile = await AWS.DataZone.GroupProfile("adoptGroupProfile", {
  DomainIdentifier: "myDomain",
  GroupIdentifier: "myGroup",
  adopt: true // Option to adopt if the resource already exists
});
```

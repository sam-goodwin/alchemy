---
title: ProfileAssociation
description: Learn how to create, update, and manage AWS Route53Profiles ProfileAssociations using Alchemy Cloud Control.
---


The ProfileAssociation resource allows you to associate a resource with a profile in AWS Route53Profiles. This is essential for managing resources in a controlled manner, ensuring that they adhere to the policies and settings defined in the associated profile. For more information, refer to the [AWS Route53Profiles ProfileAssociations documentation](https://docs.aws.amazon.com/route53profiles/latest/userguide/).

## Minimal Example

Create a basic ProfileAssociation linking a resource to a profile:

```ts
import AWS from "alchemy/aws/control";

const profileAssociation = await AWS.Route53Profiles.ProfileAssociation("basicProfileAssociation", {
  ProfileId: "profile-12345",
  ResourceId: "resource-67890",
  Name: "MyProfileAssociation"
});
```

## Advanced Configuration

Configure a ProfileAssociation with tags and the option to adopt an existing resource:

```ts
const advancedProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("advancedProfileAssociation", {
  ProfileId: "profile-12345",
  ResourceId: "resource-67890",
  Name: "AdvancedProfileAssociation",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevTeam" }
  ],
  adopt: true
});
```

## Handling Resource Updates

Update an existing ProfileAssociation by changing its name and tags:

```ts
const updatedProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("updatedProfileAssociation", {
  ProfileId: "profile-12345",
  ResourceId: "resource-67890",
  Name: "UpdatedProfileAssociation",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "QA Team" }
  ]
});
```

## Deleting a ProfileAssociation

Remove a ProfileAssociation when it's no longer needed:

```ts
const deleteProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("deleteProfileAssociation", {
  ProfileId: "profile-12345",
  ResourceId: "resource-67890",
  Name: "DeleteProfileAssociation",
  adopt: false // Ensure this does not fail if resource is absent
});
```

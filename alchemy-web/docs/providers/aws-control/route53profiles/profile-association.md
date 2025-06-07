---
title: Managing AWS Route53Profiles ProfileAssociations with Alchemy
description: Learn how to create, update, and manage AWS Route53Profiles ProfileAssociations using Alchemy Cloud Control.
---

# ProfileAssociation

The ProfileAssociation resource lets you manage associations between Route 53 profiles and other AWS resources. This allows for the configuration of DNS settings and other related functionalities in a streamlined manner. For more detailed information, refer to the [AWS Route53Profiles ProfileAssociations](https://docs.aws.amazon.com/route53profiles/latest/userguide/) documentation.

## Minimal Example

Create a basic profile association with required properties and one optional tag:

```ts
import AWS from "alchemy/aws/control";

const BasicProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("BasicProfileAssociation", {
  ProfileId: "profile-123456",
  ResourceId: "resource-abc123",
  Tags: [
    { Key: "Environment", Value: "production" }
  ],
  Name: "MyProfileAssociation"
});
```

## Advanced Configuration

Configure a profile association with additional properties, including an ARN and multiple tags:

```ts
const AdvancedProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("AdvancedProfileAssociation", {
  ProfileId: "profile-789012",
  ResourceId: "resource-def456",
  Arn: "arn:aws:route53-profiles:us-west-2:123456789012:profile-association/advanced-association",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ],
  Name: "AdvancedProfileAssociation"
});
```

## Adoption of Existing Resource

This example demonstrates how to adopt an existing resource instead of failing when the resource already exists by setting the `adopt` property to true:

```ts
const AdoptExistingProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("AdoptExistingProfileAssociation", {
  ProfileId: "profile-345678",
  ResourceId: "resource-ghi789",
  adopt: true,
  Name: "AdoptedProfileAssociation"
});
```

## Creating Multiple Profile Associations

Demonstrate how to create multiple profile associations for different resources under the same profile:

```ts
const FirstProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("FirstProfileAssociation", {
  ProfileId: "profile-123456",
  ResourceId: "resource-abc123",
  Name: "FirstAssociation"
});

const SecondProfileAssociation = await AWS.Route53Profiles.ProfileAssociation("SecondProfileAssociation", {
  ProfileId: "profile-123456",
  ResourceId: "resource-def456",
  Name: "SecondAssociation"
});
```
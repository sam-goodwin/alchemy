---
title: ProfileResourceAssociation
description: Learn how to create, update, and manage AWS Route53Profiles ProfileResourceAssociations using Alchemy Cloud Control.
---


The ProfileResourceAssociation resource lets you manage associations between profiles and resources in AWS Route53Profiles. This allows for better organization and management of resources linked to specific profiles. For more information, visit the [AWS Route53Profiles ProfileResourceAssociations documentation](https://docs.aws.amazon.com/route53profiles/latest/userguide/).

## Minimal Example

Create a basic ProfileResourceAssociation with required properties:

```ts
import AWS from "alchemy/aws/control";

const profileAssociation = await AWS.Route53Profiles.ProfileResourceAssociation("basicProfileAssociation", {
  ProfileId: "profile-12345678-abcd-ef00-0000-000000000000",
  ResourceArn: "arn:aws:route53:::resource/1234abcd-12ab-34cd-56ef-1234567890ab",
  Name: "MyProfileResourceAssociation"
});
```

## Advanced Configuration

Configure a ProfileResourceAssociation with optional properties, including resource properties and the adopt flag:

```ts
const advancedProfileAssociation = await AWS.Route53Profiles.ProfileResourceAssociation("advancedProfileAssociation", {
  ProfileId: "profile-87654321-dcba-fe00-0000-000000000000",
  ResourceArn: "arn:aws:route53:::resource/abcd1234-56ab-78cd-90ef-1234567890ab",
  ResourceProperties: JSON.stringify({
    setting1: "value1",
    setting2: "value2"
  }),
  Name: "AdvancedProfileResourceAssociation",
  adopt: true
});
```

## Adoption of Existing Resources

This example demonstrates how to adopt an existing resource instead of failing when the resource already exists:

```ts
const adoptProfileAssociation = await AWS.Route53Profiles.ProfileResourceAssociation("adoptExistingResource", {
  ProfileId: "profile-abcdefgh-ijkl-mnop-qrst-uvwxyz012345",
  ResourceArn: "arn:aws:route53:::resource/abcdef12-34gh-56ij-78kl-90mnopqrstuv",
  Name: "AdoptedProfileResourceAssociation",
  adopt: true
});
```

## Adding Resource Properties

This example showcases how to include custom resource properties in the association:

```ts
const resourcePropertiesAssociation = await AWS.Route53Profiles.ProfileResourceAssociation("resourcePropertiesAssociation", {
  ProfileId: "profile-13579246-ace0-bdf1-2345-67890abcdefg",
  ResourceArn: "arn:aws:route53:::resource/12345678-abcd-1234-efgh-567890abcdef",
  ResourceProperties: JSON.stringify({
    dnsRecordType: "A",
    dnsRecordValue: "192.0.2.1",
    ttl: 300
  }),
  Name: "ResourcePropertiesProfileResourceAssociation"
});
```

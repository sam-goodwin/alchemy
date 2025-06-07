---
title: Managing AWS Route53Profiles Profiles with Alchemy
description: Learn how to create, update, and manage AWS Route53Profiles Profiles using Alchemy Cloud Control.
---

# Profile

The Profile resource lets you manage [AWS Route53Profiles Profiles](https://docs.aws.amazon.com/route53profiles/latest/userguide/) for controlling DNS settings and configurations in AWS Route 53.

## Minimal Example

Create a basic Route53Profiles Profile with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicProfile = await AWS.Route53Profiles.Profile("BasicProfile", {
  Name: "MyProfile",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Network" }
  ]
});
```

## Advanced Configuration

Configure a Profile with additional settings, including the option to adopt an existing resource.

```ts
const AdvancedProfile = await AWS.Route53Profiles.Profile("AdvancedProfile", {
  Name: "AdvancedProfile",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true
});
```

## Profile with Custom Tags

Create a Profile that includes custom tags for better resource management.

```ts
const TaggedProfile = await AWS.Route53Profiles.Profile("TaggedProfile", {
  Name: "CustomTaggedProfile",
  Tags: [
    { Key: "Project", Value: "WebsiteMigration" },
    { Key: "Owner", Value: "JohnDoe" }
  ]
});
```

## Profile with No Tags

Create a Profile without any tags, focusing only on the essential properties.

```ts
const UntaggedProfile = await AWS.Route53Profiles.Profile("UntaggedProfile", {
  Name: "UntaggedProfile"
});
```
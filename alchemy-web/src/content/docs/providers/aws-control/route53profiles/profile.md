---
title: Profile
description: Learn how to create, update, and manage AWS Route53Profiles Profiles using Alchemy Cloud Control.
---


The Profile resource lets you manage [AWS Route53Profiles Profiles](https://docs.aws.amazon.com/route53profiles/latest/userguide/) for configuring and managing DNS settings in AWS Route 53.

## Minimal Example

Create a basic profile with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const profile = await AWS.Route53Profiles.Profile("basicProfile", {
  name: "BasicProfile",
  tags: [
    {
      key: "Environment",
      value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a profile with additional properties such as the adoption of existing resources.

```ts
const advancedProfile = await AWS.Route53Profiles.Profile("advancedProfile", {
  name: "AdvancedProfile",
  adopt: true,
  tags: [
    {
      key: "Project",
      value: "Route53Migration"
    },
    {
      key: "Owner",
      value: "DevTeam"
    }
  ]
});
```

## Resource Adoption

Create a profile while adopting an existing resource if it already exists.

```ts
const adoptedProfile = await AWS.Route53Profiles.Profile("adoptedProfile", {
  name: "AdoptedProfile",
  adopt: true
});
```

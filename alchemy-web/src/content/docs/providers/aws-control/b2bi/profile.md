---
title: Profile
description: Learn how to create, update, and manage AWS B2BI Profiles using Alchemy Cloud Control.
---


The Profile resource allows you to manage [AWS B2BI Profiles](https://docs.aws.amazon.com/b2bi/latest/userguide/) for configuring business interactions and communication settings.

## Minimal Example

Create a basic B2BI Profile with required properties and some optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicProfile = await AWS.B2BI.Profile("basicProfileId", {
  Name: "Acme Corporation",
  BusinessName: "Acme Corp",
  Phone: "+1-555-123-4567",
  Logging: "INFO",
  Email: "contact@acmecorp.com"
});
```

## Advanced Configuration

Configure a B2BI Profile with tags for better resource management.

```ts
const taggedProfile = await AWS.B2BI.Profile("taggedProfileId", {
  Name: "Beta Technologies",
  BusinessName: "Beta Tech",
  Phone: "+1-555-987-6543",
  Logging: "DEBUG",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing B2BI Profile instead of creating a new one, you can set the `adopt` property to true.

```ts
const existingProfile = await AWS.B2BI.Profile("existingProfileId", {
  Name: "Gamma Solutions",
  BusinessName: "Gamma Sol",
  Phone: "+1-555-321-0987",
  Logging: "WARN",
  adopt: true
});
```

## Comprehensive Profile Configuration

Create a fully configured B2BI Profile with extensive details.

```ts
const fullProfile = await AWS.B2BI.Profile("fullProfileId", {
  Name: "Delta Enterprises",
  BusinessName: "Delta Ent.",
  Phone: "+1-555-654-3210",
  Logging: "ERROR",
  Email: "support@deltaent.com",
  Tags: [
    { Key: "Client", Value: "Gold" },
    { Key: "Region", Value: "North America" }
  ]
});
```

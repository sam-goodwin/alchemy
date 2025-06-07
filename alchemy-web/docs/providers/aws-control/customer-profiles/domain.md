---
title: Managing AWS CustomerProfiles Domains with Alchemy
description: Learn how to create, update, and manage AWS CustomerProfiles Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you create and manage [AWS CustomerProfiles Domains](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-domain.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domain = await AWS.CustomerProfiles.Domain("domain-example", {
  DefaultExpirationDays: 1,
  DomainName: "domain-domain",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a domain with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomain = await AWS.CustomerProfiles.Domain("advanced-domain", {
  DefaultExpirationDays: 1,
  DomainName: "domain-domain",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


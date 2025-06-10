---
title: FirewallDomainList
description: Learn how to create, update, and manage AWS Route53Resolver FirewallDomainLists using Alchemy Cloud Control.
---


The FirewallDomainList resource lets you manage [AWS Route53Resolver Firewall Domain Lists](https://docs.aws.amazon.com/route53resolver/latest/userguide/) for defining domain filtering rules in your network configurations.

## Minimal Example

Create a basic FirewallDomainList with a few domains.

```ts
import AWS from "alchemy/aws/control";

const basicDomainList = await AWS.Route53Resolver.FirewallDomainList("basicDomainList", {
  domains: [
    "malicious.example.com",
    "phishing.example.com"
  ],
  name: "BasicMaliciousDomains"
});
```

## Advanced Configuration

Configure a FirewallDomainList with a domain file URL and tags for better management.

```ts
const advancedDomainList = await AWS.Route53Resolver.FirewallDomainList("advancedDomainList", {
  domainFileUrl: "https://example.com/path/to/domainlist.txt",
  tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Purpose",
      Value: "Security"
    }
  ],
  name: "AdvancedSecurityDomainList"
});
```

## Adopting Existing Resources

Adopt an existing FirewallDomainList instead of failing when the resource already exists.

```ts
const adoptedDomainList = await AWS.Route53Resolver.FirewallDomainList("adoptedDomainList", {
  domains: [
    "existing.example.com"
  ],
  name: "AdoptedDomainList",
  adopt: true
});
```

## Dynamic Domain List Update

Dynamically update an existing FirewallDomainList by adding new domains.

```ts
const updatedDomainList = await AWS.Route53Resolver.FirewallDomainList("updatedDomainList", {
  domains: [
    "newmalicious.example.com"
  ],
  name: "UpdatedMaliciousDomains",
  adopt: true
});
```

---
title: Managing AWS DataZone Domains with Alchemy
description: Learn how to create, update, and manage AWS DataZone Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you create and manage [AWS DataZone Domains](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-domain.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domain = await AWS.DataZone.Domain("domain-example", {
  DomainExecutionRole: "example-domainexecutionrole",
  Name: "domain-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A domain resource managed by Alchemy",
});
```

## Advanced Configuration

Create a domain with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomain = await AWS.DataZone.Domain("advanced-domain", {
  DomainExecutionRole: "example-domainexecutionrole",
  Name: "domain-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A domain resource managed by Alchemy",
});
```


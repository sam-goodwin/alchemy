---
title: Managing AWS DataZone DomainUnits with Alchemy
description: Learn how to create, update, and manage AWS DataZone DomainUnits using Alchemy Cloud Control.
---

# DomainUnit

The DomainUnit resource lets you create and manage [AWS DataZone DomainUnits](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-domainunit.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domainunit = await AWS.DataZone.DomainUnit("domainunit-example", {
  ParentDomainUnitIdentifier: "example-parentdomainunitidentifier",
  DomainIdentifier: "example-domainidentifier",
  Name: "domainunit-",
  Description: "A domainunit resource managed by Alchemy",
});
```

## Advanced Configuration

Create a domainunit with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomainUnit = await AWS.DataZone.DomainUnit("advanced-domainunit", {
  ParentDomainUnitIdentifier: "example-parentdomainunitidentifier",
  DomainIdentifier: "example-domainidentifier",
  Name: "domainunit-",
  Description: "A domainunit resource managed by Alchemy",
});
```


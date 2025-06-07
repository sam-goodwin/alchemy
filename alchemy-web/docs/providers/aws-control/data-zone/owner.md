---
title: Managing AWS DataZone Owners with Alchemy
description: Learn how to create, update, and manage AWS DataZone Owners using Alchemy Cloud Control.
---

# Owner

The Owner resource lets you create and manage [AWS DataZone Owners](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-owner.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const owner = await AWS.DataZone.Owner("owner-example", {
  EntityType: "example-entitytype",
  Owner: "example-owner",
  EntityIdentifier: "example-entityidentifier",
  DomainIdentifier: "example-domainidentifier",
});
```


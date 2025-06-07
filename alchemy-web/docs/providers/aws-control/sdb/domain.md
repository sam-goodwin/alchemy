---
title: Managing AWS SDB Domains with Alchemy
description: Learn how to create, update, and manage AWS SDB Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you create and manage [AWS SDB Domains](https://docs.aws.amazon.com/sdb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-simpledb.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domain = await AWS.SDB.Domain("domain-example", {
  Description: "A domain resource managed by Alchemy",
});
```

## Advanced Configuration

Create a domain with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomain = await AWS.SDB.Domain("advanced-domain", {
  Description: "A domain resource managed by Alchemy",
});
```


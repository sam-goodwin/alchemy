---
title: Managing AWS Athena NamedQuerys with Alchemy
description: Learn how to create, update, and manage AWS Athena NamedQuerys using Alchemy Cloud Control.
---

# NamedQuery

The NamedQuery resource lets you create and manage [AWS Athena NamedQuerys](https://docs.aws.amazon.com/athena/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-athena-namedquery.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const namedquery = await AWS.Athena.NamedQuery("namedquery-example", {
  QueryString: "example-querystring",
  Database: "example-database",
  Description: "A namedquery resource managed by Alchemy",
});
```

## Advanced Configuration

Create a namedquery with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNamedQuery = await AWS.Athena.NamedQuery("advanced-namedquery", {
  QueryString: "example-querystring",
  Database: "example-database",
  Description: "A namedquery resource managed by Alchemy",
});
```


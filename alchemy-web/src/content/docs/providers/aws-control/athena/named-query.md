---
title: NamedQuery
description: Learn how to create, update, and manage AWS Athena NamedQuerys using Alchemy Cloud Control.
---


The NamedQuery resource lets you manage [AWS Athena NamedQuerys](https://docs.aws.amazon.com/athena/latest/userguide/) for executing SQL queries against your data in Amazon S3.

## Minimal Example

Create a basic NamedQuery with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const namedQuery = await AWS.Athena.NamedQuery("basicNamedQuery", {
  QueryString: "SELECT * FROM my_database.my_table LIMIT 10;",
  Database: "my_database",
  WorkGroup: "primary" // Optional: Specify the workgroup
});
```

## Advanced Configuration

Configure a NamedQuery with a description and a custom name.

```ts
const advancedNamedQuery = await AWS.Athena.NamedQuery("advancedNamedQuery", {
  QueryString: "SELECT COUNT(*) FROM my_database.my_table WHERE status = 'active';",
  Database: "my_database",
  Description: "Counts active entries in my_table",
  Name: "CountActiveEntries" // Optional: Provide a custom name
});
```

## Adoption of Existing NamedQuery

Adopt an existing NamedQuery if it already exists, allowing for updates without failure.

```ts
const adoptedNamedQuery = await AWS.Athena.NamedQuery("adoptedNamedQuery", {
  QueryString: "SELECT * FROM my_database.another_table;",
  Database: "my_database",
  adopt: true // If true, adopt existing resource instead of failing when resource already exists
});
```

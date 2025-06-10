---
title: Domain
description: Learn how to create, update, and manage AWS SDB Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS SDB Domains](https://docs.aws.amazon.com/sdb/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic SDB Domain with a description.

```ts
import AWS from "alchemy/aws/control";

const simpleDbDomain = await AWS.SDB.Domain("simpleDbDomain", {
  Description: "A domain for storing application data",
  adopt: false // Default is false: Creates a new domain unless it already exists
});
```

## Advanced Configuration

Configure a domain with additional properties, such as enabling adoption of an existing resource.

```ts
const existingDomain = await AWS.SDB.Domain("existingDbDomain", {
  Description: "An existing domain that should be adopted",
  adopt: true // Set to true to adopt an existing domain if it exists
});
```

## Resource Properties Example

Create a domain that utilizes the additional properties available in the Cloud Control API.

```ts
const advancedDomain = await AWS.SDB.Domain("advancedDbDomain", {
  Description: "A domain for advanced data storage",
  adopt: false // Default is false
});

// Accessing additional properties
console.log(`Domain ARN: ${advancedDomain.Arn}`);
console.log(`Created at: ${advancedDomain.CreationTime}`);
console.log(`Last updated at: ${advancedDomain.LastUpdateTime}`);
```

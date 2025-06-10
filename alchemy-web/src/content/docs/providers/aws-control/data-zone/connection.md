---
title: Connection
description: Learn how to create, update, and manage AWS DataZone Connections using Alchemy Cloud Control.
---


The Connection resource allows you to create and manage connections within AWS DataZone, enabling connectivity and integration with various data sources and services. For more information, visit the [AWS DataZone Connections](https://docs.aws.amazon.com/datazone/latest/userguide/).

## Minimal Example

Create a basic DataZone connection with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const dataZoneConnection = await AWS.DataZone.Connection("myDataZoneConnection", {
  name: "MyDataZoneConnection",
  environmentIdentifier: "env-123456",
  domainIdentifier: "domain-987654",
  description: "This connection integrates with my data source."
});
```

## Advanced Configuration

Configure a DataZone connection with additional properties such as AWS location and custom connection properties.

```ts
const advancedDataZoneConnection = await AWS.DataZone.Connection("advancedConnection", {
  name: "AdvancedDataZoneConnection",
  environmentIdentifier: "env-123456",
  domainIdentifier: "domain-987654",
  description: "This connection includes advanced settings.",
  awsLocation: {
    region: "us-west-2",
    accountId: "123456789012"
  },
  props: {
    type: "S3",
    connectionString: "s3://my-data-source-bucket"
  }
});
```

## Connection Adoption

Create a connection that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedDataZoneConnection = await AWS.DataZone.Connection("adoptedConnection", {
  name: "AdoptedDataZoneConnection",
  environmentIdentifier: "env-123456",
  domainIdentifier: "domain-987654",
  adopt: true // Adopt an existing resource if it exists
});
```

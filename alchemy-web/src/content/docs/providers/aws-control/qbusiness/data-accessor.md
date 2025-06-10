---
title: DataAccessor
description: Learn how to create, update, and manage AWS QBusiness DataAccessors using Alchemy Cloud Control.
---


The DataAccessor resource allows you to create and manage AWS QBusiness DataAccessors, which are used to define how your application interacts with data. For more information, visit the [AWS QBusiness DataAccessors documentation](https://docs.aws.amazon.com/qbusiness/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic DataAccessor with required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicDataAccessor = await AWS.QBusiness.DataAccessor("basicDataAccessor", {
  DisplayName: "Basic Data Accessor",
  ActionConfigurations: [
    {
      Action: "Read",
      Resource: "arn:aws:qbusiness:us-west-2:123456789012:resource-id"
    }
  ],
  ApplicationId: "myAppId",
  Principal: "user@mydomain.com",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "DataIntegration" }
  ]
});
```

## Advanced Configuration

In this example, we configure a DataAccessor with multiple action configurations and a custom principal.

```ts
const advancedDataAccessor = await AWS.QBusiness.DataAccessor("advancedDataAccessor", {
  DisplayName: "Advanced Data Accessor",
  ActionConfigurations: [
    {
      Action: "Read",
      Resource: "arn:aws:qbusiness:us-west-2:123456789012:resource-id-read"
    },
    {
      Action: "Write",
      Resource: "arn:aws:qbusiness:us-west-2:123456789012:resource-id-write"
    }
  ],
  ApplicationId: "myAppId",
  Principal: "admin@mydomain.com",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Using Adopt Option

This example shows how to create a DataAccessor while adopting an existing resource if it already exists.

```ts
const adoptDataAccessor = await AWS.QBusiness.DataAccessor("adoptDataAccessor", {
  DisplayName: "Adopt Existing Data Accessor",
  ActionConfigurations: [
    {
      Action: "Read",
      Resource: "arn:aws:qbusiness:us-west-2:123456789012:resource-id-adopt"
    }
  ],
  ApplicationId: "myAppId",
  Principal: "user@mydomain.com",
  adopt: true
});
```

## Custom Tags and Metadata

In this example, we create a DataAccessor with additional tags for better resource management.

```ts
const taggedDataAccessor = await AWS.QBusiness.DataAccessor("taggedDataAccessor", {
  DisplayName: "Tagged Data Accessor",
  ActionConfigurations: [
    {
      Action: "Read",
      Resource: "arn:aws:qbusiness:us-west-2:123456789012:resource-id-tagged"
    }
  ],
  ApplicationId: "myAppId",
  Principal: "user@mydomain.com",
  Tags: [
    { Key: "Owner", Value: "TeamA" },
    { Key: "Service", Value: "DataService" },
    { Key: "CostCenter", Value: "12345" }
  ]
});
```

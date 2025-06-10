---
title: Type
description: Learn how to create, update, and manage AWS Cassandra Types using Alchemy Cloud Control.
---


The Type resource allows you to manage [AWS Cassandra Types](https://docs.aws.amazon.com/cassandra/latest/userguide/) within your keyspaces, enabling the definition of custom data structures in your Cassandra databases.

## Minimal Example

Create a Cassandra Type with required properties and an optional adoption flag:

```ts
import AWS from "alchemy/aws/control";

const cassandraType = await AWS.Cassandra.Type("userType", {
  TypeName: "User",
  Fields: [
    { Name: "userId", Type: "uuid" },
    { Name: "userName", Type: "text" },
    { Name: "email", Type: "text" }
  ],
  KeyspaceName: "UserProfile",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Define a Cassandra Type with more complex field types, including collections:

```ts
const complexType = await AWS.Cassandra.Type("orderType", {
  TypeName: "Order",
  Fields: [
    { Name: "orderId", Type: "uuid" },
    { Name: "items", Type: "list<text>" },
    { Name: "totalAmount", Type: "decimal" },
    { Name: "orderDate", Type: "timestamp" }
  ],
  KeyspaceName: "OrderManagement"
});
```

## Using Nested Types

Create a Cassandra Type that includes a nested type for addresses:

```ts
const addressType = await AWS.Cassandra.Type("addressType", {
  TypeName: "Address",
  Fields: [
    { Name: "street", Type: "text" },
    { Name: "city", Type: "text" },
    { Name: "zipCode", Type: "text" }
  ],
  KeyspaceName: "UserProfile"
});

const userWithAddressType = await AWS.Cassandra.Type("userWithAddressType", {
  TypeName: "UserWithAddress",
  Fields: [
    { Name: "userId", Type: "uuid" },
    { Name: "userName", Type: "text" },
    { Name: "addresses", Type: "list<frozen<Address>>" } // Using the nested Address type
  ],
  KeyspaceName: "UserProfile"
});
```

## Creating Types with Default Values

Define a Cassandra Type that includes default values for certain fields:

```ts
const defaultValueType = await AWS.Cassandra.Type("defaultValueType", {
  TypeName: "Product",
  Fields: [
    { Name: "productId", Type: "uuid" },
    { Name: "productName", Type: "text" },
    { Name: "price", Type: "decimal", Default: "0.00" }, // Default value for price
    { Name: "inStock", Type: "boolean", Default: "true" } // Default value for inStock
  ],
  KeyspaceName: "ProductCatalog"
});
```

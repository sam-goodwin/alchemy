---
title: ObjectType
description: Learn how to create, update, and manage AWS CustomerProfiles ObjectTypes using Alchemy Cloud Control.
---


The ObjectType resource lets you manage [AWS CustomerProfiles ObjectTypes](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) which define the structure of customer profiles in your application.

## Minimal Example

Create a basic ObjectType with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicObjectType = await AWS.CustomerProfiles.ObjectType("basicObjectType", {
  DomainName: "customer-domain",
  ObjectTypeName: "CustomerProfile",
  Description: "A type representing customer profile information",
  AllowProfileCreation: true
});
```

## Advanced Configuration

Configure an ObjectType with additional fields and keys to capture more detailed customer information.

```ts
const advancedObjectType = await AWS.CustomerProfiles.ObjectType("advancedObjectType", {
  DomainName: "customer-domain",
  ObjectTypeName: "CustomerProfile",
  Description: "A type representing customer profile information with specific fields",
  AllowProfileCreation: true,
  Fields: [
    { Name: "firstName", Type: "String" },
    { Name: "lastName", Type: "String" },
    { Name: "email", Type: "String" },
    { Name: "phoneNumber", Type: "String" }
  ],
  Keys: [
    { Name: "email" }
  ]
});
```

## Custom Encryption and Expiration

Create an ObjectType with custom encryption settings and expiration days for data retention.

```ts
const secureObjectType = await AWS.CustomerProfiles.ObjectType("secureObjectType", {
  DomainName: "customer-domain",
  ObjectTypeName: "SecureCustomerProfile",
  Description: "A secure type representing customer profiles with encryption",
  EncryptionKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmn1234opqr",
  ExpirationDays: 30,
  AllowProfileCreation: true
});
```

## Using Tags for Organization

Create an ObjectType with tags for better organization and resource management.

```ts
const taggedObjectType = await AWS.CustomerProfiles.ObjectType("taggedObjectType", {
  DomainName: "customer-domain",
  ObjectTypeName: "TaggedCustomerProfile",
  Description: "A type representing customer profiles with tags for organization",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Sales" }
  ]
});
```

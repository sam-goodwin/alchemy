---
title: IdMappingTable
description: Learn how to create, update, and manage AWS CleanRooms IdMappingTables using Alchemy Cloud Control.
---


The IdMappingTable resource allows you to manage [AWS CleanRooms IdMappingTables](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) for handling sensitive data and ensuring compliance while collaborating securely. This resource is essential for defining how identifiers are mapped within your CleanRooms membership.

## Minimal Example

Create a basic IdMappingTable with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const idMappingTable = await AWS.CleanRooms.IdMappingTable("myIdMappingTable", {
  MembershipIdentifier: "membership-12345",
  Name: "CustomerMapping",
  Description: "Mapping for customer identifiers",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
});
```

## Advanced Configuration

Configure an IdMappingTable with detailed input reference configuration and additional tags for better resource management.

```ts
import AWS from "alchemy/aws/control";

const advancedIdMappingTable = await AWS.CleanRooms.IdMappingTable("advancedIdMappingTable", {
  MembershipIdentifier: "membership-67890",
  Name: "OrderMapping",
  Description: "Mapping for order identifiers",
  InputReferenceConfig: {
    ReferenceType: "customer",
    ReferenceValues: ["customerId", "email"]
  },
  Tags: [
    { Key: "Project", Value: "DataCollaboration" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing IdMappingTable instead of failing when it already exists, you can set the `adopt` property to true.

```ts
import AWS from "alchemy/aws/control";

const adoptedIdMappingTable = await AWS.CleanRooms.IdMappingTable("adoptedIdMappingTable", {
  MembershipIdentifier: "membership-54321",
  Name: "AdoptedMapping",
  Description: "Adopting an existing mapping",
  adopt: true,
  InputReferenceConfig: {
    ReferenceType: "product",
    ReferenceValues: ["productId", "sku"]
  }
});
```

## Secure Configuration with KMS

Create an IdMappingTable that utilizes a KMS key for encryption of sensitive data.

```ts
import AWS from "alchemy/aws/control";

const secureIdMappingTable = await AWS.CleanRooms.IdMappingTable("secureIdMappingTable", {
  MembershipIdentifier: "membership-98765",
  Name: "SecureMapping",
  Description: "Mapping with KMS key for encryption",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  InputReferenceConfig: {
    ReferenceType: "transaction",
    ReferenceValues: ["transactionId", "amount"]
  }
});
```

---
title: Index
description: Learn how to create, update, and manage AWS Kendra Indexs using Alchemy Cloud Control.
---


The Index resource lets you manage [AWS Kendra Indexs](https://docs.aws.amazon.com/kendra/latest/userguide/) for powerful search capabilities across your data sources.

## Minimal Example

Create a basic Kendra Index with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const kendraIndex = await AWS.Kendra.Index("myKendraIndex", {
  name: "MyKendraIndex",
  roleArn: "arn:aws:iam::123456789012:role/KendraIndexRole",
  edition: "DEVELOPER_EDITION",
  description: "This index is for our corporate documents."
});
```

## Advanced Configuration

Configure a Kendra Index with additional settings such as server-side encryption and document metadata configurations.

```ts
const advancedKendraIndex = await AWS.Kendra.Index("advancedKendraIndex", {
  name: "AdvancedKendraIndex",
  roleArn: "arn:aws:iam::123456789012:role/KendraIndexRole",
  edition: "ENTERPRISE_EDITION",
  description: "This index handles sensitive corporate data.",
  serverSideEncryptionConfiguration: {
    kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
  },
  documentMetadataConfigurations: [
    {
      name: "Department",
      type: "STRING",
      key: "department"
    },
    {
      name: "Confidentiality",
      type: "STRING",
      key: "confidentiality"
    }
  ]
});
```

## User Context Policy

Define a user context policy to control access based on user attributes.

```ts
const userContextPolicyIndex = await AWS.Kendra.Index("userContextPolicyIndex", {
  name: "UserContextPolicyKendraIndex",
  roleArn: "arn:aws:iam::123456789012:role/KendraIndexRole",
  edition: "DEVELOPER_EDITION",
  userContextPolicy: "AttributeBased",
  description: "This index uses user attributes for search permissions."
});
```

## Capacity Units

Set up a Kendra Index with specific capacity units for document storage and query processing.

```ts
const capacityUnitsIndex = await AWS.Kendra.Index("capacityUnitsIndex", {
  name: "CapacityUnitsKendraIndex",
  roleArn: "arn:aws:iam::123456789012:role/KendraIndexRole",
  edition: "ENTERPRISE_EDITION",
  capacityUnits: {
    queryCapacityUnits: 5,
    storageCapacityUnits: 50
  },
  description: "This index is provisioned with specific capacity units."
});
```

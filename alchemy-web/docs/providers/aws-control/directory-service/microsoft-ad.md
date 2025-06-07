---
title: Managing AWS DirectoryService MicrosoftADs with Alchemy
description: Learn how to create, update, and manage AWS DirectoryService MicrosoftADs using Alchemy Cloud Control.
---

# MicrosoftAD

The MicrosoftAD resource lets you manage [AWS DirectoryService MicrosoftADs](https://docs.aws.amazon.com/directoryservice/latest/userguide/) for Active Directory functionality in the cloud.

## Minimal Example

Create a basic Microsoft AD directory with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const SimpleMicrosoftAD = await AWS.DirectoryService.MicrosoftAD("SimpleDirectory", {
  Name: "examplecorp.com",
  Password: "StrongPassword123!",
  VpcSettings: {
    VpcId: "vpc-0abcd1234efgh5678",
    SubnetIds: [
      "subnet-0abcd1234efgh5678",
      "subnet-1abcd1234efgh5678"
    ]
  },
  CreateAlias: true,
  EnableSso: true
});
```

## Advanced Configuration

Configure an advanced Microsoft AD directory with additional options for edition and short name.

```ts
const AdvancedMicrosoftAD = await AWS.DirectoryService.MicrosoftAD("AdvancedDirectory", {
  Name: "examplecorp.com",
  Password: "AnotherStrongPassword456!",
  VpcSettings: {
    VpcId: "vpc-0abcd1234efgh5678",
    SubnetIds: [
      "subnet-0abcd1234efgh5678",
      "subnet-1abcd1234efgh5678"
    ]
  },
  Edition: "Enterprise", // Options: Standard or Enterprise
  ShortName: "ExampleCorp",
  CreateAlias: true,
  EnableSso: false
});
```

## Adoption of Existing Resource

Adopt an already existing Microsoft AD directory into your management using the 'adopt' property.

```ts
const AdoptExistingMicrosoftAD = await AWS.DirectoryService.MicrosoftAD("AdoptedDirectory", {
  Name: "existingcorp.com",
  Password: "AdoptionPassword789!",
  VpcSettings: {
    VpcId: "vpc-0abcd1234efgh5678",
    SubnetIds: [
      "subnet-0abcd1234efgh5678",
      "subnet-1abcd1234efgh5678"
    ]
  },
  adopt: true
});
```
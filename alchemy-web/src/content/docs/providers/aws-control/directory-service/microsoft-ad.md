---
title: MicrosoftAD
description: Learn how to create, update, and manage AWS DirectoryService MicrosoftADs using Alchemy Cloud Control.
---


The MicrosoftAD resource lets you create and manage [AWS DirectoryService MicrosoftADs](https://docs.aws.amazon.com/directoryservice/latest/userguide/) for your applications. This resource enables you to set up a fully managed, cloud-based Microsoft Active Directory.

## Minimal Example

Create a basic MicrosoftAD with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMicrosoftAd = await AWS.DirectoryService.MicrosoftAD("basicMicrosoftAd", {
  Name: "mycompany.com",
  Password: "StrongPassword123!",
  VpcSettings: {
    VpcId: "vpc-0abcd1234efgh5678",
    SubnetIds: [
      "subnet-0abcd1234efgh5678",
      "subnet-1abcd1234efgh5678"
    ]
  },
  EnableSso: true
});
```

## Advanced Configuration

Configure a MicrosoftAD with additional settings such as alias creation and a specific edition.

```ts
const advancedMicrosoftAd = await AWS.DirectoryService.MicrosoftAD("advancedMicrosoftAd", {
  Name: "mycompany.com",
  Password: "AnotherStrongPassword456!",
  VpcSettings: {
    VpcId: "vpc-0abcd1234efgh5678",
    SubnetIds: [
      "subnet-0abcd1234efgh5678",
      "subnet-1abcd1234efgh5678"
    ]
  },
  CreateAlias: true,
  Edition: "Enterprise" // Options: "Standard", "Enterprise"
});
```

## Adoption of Existing Directory

If you have an existing directory that you want to adopt, you can use the `adopt` property.

```ts
const adoptedMicrosoftAd = await AWS.DirectoryService.MicrosoftAD("adoptedMicrosoftAd", {
  Name: "existingcompany.com",
  Password: "SecurePassword789!",
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

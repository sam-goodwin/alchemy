---
title: SimpleAD
description: Learn how to create, update, and manage AWS DirectoryService SimpleADs using Alchemy Cloud Control.
---


The SimpleAD resource lets you manage [AWS DirectoryService SimpleADs](https://docs.aws.amazon.com/directoryservice/latest/userguide/) for directory services in your AWS environment.

## Minimal Example

Create a basic SimpleAD directory with essential properties:

```ts
import AWS from "alchemy/aws/control";

const simpleAdDirectory = await AWS.DirectoryService.SimpleAD("mySimpleAD", {
  Name: "MySimpleAD",
  Size: "Small", // Options: Small, Medium, Large
  VpcSettings: {
    VpcId: "vpc-12345678",
    SubnetIds: [
      "subnet-12345678",
      "subnet-87654321"
    ]
  },
  CreateAlias: true, // Optional: Create an alias for the directory
  EnableSso: false // Optional: Disable Single Sign-On
});
```

## Advanced Configuration

Configure a SimpleAD with additional options like a description and password:

```ts
const advancedSimpleAd = await AWS.DirectoryService.SimpleAD("advancedSimpleAD", {
  Name: "AdvancedSimpleAD",
  Size: "Medium",
  Description: "This is an advanced SimpleAD configuration.",
  VpcSettings: {
    VpcId: "vpc-87654321",
    SubnetIds: [
      "subnet-12345678",
      "subnet-87654321"
    ]
  },
  CreateAlias: true,
  EnableSso: true,
  Password: "StrongPassword123!" // Ensure it's compliant with AWS password policy
});
```

## Custom Alias Configuration

Create a SimpleAD with a custom alias and short name:

```ts
const aliasSimpleAd = await AWS.DirectoryService.SimpleAD("aliasSimpleAD", {
  Name: "AliasSimpleAD",
  Size: "Small",
  Description: "SimpleAD with a custom alias.",
  VpcSettings: {
    VpcId: "vpc-12345678",
    SubnetIds: [
      "subnet-12345678",
      "subnet-87654321"
    ]
  },
  CreateAlias: true,
  ShortName: "AliasAD" // Optional: Provide a short name for the directory
});
```

## Directory with SSO Enabled

Create a SimpleAD where Single Sign-On is enabled:

```ts
const ssoSimpleAd = await AWS.DirectoryService.SimpleAD("ssoSimpleAD", {
  Name: "SSOSimpleAD",
  Size: "Large",
  VpcSettings: {
    VpcId: "vpc-12345678",
    SubnetIds: [
      "subnet-12345678",
      "subnet-87654321"
    ]
  },
  EnableSso: true, // Enable Single Sign-On for this directory
  CreateAlias: true,
  Description: "SimpleAD with SSO enabled."
});
```

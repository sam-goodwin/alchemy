---
title: CoreNetwork
description: Learn how to create, update, and manage AWS NetworkManager CoreNetworks using Alchemy Cloud Control.
---


The CoreNetwork resource allows you to manage [AWS NetworkManager CoreNetworks](https://docs.aws.amazon.com/networkmanager/latest/userguide/) which facilitate the management of your global network. This resource provides a central point for managing your network components and policies across AWS.

## Minimal Example

Create a basic CoreNetwork with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const coreNetwork = await AWS.NetworkManager.CoreNetwork("myCoreNetwork", {
  GlobalNetworkId: "gn-12345678",
  Description: "Core network for managing global connectivity"
});
```

## Advanced Configuration

Configure a CoreNetwork with a policy document and tags for better resource management.

```ts
const policyDocument = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: "*",
      Action: "networkmanager:CreateCoreNetwork",
      Resource: "*"
    }
  ]
};

const advancedCoreNetwork = await AWS.NetworkManager.CoreNetwork("advancedCoreNetwork", {
  GlobalNetworkId: "gn-87654321",
  Description: "Advanced core network with policies",
  PolicyDocument: policyDocument,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "NetworkOps" }
  ]
});
```

## Adoption of Existing Resources

Create a CoreNetwork while adopting an existing resource if it already exists.

```ts
const adoptExistingCoreNetwork = await AWS.NetworkManager.CoreNetwork("adoptExistingCoreNetwork", {
  GlobalNetworkId: "gn-11223344",
  Description: "Adopting existing core network",
  adopt: true
});
```

## Updating CoreNetwork Properties

Update an existing CoreNetwork with new properties and a modified policy document.

```ts
const updatedPolicyDocument = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: "*",
      Action: "networkmanager:UpdateCoreNetwork",
      Resource: "*"
    }
  ]
};

const updatedCoreNetwork = await AWS.NetworkManager.CoreNetwork("updateCoreNetwork", {
  GlobalNetworkId: "gn-44556677",
  Description: "Updated core network with new policies",
  PolicyDocument: updatedPolicyDocument
});
```

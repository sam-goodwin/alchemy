---
title: GlobalNetwork
description: Learn how to create, update, and manage AWS NetworkManager GlobalNetworks using Alchemy Cloud Control.
---


The GlobalNetwork resource lets you manage [AWS NetworkManager GlobalNetworks](https://docs.aws.amazon.com/networkmanager/latest/userguide/) which facilitate the creation and management of a global network across multiple AWS Regions.

## Minimal Example

Create a basic Global Network with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const globalNetwork = await AWS.NetworkManager.GlobalNetwork("myGlobalNetwork", {
  Description: "My global network for branch connectivity",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "GlobalExpansion" }
  ]
});
```

## Advanced Configuration

Create a Global Network with a defined state and additional properties.

```ts
const advancedGlobalNetwork = await AWS.NetworkManager.GlobalNetwork("myAdvancedGlobalNetwork", {
  Description: "Advanced global network configuration",
  State: "ACTIVE", // Possible values: PENDING | ACTIVE | DELETING | DELETED
  Tags: [
    { Key: "Department", Value: "IT" },
    { Key: "Owner", Value: "Alice" }
  ],
  adopt: true // Adopt existing resource if present
});
```

## Monitoring Creation Time

Utilize the created time property to monitor when the Global Network was established.

```ts
const networkWithCreationTime = await AWS.NetworkManager.GlobalNetwork("myNetworkWithCreationTime", {
  Description: "Global network with creation monitoring",
  Tags: [
    { Key: "Service", Value: "NetworkManagement" }
  ]
});

// Log the creation time of the Global Network
console.log(`Global Network created at: ${networkWithCreationTime.CreationTime}`);
```

## Handling State Changes

Set up a Global Network and handle state changes programmatically.

```ts
const stateChangeNetwork = await AWS.NetworkManager.GlobalNetwork("myStateChangeNetwork", {
  Description: "Network to demonstrate state handling",
  State: "PENDING"
});

// Example of checking and updating state
if (stateChangeNetwork.State === "PENDING") {
  console.log("Network is still pending, please check back later.");
  // Logic to update or retry can be added here
}
```

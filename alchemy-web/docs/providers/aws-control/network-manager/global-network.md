---
title: Managing AWS NetworkManager GlobalNetworks with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager GlobalNetworks using Alchemy Cloud Control.
---

# GlobalNetwork

The GlobalNetwork resource allows you to manage [AWS NetworkManager GlobalNetworks](https://docs.aws.amazon.com/networkmanager/latest/userguide/) and their configurations. This resource is essential for managing your global network architecture across AWS regions.

## Minimal Example

Create a basic GlobalNetwork with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicGlobalNetwork = await AWS.NetworkManager.GlobalNetwork("BasicGlobalNetwork", {
  Description: "My first global network for cross-region connectivity",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a GlobalNetwork with additional properties like state and creation time.

```ts
import AWS from "alchemy/aws/control";

const AdvancedGlobalNetwork = await AWS.NetworkManager.GlobalNetwork("AdvancedGlobalNetwork", {
  Description: "Advanced global network with specific state",
  State: "AVAILABLE",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Infrastructure" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Connecting Multiple Regions

Create a GlobalNetwork that connects multiple regions with specific configurations.

```ts
import AWS from "alchemy/aws/control";

const MultiRegionGlobalNetwork = await AWS.NetworkManager.GlobalNetwork("MultiRegionGlobalNetwork", {
  Description: "Global network connecting multiple AWS regions",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Global Networking" }
  ]
});

// Additional configurations can be added here when connecting regions
```

## Updating an Existing GlobalNetwork

Update an existing GlobalNetwork's description and state.

```ts
import AWS from "alchemy/aws/control";

const UpdatedGlobalNetwork = await AWS.NetworkManager.GlobalNetwork("ExistingGlobalNetwork", {
  Description: "Updated description for existing global network",
  State: "UPDATING",
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```
---
title: ServiceNetworkResourceAssociation
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworkResourceAssociations using Alchemy Cloud Control.
---


The ServiceNetworkResourceAssociation resource allows you to manage associations between service networks and resources in AWS VpcLattice. This facilitates the integration of your services in a networked environment. For more information, visit the [AWS VpcLattice ServiceNetworkResourceAssociations documentation](https://docs.aws.amazon.com/vpclattice/latest/userguide/).

## Minimal Example

Create a basic ServiceNetworkResourceAssociation with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const serviceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("myServiceNetworkAssociation", {
  ResourceConfigurationId: "myResourceConfigId",
  ServiceNetworkId: "myServiceNetworkId"
});
```

## Advanced Configuration

Configure a ServiceNetworkResourceAssociation with tags for better identification and management.

```ts
const advancedServiceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("advancedServiceNetworkAssociation", {
  ResourceConfigurationId: "myAdvancedResourceConfigId",
  ServiceNetworkId: "myAdvancedServiceNetworkId",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VpcLatticeIntegration" }
  ]
});
```

## Adopting Existing Resources

Demonstrate how to adopt an existing resource if it already exists, which prevents errors during deployment.

```ts
const adoptedServiceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("adoptedServiceNetworkAssociation", {
  ResourceConfigurationId: "existingResourceConfigId",
  ServiceNetworkId: "existingServiceNetworkId",
  adopt: true
});
```

## Complete Resource Configuration

Create a ServiceNetworkResourceAssociation with a full configuration, including optional properties.

```ts
const completeServiceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkResourceAssociation("completeServiceNetworkAssociation", {
  ResourceConfigurationId: "fullResourceConfigId",
  ServiceNetworkId: "fullServiceNetworkId",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" }
  ],
  adopt: false // Default value, explicitly set to false
});
```

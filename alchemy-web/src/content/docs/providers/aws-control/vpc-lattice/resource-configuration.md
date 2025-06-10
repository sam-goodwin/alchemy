---
title: ResourceConfiguration
description: Learn how to create, update, and manage AWS VpcLattice ResourceConfigurations using Alchemy Cloud Control.
---


The ResourceConfiguration resource allows you to manage [AWS VpcLattice ResourceConfigurations](https://docs.aws.amazon.com/vpclattice/latest/userguide/) and their associated settings, enabling you to define the behavior and properties of your service network resources.

## Minimal Example

Create a basic resource configuration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicResourceConfig = await AWS.VpcLattice.ResourceConfiguration("basicResourceConfig", {
  ResourceConfigurationType: "SERVICE", // Example type
  Name: "BasicServiceConfig",
  AllowAssociationToSharableServiceNetwork: true
});
```

## Advanced Configuration

Configure a resource with a more complex setup, including port ranges and a resource gateway ID.

```ts
const advancedResourceConfig = await AWS.VpcLattice.ResourceConfiguration("advancedResourceConfig", {
  ResourceConfigurationType: "SERVICE", // Example type
  Name: "AdvancedServiceConfig",
  PortRanges: ["8080-8081", "443"], // Define multiple port ranges
  ResourceGatewayId: "gateway-123456789", // Example gateway ID
  ResourceConfigurationAuthType: "IAM", // Example auth type
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VpcLatticeDemo" }
  ]
});
```

## Custom Protocol Settings

Set up a resource configuration with specific protocol types and the ability to associate with sharable service networks.

```ts
const customProtocolConfig = await AWS.VpcLattice.ResourceConfiguration("customProtocolConfig", {
  ResourceConfigurationType: "SERVICE", // Example type
  Name: "CustomProtocolServiceConfig",
  ProtocolType: "HTTP", // Specifying the protocol type
  AllowAssociationToSharableServiceNetwork: true,
  ResourceConfigurationDefinition: {
    // Example definition structure
    Type: "Service",
    Properties: {
      HealthCheck: {
        Path: "/health",
        IntervalSeconds: 30,
        TimeoutSeconds: 5
      }
    }
  }
});
```

## Tagging Resources

Demonstrate how to tag your resource configuration for better organization and management.

```ts
const taggedResourceConfig = await AWS.VpcLattice.ResourceConfiguration("taggedResourceConfig", {
  ResourceConfigurationType: "SERVICE", // Example type
  Name: "TaggedServiceConfig",
  Tags: [
    { Key: "Owner", Value: "DevTeam" },
    { Key: "CostCenter", Value: "ProjectX" }
  ]
});
``` 

This structure provides a comprehensive overview of managing AWS VpcLattice ResourceConfigurations with Alchemy, illustrating both basic and more advanced configurations that you can implement in your infrastructure.

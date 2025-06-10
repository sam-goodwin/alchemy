---
title: ContainerFleet
description: Learn how to create, update, and manage AWS GameLift ContainerFleets using Alchemy Cloud Control.
---


The ContainerFleet resource allows you to manage AWS GameLift ContainerFleets, enabling you to deploy, scale, and manage game server containers seamlessly. For more details, refer to the [AWS GameLift ContainerFleets documentation](https://docs.aws.amazon.com/gamelift/latest/userguide/).

## Minimal Example

Create a basic ContainerFleet with required properties and a couple of optional configurations.

```ts
import AWS from "alchemy/aws/control";

const containerFleet = await AWS.GameLift.ContainerFleet("myContainerFleet", {
  FleetRoleArn: "arn:aws:iam::123456789012:role/GameLiftFleetRole",
  GameServerContainerGroupDefinitionName: "myGameServerGroup",
  Description: "Container fleet for my multiplayer game",
  InstanceConnectionPortRange: {
    From: 3000,
    To: 4000
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a ContainerFleet with additional scaling policies and log configurations for better management and monitoring.

```ts
const advancedContainerFleet = await AWS.GameLift.ContainerFleet("advancedContainerFleet", {
  FleetRoleArn: "arn:aws:iam::123456789012:role/GameLiftFleetRole",
  GameServerContainerGroupDefinitionName: "myAdvancedGameServerGroup",
  ScalingPolicies: [
    {
      Name: "ScaleUpPolicy",
      PolicyType: "TargetTrackingScaling",
      TargetTrackingConfiguration: {
        TargetValue: 75,
        PredefinedMetricSpecification: {
          PredefinedMetricType: "GameLiftAveragePlayerCount"
        }
      }
    },
    {
      Name: "ScaleDownPolicy",
      PolicyType: "TargetTrackingScaling",
      TargetTrackingConfiguration: {
        TargetValue: 20,
        PredefinedMetricSpecification: {
          PredefinedMetricType: "GameLiftAveragePlayerCount"
        }
      }
    }
  ],
  LogConfiguration: {
    S3Bucket: "my-log-bucket",
    S3Path: "logs/",
    LogLevel: "INFO"
  }
});
```

## Multi-Region Deployment

Set up a ContainerFleet that spans multiple regions by specifying location configurations.

```ts
const multiRegionContainerFleet = await AWS.GameLift.ContainerFleet("multiRegionContainerFleet", {
  FleetRoleArn: "arn:aws:iam::123456789012:role/GameLiftFleetRole",
  GameServerContainerGroupDefinitionName: "myMultiRegionGameServerGroup",
  Locations: [
    {
      Location: "us-west-2",
      InstanceCount: 2
    },
    {
      Location: "eu-central-1",
      InstanceCount: 2
    }
  ]
});
```

## Instance Inbound Permissions

Define inbound permissions for instances in the ContainerFleet to allow traffic on specific ports.

```ts
const permissionsContainerFleet = await AWS.GameLift.ContainerFleet("permissionsContainerFleet", {
  FleetRoleArn: "arn:aws:iam::123456789012:role/GameLiftFleetRole",
  GameServerContainerGroupDefinitionName: "myPermissionsGameServerGroup",
  InstanceInboundPermissions: [
    {
      IpProtocol: "tcp",
      FromPort: 3000,
      ToPort: 4000,
      IpRange: "203.0.113.0/24"  // Example CIDR block
    },
    {
      IpProtocol: "udp",
      FromPort: 5000,
      ToPort: 6000,
      IpRange: "203.0.113.0/24"  // Example CIDR block
    }
  ]
});
```

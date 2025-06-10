---
title: Fleet
description: Learn how to create, update, and manage AWS GameLift Fleets using Alchemy Cloud Control.
---


The Fleet resource lets you manage [AWS GameLift Fleets](https://docs.aws.amazon.com/gamelift/latest/userguide/) for deploying and scaling game servers in the cloud.

## Minimal Example

Create a basic GameLift fleet with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const gameLiftFleet = await AWS.GameLift.Fleet("myFleet", {
  Name: "MyGameFleet",
  Description: "This is my GameLift fleet for testing.",
  FleetType: "ON_DEMAND",
  EC2InstanceType: "c5.large",
  MaxSize: 10,
  MinSize: 1,
  RuntimeConfiguration: {
    ServerProcesses: [{
      LaunchPath: "C:\\Game\\server.exe",
      Parameters: "",
      ConcurrentExecutions: 1
    }]
  }
});
```

## Advanced Configuration

Configure a fleet with scaling policies and inbound permissions to allow traffic.

```ts
const advancedFleet = await AWS.GameLift.Fleet("advancedFleet", {
  Name: "AdvancedGameFleet",
  Description: "An advanced GameLift fleet with scaling policies.",
  FleetType: "ON_DEMAND",
  EC2InstanceType: "c5.large",
  MaxSize: 20,
  MinSize: 2,
  ScalingPolicies: [{
    Name: "AutoScalePolicy",
    MetricName: "PlayerCount",
    ScalingAdjustment: 1,
    AdjustmentType: "ChangeInCapacity",
    Cooldown: 60
  }],
  EC2InboundPermissions: [{
    FromPort: 7777,
    ToPort: 7777,
    IpProtocol: "tcp",
    IpRanges: ["0.0.0.0/0"]
  }],
  RuntimeConfiguration: {
    ServerProcesses: [{
      LaunchPath: "C:\\Game\\server.exe",
      Parameters: "",
      ConcurrentExecutions: 1
    }]
  }
});
```

## Custom VPC Configuration

Deploy a fleet within a specific VPC to enhance security and connectivity.

```ts
const vpcFleet = await AWS.GameLift.Fleet("vpcFleet", {
  Name: "VpcGameFleet",
  Description: "GameLift fleet within a specific VPC.",
  FleetType: "ON_DEMAND",
  EC2InstanceType: "c5.large",
  MaxSize: 15,
  MinSize: 3,
  PeerVpcId: "vpc-0123456789abcdef0",
  PeerVpcAwsAccountId: "123456789012",
  EC2InboundPermissions: [{
    FromPort: 7777,
    ToPort: 7777,
    IpProtocol: "tcp",
    IpRanges: ["203.0.113.0/24"]
  }],
  RuntimeConfiguration: {
    ServerProcesses: [{
      LaunchPath: "C:\\Game\\server.exe",
      Parameters: "",
      ConcurrentExecutions: 1
    }]
  }
});
```

## Anywhere Configuration

Create a fleet configured for Anywhere deployment, allowing it to support games running on various platforms.

```ts
const anywhereFleet = await AWS.GameLift.Fleet("anywhereFleet", {
  Name: "AnywhereGameFleet",
  Description: "GameLift fleet for Anywhere deployment.",
  FleetType: "ON_DEMAND",
  EC2InstanceType: "c5.large",
  MaxSize: 20,
  MinSize: 4,
  AnywhereConfiguration: {
    IpAddress: "203.0.113.1",
    Port: 8080
  },
  RuntimeConfiguration: {
    ServerProcesses: [{
      LaunchPath: "C:\\Game\\server.exe",
      Parameters: "",
      ConcurrentExecutions: 2
    }]
  }
});
```

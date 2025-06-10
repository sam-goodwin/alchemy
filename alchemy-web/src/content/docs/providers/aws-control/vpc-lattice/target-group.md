---
title: TargetGroup
description: Learn how to create, update, and manage AWS VpcLattice TargetGroups using Alchemy Cloud Control.
---


The TargetGroup resource allows you to manage [AWS VpcLattice TargetGroups](https://docs.aws.amazon.com/vpclattice/latest/userguide/) which are used for routing traffic to your services.

## Minimal Example

Create a basic TargetGroup with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const targetGroup = await AWS.VpcLattice.TargetGroup("myTargetGroup", {
  Type: "HTTP", // Specifies the type of target group
  Config: {
    Protocol: "HTTP",
    Port: 80
  },
  Name: "MyTargetGroup" // Optional: Name of the target group
});
```

## Advanced Configuration

Configure a TargetGroup with additional settings such as targets and tags:

```ts
const advancedTargetGroup = await AWS.VpcLattice.TargetGroup("advancedTargetGroup", {
  Type: "HTTP",
  Config: {
    Protocol: "HTTPS",
    Port: 443,
    HealthCheck: {
      Path: "/health",
      IntervalSeconds: 30,
      TimeoutSeconds: 5,
      HealthyThresholdCount: 2,
      UnhealthyThresholdCount: 2
    }
  },
  Targets: [
    {
      Id: "i-0123456789abcdef0", // Target instance ID
      Port: 8080
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  Name: "AdvancedTargetGroup"
});
```

## Adding Targets

Demonstrate how to add multiple targets to an existing TargetGroup:

```ts
const targetGroupWithMultipleTargets = await AWS.VpcLattice.TargetGroup("multiTargetGroup", {
  Type: "HTTP",
  Config: {
    Protocol: "HTTP",
    Port: 80
  },
  Targets: [
    {
      Id: "i-0abcdef1234567890", // First target instance ID
      Port: 8080
    },
    {
      Id: "i-0abcdef1234567891", // Second target instance ID
      Port: 8080
    }
  ],
  Name: "MultiTargetGroup"
});
```

## Adoption of Existing Resource

Show how to adopt an existing TargetGroup instead of failing if it already exists:

```ts
const adoptExistingTargetGroup = await AWS.VpcLattice.TargetGroup("existingTargetGroup", {
  Type: "HTTP",
  Config: {
    Protocol: "HTTP",
    Port: 80
  },
  adopt: true, // Set to true to adopt the existing resource
  Name: "ExistingTargetGroup"
});
```

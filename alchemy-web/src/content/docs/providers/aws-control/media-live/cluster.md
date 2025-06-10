---
title: Cluster
description: Learn how to create, update, and manage AWS MediaLive Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS MediaLive Clusters](https://docs.aws.amazon.com/medialive/latest/userguide/) which are used for video processing in the cloud.

## Minimal Example

Create a basic MediaLive cluster with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const mediaLiveCluster = await AWS.MediaLive.Cluster("basicCluster", {
  instanceRoleArn: "arn:aws:iam::123456789012:role/MediaLiveInstanceRole",
  clusterType: "STANDARD",
  networkSettings: {
    vpcId: "vpc-1234abcd",
    securityGroupIds: ["sg-1234abcd"],
    subnetIds: ["subnet-1234abcd"]
  },
  tags: [
    { key: "Environment", value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a cluster with additional properties such as tags and a specific name:

```ts
const advancedMediaLiveCluster = await AWS.MediaLive.Cluster("advancedCluster", {
  instanceRoleArn: "arn:aws:iam::123456789012:role/MediaLiveInstanceRole",
  clusterType: "HIGH_AVAILABILITY",
  name: "HighAvailabilityCluster",
  networkSettings: {
    vpcId: "vpc-5678efgh",
    securityGroupIds: ["sg-5678efgh"],
    subnetIds: ["subnet-5678efgh"]
  },
  tags: [
    { key: "Project", value: "MediaStreaming" },
    { key: "Owner", value: "TeamA" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing cluster instead of creating a new one, you can set the `adopt` property to true:

```ts
const adoptMediaLiveCluster = await AWS.MediaLive.Cluster("existingCluster", {
  instanceRoleArn: "arn:aws:iam::123456789012:role/MediaLiveInstanceRole",
  clusterType: "STANDARD",
  adopt: true // Adopt the existing resource if it exists
});
```

## Custom Network Settings

Set up a cluster with specific network configurations:

```ts
const customNetworkCluster = await AWS.MediaLive.Cluster("customNetworkCluster", {
  instanceRoleArn: "arn:aws:iam::123456789012:role/MediaLiveInstanceRole",
  clusterType: "STANDARD",
  networkSettings: {
    vpcId: "vpc-9012ijkl",
    securityGroupIds: ["sg-9012ijkl"],
    subnetIds: ["subnet-9012ijkl"],
    inboundRules: [
      {
        protocol: "tcp",
        fromPort: 80,
        toPort: 80,
        cidrBlock: "192.168.1.0/24"
      },
      {
        protocol: "tcp",
        fromPort: 443,
        toPort: 443,
        cidrBlock: "192.168.1.0/24"
      }
    ]
  }
});
```

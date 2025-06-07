---
title: Managing AWS MediaLive InputSecurityGroups with Alchemy
description: Learn how to create, update, and manage AWS MediaLive InputSecurityGroups using Alchemy Cloud Control.
---

# InputSecurityGroup

The InputSecurityGroup resource allows you to configure a security group specifically for AWS MediaLive inputs, controlling access to your input endpoints. For more information, refer to the [AWS MediaLive InputSecurityGroups documentation](https://docs.aws.amazon.com/medialive/latest/userguide/).

## Minimal Example

Create a basic Input Security Group with a whitelist rule allowing access from a specific IP address.

```ts
import AWS from "alchemy/aws/control";

const MinimalInputSecurityGroup = await AWS.MediaLive.InputSecurityGroup("MyInputSecurityGroup", {
  WhitelistRules: [
    {
      Cidr: "192.0.2.0/24" // Allow access from this CIDR block
    }
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

Configure an Input Security Group with multiple whitelist rules and tags for better organization and access control.

```ts
const AdvancedInputSecurityGroup = await AWS.MediaLive.InputSecurityGroup("AdvancedInputSecurityGroup", {
  WhitelistRules: [
    {
      Cidr: "203.0.113.0/24" // Allow access from another CIDR block
    },
    {
      Cidr: "198.51.100.0/24" // Allow access from another CIDR block
    }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Streaming" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Dynamic Tagging

Create an Input Security Group that dynamically assigns tags based on environment variables for easier management.

```ts
const DynamicInputSecurityGroup = await AWS.MediaLive.InputSecurityGroup("DynamicInputSecurityGroup", {
  WhitelistRules: [
    {
      Cidr: "192.0.2.0/24" // Allow access from this CIDR block
    }
  ],
  Tags: [
    { Key: "Environment", Value: process.env.ENVIRONMENT || "development" },
    { Key: "Owner", Value: process.env.OWNER_NAME || "default" }
  ],
  adopt: false // Do not adopt an existing resource
});
```

## Example for Multi-Region Deployment

Set up an Input Security Group for a multi-region deployment, allowing access from several regions.

```ts
const MultiRegionInputSecurityGroup = await AWS.MediaLive.InputSecurityGroup("MultiRegionInputSecurityGroup", {
  WhitelistRules: [
    {
      Cidr: "192.0.2.0/24" // Allow access from the primary region
    },
    {
      Cidr: "203.0.113.0/24" // Allow access from a secondary region
    }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Region", Value: "us-east-1" }
  ]
});
```
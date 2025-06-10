---
title: InputSecurityGroup
description: Learn how to create, update, and manage AWS MediaLive InputSecurityGroups using Alchemy Cloud Control.
---


The InputSecurityGroup resource allows you to manage [AWS MediaLive InputSecurityGroups](https://docs.aws.amazon.com/medialive/latest/userguide/) which control the whitelisted CIDR blocks for input sources.

## Minimal Example

This example demonstrates how to create a basic InputSecurityGroup with a whitelist rule and tags.

```ts
import AWS from "alchemy/aws/control";

const inputSecurityGroup = await AWS.MediaLive.InputSecurityGroup("basicInputSecurityGroup", {
  WhitelistRules: [{
    Cidr: "192.168.1.0/24"
  }],
  Tags: {
    Environment: "Development",
    Project: "MediaStreaming"
  }
});
```

## Advanced Configuration

This example shows how to configure an InputSecurityGroup with multiple whitelist rules and no tags.

```ts
const advancedInputSecurityGroup = await AWS.MediaLive.InputSecurityGroup("advancedInputSecurityGroup", {
  WhitelistRules: [
    {
      Cidr: "10.0.0.0/16"
    },
    {
      Cidr: "172.16.0.0/12"
    }
  ]
});
```

## Adoption of Existing Resources

In this example, we demonstrate how to adopt an existing InputSecurityGroup by setting the `adopt` property to true.

```ts
const adoptedInputSecurityGroup = await AWS.MediaLive.InputSecurityGroup("adoptedInputSecurityGroup", {
  WhitelistRules: [{
    Cidr: "203.0.113.0/24"
  }],
  adopt: true
});
```

## Resource Properties

This example highlights how to access additional properties of the InputSecurityGroup such as ARN and timestamps.

```ts
const inputSecurityGroupDetails = await AWS.MediaLive.InputSecurityGroup("inputSecurityGroupDetails", {
  WhitelistRules: [{
    Cidr: "198.51.100.0/24"
  }]
});

// Accessing resource properties
console.log(`ARN: ${inputSecurityGroupDetails.Arn}`);
console.log(`Creation Time: ${inputSecurityGroupDetails.CreationTime}`);
console.log(`Last Update Time: ${inputSecurityGroupDetails.LastUpdateTime}`);
```

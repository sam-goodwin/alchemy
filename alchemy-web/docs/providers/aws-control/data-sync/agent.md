---
title: Managing AWS DataSync Agents with Alchemy
description: Learn how to create, update, and manage AWS DataSync Agents using Alchemy Cloud Control.
---

# Agent

The Agent resource lets you manage [AWS DataSync Agents](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between on-premises storage and AWS storage services.

## Minimal Example

Create a basic DataSync Agent with essential properties:

```ts
import AWS from "alchemy/aws/control";

const DataSyncAgent = await AWS.DataSync.Agent("MyDataSyncAgent", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-12345678"
  ],
  AgentName: "MyAgent",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-12345678"
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataSync" }
  ]
});
```

## Advanced Configuration

Configure the DataSync Agent with additional optional properties such as VPC endpoint ID and activation key:

```ts
const AdvancedDataSyncAgent = await AWS.DataSync.Agent("AdvancedDataSyncAgent", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-87654321"
  ],
  AgentName: "AdvancedAgent",
  VpcEndpointId: "vpce-12345678",
  ActivationKey: "example-activation-key",
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-87654321"
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataSync" },
    { Key: "Project", Value: "Migration" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing DataSync Agent instead of creating a new one, you can set the `adopt` property to true:

```ts
const AdoptExistingDataSyncAgent = await AWS.DataSync.Agent("ExistingDataSyncAgent", {
  AgentName: "ExistingAgent",
  adopt: true
});
```

## Network Configuration

Here’s how to set up a DataSync Agent with specific network configurations:

```ts
const NetworkConfiguredDataSyncAgent = await AWS.DataSync.Agent("NetworkConfiguredAgent", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-abcdef12"
  ],
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-abcdef12"
  ],
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```
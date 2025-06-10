---
title: Agent
description: Learn how to create, update, and manage AWS DataSync Agents using Alchemy Cloud Control.
---


The Agent resource lets you manage [AWS DataSync Agents](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between on-premises storage and AWS storage services.

## Minimal Example

Create a basic DataSync Agent with a specified subnet and security group:

```ts
import AWS from "alchemy/aws/control";

const dataSyncAgent = await AWS.DataSync.Agent("myDataSyncAgent", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abcd1234efgh5678"
  ],
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0abcd1234efgh5678"
  ],
  AgentName: "MyDataSyncAgent"
});
```

## Advanced Configuration

Configure an Agent with a VPC endpoint and tags for better management and organization:

```ts
const advancedDataSyncAgent = await AWS.DataSync.Agent("advancedDataSyncAgent", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abcd1234efgh5678"
  ],
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0abcd1234efgh5678"
  ],
  VpcEndpointId: "vpce-0abcd1234efgh5678",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataSyncMigration" }
  ]
});
```

## Adoption of Existing Resources

If an existing DataSync Agent is present, you can adopt it instead of failing:

```ts
const adoptedDataSyncAgent = await AWS.DataSync.Agent("adoptedDataSyncAgent", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abcd1234efgh5678"
  ],
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0abcd1234efgh5678"
  ],
  adopt: true // Allow adoption of existing resources
});
```

## Using Activation Key

Create a DataSync Agent with an activation key for secure configuration:

```ts
const activatedDataSyncAgent = await AWS.DataSync.Agent("activatedDataSyncAgent", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abcd1234efgh5678"
  ],
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0abcd1234efgh5678"
  ],
  ActivationKey: "my-activation-key-12345"
});
```

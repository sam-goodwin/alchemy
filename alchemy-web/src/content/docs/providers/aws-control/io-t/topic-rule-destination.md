---
title: TopicRuleDestination
description: Learn how to create, update, and manage AWS IoT TopicRuleDestinations using Alchemy Cloud Control.
---


The TopicRuleDestination resource allows you to manage [AWS IoT TopicRuleDestinations](https://docs.aws.amazon.com/iot/latest/userguide/) which are used to define the destinations for IoT messages based on topic rules.

## Minimal Example

Create a basic TopicRuleDestination with a specified status and HTTP URL properties.

```ts
import AWS from "alchemy/aws/control";

const topicRuleDestination = await AWS.IoT.TopicRuleDestination("myTopicRuleDestination", {
  Status: "ENABLED",
  HttpUrlProperties: {
    Authorization: "Bearer myToken",
    Url: "https://api.example.com/iot/destination"
  }
});
```

## Advanced Configuration

Configure a TopicRuleDestination with VPC properties for secure access within a specified VPC.

```ts
const vpcDestination = await AWS.IoT.TopicRuleDestination("myVpcTopicRuleDestination", {
  Status: "ENABLED",
  VpcProperties: {
    VpcId: "vpc-12345678",
    SubnetIds: ["subnet-12345678", "subnet-87654321"],
    SecurityGroupIds: ["sg-12345678"],
    Port: 443
  }
});
```

## Adopting Existing Resources

If you want to adopt an existing TopicRuleDestination without failing, you can set the `adopt` property to true.

```ts
const adoptExistingDestination = await AWS.IoT.TopicRuleDestination("existingDestination", {
  Status: "ENABLED",
  adopt: true
});
```

## Example with Both HTTP and VPC Properties

Create a TopicRuleDestination that has both HTTP URL properties and VPC properties.

```ts
const combinedDestination = await AWS.IoT.TopicRuleDestination("combinedDestination", {
  Status: "ENABLED",
  HttpUrlProperties: {
    Authorization: "Bearer mySecureToken",
    Url: "https://api.example.com/iot/combined"
  },
  VpcProperties: {
    VpcId: "vpc-abcdef01",
    SubnetIds: ["subnet-abcdef01", "subnet-fedcba10"],
    SecurityGroupIds: ["sg-abcdef01"],
    Port: 443
  }
});
```

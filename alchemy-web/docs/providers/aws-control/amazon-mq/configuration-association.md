---
title: Managing AWS AmazonMQ ConfigurationAssociations with Alchemy
description: Learn how to create, update, and manage AWS AmazonMQ ConfigurationAssociations using Alchemy Cloud Control.
---

# ConfigurationAssociation

The ConfigurationAssociation resource lets you create and manage [AWS AmazonMQ ConfigurationAssociations](https://docs.aws.amazon.com/amazonmq/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amazonmq-configurationassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationassociation = await AWS.AmazonMQ.ConfigurationAssociation(
  "configurationassociation-example",
  { Broker: "example-broker", Configuration: "example-configuration" }
);
```


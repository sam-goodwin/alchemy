---
title: ConfigurationAssociation
description: Learn how to create, update, and manage AWS AmazonMQ ConfigurationAssociations using Alchemy Cloud Control.
---


The ConfigurationAssociation resource allows you to manage [AWS AmazonMQ ConfigurationAssociations](https://docs.aws.amazon.com/amazonmq/latest/userguide/) for your message brokers. This resource links a broker to a configuration, enabling you to customize the messaging environment.

## Minimal Example

Create a basic ConfigurationAssociation linking a broker to a configuration.

```ts
import AWS from "alchemy/aws/control";

const configurationAssociation = await AWS.AmazonMQ.ConfigurationAssociation("exampleConfigurationAssociation", {
  Broker: "my-broker-id",
  Configuration: {
    Id: "my-configuration-id",
    Revision: 1
  },
  adopt: true // Optional: If true, adopts existing resource instead of failing when resource already exists
});
```

## Advanced Configuration

Configure a ConfigurationAssociation with additional properties such as automatic adoption of existing resources.

```ts
const advancedConfigurationAssociation = await AWS.AmazonMQ.ConfigurationAssociation("advancedConfigurationAssociation", {
  Broker: "my-broker-id",
  Configuration: {
    Id: "my-configuration-id",
    Revision: 1
  },
  adopt: true // Optional: Automatically adopt if the resource already exists
});
```

## Updating Configuration

Update the ConfigurationAssociation to link a different configuration to the same broker.

```ts
const updatedConfigurationAssociation = await AWS.AmazonMQ.ConfigurationAssociation("updatedConfigurationAssociation", {
  Broker: "my-broker-id",
  Configuration: {
    Id: "new-configuration-id",
    Revision: 1
  },
  adopt: false // Optional: Don't adopt if the resource already exists
});
```

## Complete Configuration with Additional Properties

Create a ConfigurationAssociation with detailed properties to manage configurations effectively.

```ts
const completeConfigurationAssociation = await AWS.AmazonMQ.ConfigurationAssociation("completeConfigurationAssociation", {
  Broker: "my-broker-id",
  Configuration: {
    Id: "my-configuration-id",
    Revision: 1
  },
  adopt: true // Optional: Automatically adopts existing resource
});
```

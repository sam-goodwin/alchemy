---
title: ConnectorDefinition
description: Learn how to create, update, and manage AWS Greengrass ConnectorDefinitions using Alchemy Cloud Control.
---


The ConnectorDefinition resource lets you manage [AWS Greengrass ConnectorDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) that enable the integration of external services and devices with AWS Greengrass.

## Minimal Example

Create a basic ConnectorDefinition with required properties and a common optional property for initial version.

```ts
import AWS from "alchemy/aws/control";

const connectorDefinition = await AWS.Greengrass.ConnectorDefinition("basicConnectorDefinition", {
  name: "MyConnectorDefinition",
  initialVersion: {
    connectors: [{
      id: "MyConnector",
      connectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/my-connector",
      parameters: {
        "param1": "value1",
        "param2": "value2"
      }
    }]
  },
  tags: {
    project: "GreengrassDemo",
    environment: "development"
  }
});
```

## Advanced Configuration

Configure a ConnectorDefinition with multiple connectors and additional parameters for more complex setups.

```ts
const advancedConnectorDefinition = await AWS.Greengrass.ConnectorDefinition("advancedConnectorDefinition", {
  name: "AdvancedConnectorDefinition",
  initialVersion: {
    connectors: [
      {
        id: "ConnectorOne",
        connectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/connector-one",
        parameters: {
          "paramA": "valueA",
          "paramB": "valueB",
          "paramC": "valueC"
        }
      },
      {
        id: "ConnectorTwo",
        connectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/connector-two",
        parameters: {
          "paramX": "valueX",
          "paramY": "valueY"
        }
      }
    ]
  }
});
```

## Dynamic Updates

Create a ConnectorDefinition that allows for dynamic updates to the connector configuration.

```ts
const dynamicConnectorDefinition = await AWS.Greengrass.ConnectorDefinition("dynamicConnectorDefinition", {
  name: "DynamicConnectorDefinition",
  initialVersion: {
    connectors: [{
      id: "DynamicConnector",
      connectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/dynamic-connector",
      parameters: {
        "dynamicParam": "initialValue"
      }
    }]
  },
  tags: {
    feature: "dynamic-updates"
  }
});

// Later, update the connector parameters dynamically
await AWS.Greengrass.ConnectorDefinition("dynamicConnectorDefinition", {
  initialVersion: {
    connectors: [{
      id: "DynamicConnector",
      connectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/dynamic-connector",
      parameters: {
        "dynamicParam": "updatedValue"
      }
    }]
  }
});
```

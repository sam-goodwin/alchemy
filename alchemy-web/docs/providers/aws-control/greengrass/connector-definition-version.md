---
title: Managing AWS Greengrass ConnectorDefinitionVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass ConnectorDefinitionVersions using Alchemy Cloud Control.
---

# ConnectorDefinitionVersion

The ConnectorDefinitionVersion resource allows you to manage [AWS Greengrass ConnectorDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) which define a version of a Greengrass connector that can be deployed to devices.

## Minimal Example

Create a basic ConnectorDefinitionVersion with required properties and an optional adoption flag.

```ts
import AWS from "alchemy/aws/control";

const basicConnectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("BasicConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/MyConnector",
      Id: "MyConnector",
      Parameters: {
        Key1: "Value1",
        Key2: "Value2"
      }
    }
  ],
  ConnectorDefinitionId: "MyConnectorDefinitionId",
  adopt: true // Optional: Adopt existing resource
});
```

## Advanced Configuration

Define multiple connectors with specific parameters for advanced use cases.

```ts
const advancedConnectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("AdvancedConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/MyFirstConnector",
      Id: "MyFirstConnector",
      Parameters: {
        ParameterA: "ValueA",
        ParameterB: "ValueB"
      }
    },
    {
      ConnectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/MySecondConnector",
      Id: "MySecondConnector",
      Parameters: {
        ParameterX: "ValueX",
        ParameterY: "ValueY"
      }
    }
  ],
  ConnectorDefinitionId: "MyAdvancedConnectorDefinitionId",
  adopt: false // Optional: Do not adopt existing resource
});
```

## Use Case: Multiple Connectors for Data Processing

Create a connector definition version that uses multiple connectors for data ingestion and processing.

```ts
const dataProcessingConnectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("DataProcessingConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/IoTDataConnector",
      Id: "IoTDataConnector",
      Parameters: {
        DataStream: "SensorData",
        Frequency: "5s"
      }
    },
    {
      ConnectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/DataLoggerConnector",
      Id: "DataLoggerConnector",
      Parameters: {
        LogLevel: "INFO",
        FilePath: "/var/log/sensordata.log"
      }
    }
  ],
  ConnectorDefinitionId: "MyDataProcessingConnectorDefinitionId"
});
``` 

## Use Case: Adoption of Existing Connector Definitions

Create a ConnectorDefinitionVersion that adopts an existing connector definition.

```ts
const adoptExistingConnectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("AdoptExistingConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-west-2:123456789012:connectors/ExistingConnector",
      Id: "ExistingConnector",
      Parameters: {
        Setting1: "NewValue1",
        Setting2: "NewValue2"
      }
    }
  ],
  ConnectorDefinitionId: "MyExistingConnectorDefinitionId",
  adopt: true // Adopt existing resource
});
```
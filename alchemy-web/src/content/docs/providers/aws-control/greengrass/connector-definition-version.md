---
title: ConnectorDefinitionVersion
description: Learn how to create, update, and manage AWS Greengrass ConnectorDefinitionVersions using Alchemy Cloud Control.
---


The ConnectorDefinitionVersion resource allows you to manage versions of connector definitions in AWS Greengrass, enabling you to define how your Greengrass connectors should behave and interact with your devices. For more details, visit the [AWS Greengrass ConnectorDefinitionVersions documentation](https://docs.aws.amazon.com/greengrass/latest/userguide/).

## Minimal Example

Create a basic Greengrass ConnectorDefinitionVersion with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const connectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("myConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-east-1:123456789012:connectors/myConnector",
      Id: "myConnector"
    }
  ],
  ConnectorDefinitionId: "myConnectorDefinitionId",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a ConnectorDefinitionVersion with multiple connectors and additional properties.

```ts
const advancedConnectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("advancedConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-east-1:123456789012:connectors/myFirstConnector",
      Id: "myFirstConnector",
      Parameters: {
        key1: "value1",
        key2: "value2"
      }
    },
    {
      ConnectorArn: "arn:aws:greengrass:us-east-1:123456789012:connectors/mySecondConnector",
      Id: "mySecondConnector",
      Parameters: {
        keyA: "valueA",
        keyB: "valueB"
      }
    }
  ],
  ConnectorDefinitionId: "myAdvancedConnectorDefinitionId"
});
```

## Use Case: Updating a ConnectorDefinitionVersion

Update an existing ConnectorDefinitionVersion by adding a new connector.

```ts
const updatedConnectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("updatedConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-east-1:123456789012:connectors/myNewConnector",
      Id: "myNewConnector"
    }
  ],
  ConnectorDefinitionId: "myExistingConnectorDefinitionId"
});
```

## Use Case: Reference Existing Connectors

Create a ConnectorDefinitionVersion that references existing connectors in your AWS account.

```ts
const referencedConnectorDefinitionVersion = await AWS.Greengrass.ConnectorDefinitionVersion("referencedConnectorDefVersion", {
  Connectors: [
    {
      ConnectorArn: "arn:aws:greengrass:us-east-1:123456789012:connectors/existingConnector1",
      Id: "existingConnector1"
    },
    {
      ConnectorArn: "arn:aws:greengrass:us-east-1:123456789012:connectors/existingConnector2",
      Id: "existingConnector2"
    }
  ],
  ConnectorDefinitionId: "myReferencedConnectorDefinitionId"
});
```

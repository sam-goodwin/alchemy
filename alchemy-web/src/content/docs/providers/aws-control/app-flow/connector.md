---
title: Connector
description: Learn how to create, update, and manage AWS AppFlow Connectors using Alchemy Cloud Control.
---


The Connector resource lets you manage [AWS AppFlow Connectors](https://docs.aws.amazon.com/appflow/latest/userguide/) which enable the connection to various data sources and destinations for data flow.

## Minimal Example

Create a basic AppFlow Connector with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const basicConnector = await AWS.AppFlow.Connector("basicConnector", {
  ConnectorProvisioningType: "CUSTOM",
  ConnectorProvisioningConfig: {
    // Configuration details specific to the connector
  },
  ConnectorLabel: "My Basic Connector",
  Description: "This is a basic AppFlow connector."
});
```

## Advanced Configuration

Configure an AppFlow Connector with additional properties to specify more advanced settings.

```ts
const advancedConnector = await AWS.AppFlow.Connector("advancedConnector", {
  ConnectorProvisioningType: "CUSTOM",
  ConnectorProvisioningConfig: {
    // More detailed configuration for the connector
  },
  ConnectorLabel: "Advanced Connector",
  Description: "This connector has advanced settings."
});
```

## Existing Resource Adoption

Create a connector that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptExistingConnector = await AWS.AppFlow.Connector("adoptExistingConnector", {
  ConnectorProvisioningType: "CUSTOM",
  ConnectorProvisioningConfig: {
    // Connector configuration for adoption
  },
  adopt: true,
  ConnectorLabel: "Adopted Connector",
  Description: "This connector adopts an existing resource."
});
```

## Custom Connector Configuration

Configure a connector with a specific provisioning type and setup for a custom integration.

```ts
const customConnector = await AWS.AppFlow.Connector("customConnector", {
  ConnectorProvisioningType: "CUSTOM",
  ConnectorProvisioningConfig: {
    // Custom configuration details
  },
  ConnectorLabel: "Custom Connector",
  Description: "This connector is configured for a custom integration."
});
```

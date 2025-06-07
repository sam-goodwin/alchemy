---
title: Managing AWS AppFlow Connectors with Alchemy
description: Learn how to create, update, and manage AWS AppFlow Connectors using Alchemy Cloud Control.
---

# Connector

The Connector resource lets you create and manage [AWS AppFlow Connectors](https://docs.aws.amazon.com/appflow/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connector = await AWS.AppFlow.Connector("connector-example", {
  ConnectorProvisioningType: "example-connectorprovisioningtype",
  ConnectorProvisioningConfig: "example-connectorprovisioningconfig",
  Description: "A connector resource managed by Alchemy",
});
```

## Advanced Configuration

Create a connector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnector = await AWS.AppFlow.Connector("advanced-connector", {
  ConnectorProvisioningType: "example-connectorprovisioningtype",
  ConnectorProvisioningConfig: "example-connectorprovisioningconfig",
  Description: "A connector resource managed by Alchemy",
});
```

